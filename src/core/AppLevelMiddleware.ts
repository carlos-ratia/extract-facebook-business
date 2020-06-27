import { Express } from "express";

export class AppLevelMiddleware {
  private _middlewares: any[];

  constructor(middlewares: any[]) {
    this._middlewares = middlewares;
  }

  get middlewares(): any[] {
    return this._middlewares;
  }

  public register(app: Express): Express {
    this.middlewares.forEach((middleware) => {
      app.use(middleware);
    });
    return app;
  }
}
