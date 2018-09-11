import { Table, Connection } from 'rethinkdb';

export async function getLastSyncedBlock(ctx: {
  tables: { [key: string]: Table };
  conn: Connection;
}) {
  return (ctx.tables['blocks'] as any)
    .max('block_num')('block_num')
    .default(0)
    .run(ctx.conn);
}
