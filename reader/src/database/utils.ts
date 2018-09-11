import r from 'rethinkdb';
import { IContext } from '../context';
import { important } from '../utils';

export const getConnection = (ctx: {
  options?: {
    rethinkHost?: string;
    rethinkPort?: number;
  };
  conn?: r.Connection;
}) => async (): Promise<r.Connection> => {
  if (ctx.conn && ctx.conn.open) {
    return ctx.conn;
  } else {
    const options = important(ctx.options);
    const host = important(options.rethinkHost);
    const port = important(options.rethinkPort);
    return r.connect({ host, port });
  }
};

export const getOrCreateDatabase = (ctx: {
  conn?: r.Connection;
  db?: r.Db;
}) => async (database: string): Promise<r.Db> => {
  if (ctx.db) {
    return ctx.db;
  }
  const connection = important(ctx.conn);
  const databases = await r.dbList().run(connection);
  if (databases.indexOf(database) === -1) {
    await r.dbCreate(database).run(connection);
  }

  return r.db(database);
};

export const getOrCreateTable = (ctx: Partial<IContext>) => async (
  table: string,
  opts?: r.TableOptions
): Promise<r.Table> => {
  if (ctx.tables && ctx.tables[table]) {
    return ctx.tables[table];
  }
  const database = important(ctx.db);
  const connection = important(ctx.conn);

  const tables = await database.tableList().run(connection);
  if (tables.indexOf(table) === -1) {
    await database.tableCreate(table, opts).run(connection);
  }

  return database.table(table);
};
