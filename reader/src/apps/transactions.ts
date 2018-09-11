import { makeReader } from './base-reader';
import { TransactionModel } from '../models/transaction';

export const run = makeReader({
  app: 'transactions',
  table: 'tx',
  indexes: ['createdAt', 'ref_block_num'],
  model: TransactionModel,
  lastSaved: ctx =>
    (ctx.tables['tx'] as any)
      .max('createdAt')('createdAt')
      .default(new Date(0))
      .run(ctx.conn),
  recent: last => ({ createdAt: { $gt: last } })
});
