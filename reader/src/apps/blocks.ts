import { BlockModel } from '../models/block';
import { makeReader } from './base-reader';

export const run = makeReader({
  app: 'blocks',
  table: 'blocks',
  indexes: ['block_num', 'block_id'],
  model: BlockModel,
  lastSaved: ctx =>
    (ctx.tables['blocks'] as any)
      .max('block_num')('block_num')
      .default(0)
      .run(ctx.conn),
  recent: last => ({ block_num: { $gt: last } })
});
