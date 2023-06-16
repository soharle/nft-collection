import { Router, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '../../build/routes';
import { GenericErrorHandler } from './middleware/GenericErrorHandler';
import { injectable } from 'tsyringe';


@injectable()
export class ApiRouter {
  constructor(private errorHandler: GenericErrorHandler) { }
  public create(): Router {
    const router = Router();

    RegisterRoutes(router);

    router
      .use(helmet())
      .use(cors())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: false
        })
      )
      .use("/swagger", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import("../../build/swagger.json"))
        );
      })
      .use(json())
      .use(compression())
      .use(this.errorHandler.handle);


    return router;
  }
}
