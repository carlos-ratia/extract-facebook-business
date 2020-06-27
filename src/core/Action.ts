import { IAction } from "./interfaces/IAction";
import { NextFunction, Request, Response } from "express";
import { InternalError } from "./Errors/InternalError";
import PromiseB from "bluebird";

export abstract class Action implements IAction {
  protected constructor() {}

  call = (req: Request, res: Response, next: NextFunction): PromiseB<void> => {
    return PromiseB.try(() => {
      this.preDoCall(req);
    })
      .then(() => {
        return this.doCall(req, res);
      })
      .then((result) => {
        this.postDoCall(res, result);
      })
      .catch((reject: any) => {
        const error = InternalError.create(reject, req, res);
        next(error);
      });
  };

  protected preDoCall(_req: Request): void {}

  protected postDoCall(res: Response, result: any): void {
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  }

  protected abstract doCall(req: Request, res: Response): PromiseB<any>;
}
