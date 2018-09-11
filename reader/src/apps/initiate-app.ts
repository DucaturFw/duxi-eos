import { Table } from 'rethinkdb';
import mongoose from 'mongoose';
import { IContext, IOptions } from '../context';
import { inside, replace, important } from '../utils';
import {
  getOrCreateDatabase,
  getConnection,
  checkOrCreateTable,
  checkOrCreateIndex
} from '../database/utils';

function getOptions(app: string, opts?: IOptions) {
  important(process.env.RETHINK_HOST);
  important(process.env.RETHINK_PORT);
  important(process.env.RETHINK_DB);
  important(process.env.MONGODB_HOST);
  important(process.env.MONGODB_PORT);
  important(process.env.MONGODB_DB);

  return async (): Promise<IOptions> => ({
    ...opts,
    app,
    rethinkHost: process.env.RETHINK_HOST,
    rethinkPort: parseInt(process.env.RETHINK_PORT, 10),
    rethinkDatabase: process.env.RETHINK_DB,
    mongodbHost: process.env.MONGODB_HOST,
    mongodbPort: parseInt(process.env.MONGODB_PORT, 10),
    mongodbDatabase: process.env.MONGODB_DB
  });
}

function initiazeDatabase() {
  return ctx => getOrCreateDatabase(ctx.options.rethinkDatabase)(ctx);
}

const pushTable = (tableName: string) => (
  ctx: Partial<IContext>,
  table: Table
) => ((ctx.tables[tableName] = table), ctx);

const pushIndex = (ctx: Partial<IContext>, key: string) => (
  (ctx.indexes[key] = true), ctx
);

const DEFAULT_TABLE = {
  primary_key: '_id'
};

function makeTable(table: string, indexes: string[]) {
  return async (ctx: Partial<IContext>) => {
    ctx = await inside(
      checkOrCreateTable(table, DEFAULT_TABLE),
      pushTable(table)
    )(ctx);
    for (let index of indexes) {
      ctx = await inside(checkOrCreateIndex(table, index), pushIndex)(ctx);
    }

    return ctx;
  };
}

export const initialize = (app: string, table: string, indexes: string[]) => (
  ctx: Partial<IContext>
): Promise<IContext> => {
  return Promise.resolve(ctx)
    .then(inside(getOptions(app, ctx.options), replace('options')))
    .then(async ctx => {
      const {
        mongodbHost: host,
        mongodbPort: port,
        mongodbDatabase: db
      } = ctx.options;
      await mongoose.connect(`mongodb://${host}:${port}/${db}`);
      return ctx;
    })
    .then(inside(getConnection(), replace('conn')))
    .then(inside(initiazeDatabase(), replace('db')))
    .then(makeTable(table, indexes))
    .then(ctx => ctx as IContext);
};
