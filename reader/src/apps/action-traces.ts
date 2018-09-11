import { ActionTraceModel } from '../models/action-trace';
import { makeReader } from './base-reader';

export const run = makeReader({
  app: 'action-traces',
  table: 'actionTraces',
  indexes: ['createdAt'],
  model: ActionTraceModel,
  lastSaved: ctx =>
    (ctx.tables['actionTraces'] as any)
      .max('createdAt')('createdAt')
      .default(new Date(0))
      .run(ctx.conn),
  recent: last => ({ createdAt: { $gt: last } })
});
