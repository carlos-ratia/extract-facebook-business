import { Express, NextFunction, Request, Response } from "express";
import { DELETE, GET, IRoute, POST, PUT } from "./interfaces/IRoute";
import PromiseB from "bluebird";
import _ from "lodash";
import { IRouteMiddleware } from "./interfaces/IRouteMiddleware";
import { IAction } from "./interfaces/IAction";
import createHttpError from "http-errors";

const asyncMiddleware = (wrap: {
  (req: Request, res: Response, next: NextFunction): void;
}) => (req: Request, res: Response, next: NextFunction) => {
  PromiseB.resolve(wrap(req, res, next)).catch(next);
};

export class Routes {
  private readonly _routes: IRoute[];

  get routes(): IRoute[] {
    return this._routes;
  }

  constructor(routes: IRoute[]) {
    this._routes = routes;
  }

  public register(app: Express): Express {
    this.routes.forEach((route: IRoute) => {
      this.setHandler(route, app);
    });
    return app;
  }

  setHandler(route: IRoute, app: Express) {
    switch (route.method) {
      case GET:
        app.get(route.pattern, this.getHandlerByRoute(route));
        break;
      case POST:
        app.post(route.pattern, this.getHandlerByRoute(route));
        break;
      case PUT:
        app.put(route.pattern, this.getHandlerByRoute(route));
        break;
      case DELETE:
        app.delete(route.pattern, this.getHandlerByRoute(route));
        break;
      default:
        throw createHttpError(
          400,
          `Error in the Routes.setHandler(...) -> Method ${
            route.method
          } is not supported. ${JSON.stringify(route)}`
        );
    }
  }

  getHandlerByRoute(
    route: IRoute
  ): ((req: Request, res: Response, next: NextFunction) => void)[] {
    const mws: IRouteMiddleware[] | undefined = route.middleware;
    if (!_.isUndefined(mws) && _.isArray(mws) && mws.length > 0) {
      return this.getHandlerByRouteWithMiddleware(mws, route.action);
    } else {
      return [this.getHandlerByRouteWithoutMiddleware(route.action)];
    }
  }

  getHandlerByRouteWithMiddleware(
    mws: IRouteMiddleware[],
    action: IAction
  ): ((req: Request, res: Response, next: NextFunction) => void)[] {
    const handler = [];
    mws.forEach((mw: IRouteMiddleware) => {
      handler.push(mw.call);
    });
    handler.push(this.getHandlerByRouteWithoutMiddleware(action));
    return handler;
  }

  getHandlerByRouteWithoutMiddleware(
    action: IAction
  ): (req: Request, res: Response, next: NextFunction) => void {
    return asyncMiddleware(action.call);
  }
}
