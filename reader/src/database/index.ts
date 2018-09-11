import {
  getConnection,
  getOrCreateDatabase,
  checkOrCreateTable,
  checkOrCreateIndex
} from './utils';
import { IContext } from '../context';
import { inside, important, sequence, replace, nothing } from '../utils';

export async function getLastSyncedBlock(ctx: Partial<IContext>) {
  const options = important(ctx.options);

  await sequence(
    inside(getConnection(), replace('conn')),
    inside(getOrCreateDatabase(options.rethinkDatabase), replace('db')),
    inside(
      checkOrCreateTable('blocks', {
        primary_key: '_id'
      }),
      (ctx, table) => ((ctx.tables['blocks'] = table), ctx)
    ),
    inside(
      checkOrCreateIndex('blocks', 'block_id'),
      (ctx, key) => ((ctx.indexes[key] = true), ctx)
    )
  );

  return (ctx.tables['blocks'] as any)
    .max('number')('number')
    .default(0)
    .run(ctx.conn);
}
