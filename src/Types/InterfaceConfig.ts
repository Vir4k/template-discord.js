export interface IConfig {
  /** Token of the client */
  token: string;

  /** Prefix of the client */
  prefix: string;

  /** Developer ids of the client */
  developers: string;
  /** Mongo Connection String */
  mongoUrl: string;

  /** Unknown Error Message */
  unknownErrorMessage: boolean;
}
