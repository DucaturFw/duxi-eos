import { makeReader } from './base-reader';
import { BlockStateModel } from '../models/block-state';

export const run = makeReader({
  app: 'block-states',
  table: 'blockStates',
  indexes: ['createdAt'],
  model: BlockStateModel,
  lastSaved: ctx =>
    (ctx.tables['blockStates'] as any)
      .max('createdAt')('createdAt')
      .default(new Date(0))
      .run(ctx.conn),
  recent: last => ({ createdAt: { $gt: last } })
});
