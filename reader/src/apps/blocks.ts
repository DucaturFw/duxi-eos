import {
  getConnection,
  getOrCreateDatabase,
  checkOrCreateTable,
  checkOrCreateIndex
} from '../database/utils';
import { IContext, IOptions } from '../context';
import { inside, replace, important } from '../utils';
import { getLastSyncedBlock } from '../database';
import { BlockModel } from '../models/block';

import mongoose from 'mongoose';

function getOptions() {
  return async (): Promise<IOptions> => ({
    app: 'blocks',
    delay: 500,
    rethinkHost: process.env.RETHINK_HOST,
    rethinkPort: parseInt(process.env.RETHINK_PORT, 10),
    rethinkDatabase: process.env.RETHINK_DB
  });
}

export async function run() {
  important(process.env.RETHINK_HOST);
  important(process.env.RETHINK_PORT);
  important(process.env.RETHINK_DB);
  important(process.env.MONGODB_HOST);
  important(process.env.MONGODB_PORT);
  important(process.env.MONGODB_DB);
  await mongoose.connect(
    [
      'mongodb://',
      process.env.MONGODB_HOST,
      ':',
      process.env.MONGODB_PORT,
      '/',
      process.env.MONGODB_DB
    ].join('')
  );

  const context = (await Promise.resolve<Partial<IContext>>({
    tables: {},
    indexes: {}
  })
    .then(inside(getOptions(), replace('options')))
    .then(inside(getConnection(), replace('conn')))
    .then(
      inside(
        ctx => getOrCreateDatabase(ctx.options.rethinkDatabase)(ctx),
        replace('db')
      )
    )
    .then(
      inside(
        checkOrCreateTable('blocks', {
          primary_key: '_id'
        }),
        (ctx, table) => ((ctx.tables['blocks'] = table), ctx)
      )
    )
    .then(
      inside(
        checkOrCreateIndex('blocks', 'block_id'),
        (ctx, key) => ((ctx.indexes[key] = true), ctx)
      )
    )
    .then(
      inside(
        checkOrCreateIndex('blocks', 'block_num'),
        (ctx, key) => ((ctx.indexes[key] = true), ctx)
      )
    )) as IContext;

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

  context.conn.close();
  mongoose.disconnect();
}
