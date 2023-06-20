import * as dotenv from 'dotenv';
import { singleton } from 'tsyringe';
dotenv.config();

@singleton()
export class Configuration {
  PORT: number;
  DATABASE_URL: string;
  APP_LOG_LEVEL: string;
  TOKEN_SECRET: string;
  MORALIS_API_KEY: string;

  constructor() {
    this.PORT = +(process.env.PORT || 3000);
    this.DATABASE_URL = process.env.APP_DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb?schema=public';
    this.APP_LOG_LEVEL = process.env.APP_LOG_LEVEL || 'debug';
    this.TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';
    this.MORALIS_API_KEY = process.env.MORALIS_API_KEY || 'secret';
  }
};


