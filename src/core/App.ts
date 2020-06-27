import express from "express";
import { Express, Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import { RoutesManager } from "../app/routes";
import { AppLevelMiddlewareManager } from "../app/middleware";
import { ErrorHandler } from "./ErrorHandler";

//import swaggerUi from "swagger-ui-express";

export default class App {
  private readonly _framework: Express;

  public constructor() {
    // Register EXPRESS
    this._framework = express();

    //Register Application-level middleware
    AppLevelMiddlewareManager.register(this._framework);

    // TODO:API DOC
    // if (process.env.NODE_ENV === "development") {
    //   this._framework.use(
    //     "/api-docs",
    //     swaggerUi.serve,
    //     swaggerUi.setup(require("./../../../swagger.json"))
    //   );
    // }

    //DependenciesManager.register(this._pimple);

    //Register Routes
    RoutesManager.register(this.framework);

    // catch 404 and forward to error handler
    this.framework.use((_req: Request, _res: Response, next: NextFunction) => {
      next(createHttpError(404));
    });

    // error handler
    this.framework.use(ErrorHandler.call);
  }

  get framework(): Express {
    return this._framework;
  }
}
