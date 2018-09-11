import r from 'rethinkdb';
import { IContext } from '../context';
import { important } from '../utils';

export const getConnection = (ctx: Partial<IContext>) => (): Promise<
  r.Connection
> => {
  return r.connect({
    host: important(ctx.options).rethinkHost,
    port: important(ctx.options).rethinkPort
  });
};

export const getOrCreateDatabase = (ctx: Partial<IContext>) => async (
  database: string
): Promise<r.Db> => {
  const connection = important(ctx.conn);
  const databases = await r.dbList().run(connection);
  if (databases.indexOf(database) === -1) {
    await r.dbCreate(database).run(connection);
  }

  return r.db(database);
};

export const checkOrCreateTable = (ctx: Partial<IContext>) => async (
  table: string,
  opts?: r.TableOptions
): Promise<void> => {
  const database = important(ctx.db);
  const connection = important(ctx.conn);

  const tables = await database.tableList().run(connection);
  if (tables.indexOf(table) === -1) {
    await database.tableCreate(table, opts).run(connection);
  }
};
