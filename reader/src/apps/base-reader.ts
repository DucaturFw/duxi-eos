import mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { IContext } from '../context';
import { initialize } from './initiate-app';

export function makeReader<T extends Document>(config: {
  app: string;
  table: string;
  indexes: string[];
  model: Model<T>;
  lastSaved: (ctx: Partial<IContext>) => any;
  recent: (last: any) => any;
}) {
  return async (ctx: Partial<IContext>) => {
    let context = { ...ctx } as IContext;
    try {
      context.tables = {};
      context.indexes = {};
      context = await Promise.resolve<Partial<IContext>>(context).then(
        initialize(config.app, config.table, config.indexes)
      );

      const last = await config.lastSaved(context);
      context.logger.verbose(`Latest stored: ${last}`);
      const unsynced = (await config.model.find(config.recent(last)).exec())
        .map(t => t.toObject())
        .map(t => ((t._id = t._id.toString()), t));
      context.logger.verbose(`Unsynced: ${unsynced.length}`);

      const result = await context.db
        .table(config.table)
        .insert(unsynced, {
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
  };
}
