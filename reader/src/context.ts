import r from 'rethinkdb';

export interface IEosWatchOptions {
  app: string;
  delay: number;
  rethinkHost: string;
  rethinkPort: number;
  rethinkDatabase: string;
  rethinkTable: string;
}

export interface IEosOptions {}

export interface IContext {
  options: IEosWatchOptions;
  db: r.Db;
  conn: r.Connection;
  tables: { [key: string]: r.Table };
  indexes: {
    [key: string]: true;
  };
}
