import r from 'rethinkdb';

export interface IOptions {
  app: string;
  delay: number;
  rethinkHost: string;
  rethinkPort: number;
  rethinkDatabase: string;
}

export interface IEosOptions {}

export interface IContext {
  logger: {
    log(message?: any, ...optionalParams: any[]): void;
    verbose(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
  };
  options: IOptions;
  db: r.Db;
  conn: r.Connection;
  tables: { [key: string]: r.Table };
  indexes: {
    [key: string]: true;
  };
}
