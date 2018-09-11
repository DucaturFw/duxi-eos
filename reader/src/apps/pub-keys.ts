import { makeReader } from './base-reader';
import { PubKeyModel } from '../models/pub-key';

export const run = makeReader({
  app: 'pub-keys',
  table: 'pubKeys',
  indexes: ['createdAt'],
  model: PubKeyModel,
  lastSaved: ctx =>
    (ctx.tables['pubKeys'] as any)
      .max('createdAt')('createdAt')
      .default(new Date(0))
      .run(ctx.conn),
  recent: last => ({ createdAt: { $gt: last } })
});
