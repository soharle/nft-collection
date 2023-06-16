import express from 'express';
import { AddressInfo } from 'net';
import * as http from 'http';
import { ServerLogger } from './logger';
import { inject, singleton } from 'tsyringe';
import { ApiRouter } from './Router';
import { Configuration } from '../../config';
import { ILogger } from '../interface/ILogger';

@singleton()
export class Server {
  private readonly express: express.Application;
  private http: http.Server | any;

  constructor(
    @inject("ILogger") private logger: ILogger,
    private config: Configuration,
    private apiRouter: ApiRouter
  ) {
    this.express = express();
    this.express.use(this.logger.stream());
    this.express.use(this.apiRouter.create());
  }

  public start = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      this.http = this.express.listen(this.config.PORT, () => {
        const { port } = this.http.address() as AddressInfo;
        this.logger.info(`Application running on PORT ${port}`);
        resolve();
      });
    });
  };

  public stop = async (): Promise<void> => {
    this.logger.info('Stopping http server...');
    await this.http.close();
  };

  public invoke = (): express.Application => express() //this.express;
}
