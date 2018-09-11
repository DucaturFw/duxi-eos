import { IContext } from '../context';
import { getLastSyncedBlock } from '../database';
import { BlockModel } from '../models/block';

import mongoose from 'mongoose';
import { initialize } from './initiate-app';

export async function run(ctx: Partial<IContext>) {
  let context = { ...ctx } as IContext;
  try {
    context.logger.verbose('run blocks');
    context.tables = {};
    context.indexes = {};
    context = await Promise.resolve<Partial<IContext>>(context).then(
      initialize('blocks')
    );

    const last = await getLastSyncedBlock(context);
    const unsyncedBlocks = (await BlockModel.find({
      block_num: { $gt: last }
    }).exec())
      .map(t => t.toObject())
      .map(t => ((t._id = t._id.toString()), t));

    console.log(`Sync ${unsyncedBlocks.length} blocks`);

    const result = await context.db
      .table('blocks')
      .insert(unsyncedBlocks, {
        conflict: 'error'
      })
      .run(context.conn);

    console.log(result);
  } catch (e) {
    context.logger.error(e);
  }

  if (context.conn && context.conn.open) {
    context.conn.close();
  }

  if (mongoose.connection && mongoose.connection.readyState != 0) {
    mongoose.disconnect();
  }
}
