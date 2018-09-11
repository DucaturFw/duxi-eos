import r from 'rethinkdb';

export interface IOptions {
  app: string;
  rethinkHost: string;
  rethinkPort: number;
  rethinkDatabase: string;
  mongodbHost: string;
  mongodbPort: number;
  mongodbDatabase: string;
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
