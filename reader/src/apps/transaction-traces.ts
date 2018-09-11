import { makeReader } from './base-reader';
import { PubKeyModel } from '../models/pub-key';

export const run = makeReader({
  app: 'transaction-traces',
  table: 'transactionTraces',
  indexes: ['createdAt', 'id'],
  model: PubKeyModel,
  lastSaved: ctx =>
    (ctx.tables['transactionTraces'] as any)
      .max('createdAt')('createdAt')
      .default(new Date(0))
      .run(ctx.conn),
  recent: last => ({ createdAt: { $gt: last } })
});
