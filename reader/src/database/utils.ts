import r, { table } from 'rethinkdb';
import { IContext } from '../context';
import { important, DeepPartial } from '../utils';

export const getConnection = () => async (
  ctx: Partial<IContext>
): Promise<r.Connection> => {
  if (ctx.conn && ctx.conn.open) {
    return ctx.conn;
  } else {
    const options = important(ctx.options);
    const host = important(options.rethinkHost);
    const port = important(options.rethinkPort);
    return r.connect({ host, port });
  }
};

export const getOrCreateDatabase = (database: string) => async (
  ctx: Partial<IContext>
): Promise<r.Db> => {
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

export const checkOrCreateTable = (
  table: string,
  opts?: r.TableOptions
) => async (ctx: Partial<IContext>): Promise<r.Table> => {
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

export const checkOrCreateIndex = <U>(
  tableName: string,
  indexName: string,
  indexFunc?: r.IndexFunction<U>
) => async (ctx: Partial<IContext>): Promise<string> => {
  const indexKey = `${tableName}_${indexName}`;
  if (ctx.indexes && ctx.indexes[indexKey]) {
    return indexKey;
  }

  const connection = important(ctx.conn);
  const table = important(ctx.tables[tableName]);

  let indexes = await table.indexList().run(connection);
  if (indexes.indexOf(indexName) == -1) {
    await table.indexCreate(indexName, indexFunc).run(connection);
    await table.indexWait(indexName).run(connection);
  }

  return indexKey;
};
