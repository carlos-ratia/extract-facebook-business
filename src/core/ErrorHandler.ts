import { NextFunction, Request, Response } from "express";
import { InternalError } from "./Errors/InternalError";

export class ErrorHandler {
  static call = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(error);
    }
    const _error: AppError = ErrorHandlerFactory.create(error, req, res);
    res.status(_error.status).json(_error);
  };
}

class ErrorHandlerFactory {
  static create(error: any, req: Request, res: Response): AppError {
    let e: AppError;
    if (error instanceof InternalError) {
      e = error;
    } else {
      e = InternalError.create(error, req, res);
    }
    return e;
  }
}

export declare type AppError = {
  status: number;
} & Error;
