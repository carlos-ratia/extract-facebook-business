import { Request, Response } from "express";

export class InternalError extends Error {
  public readonly state: any;
  public readonly status: any;
  public readonly method: any;
  public readonly url: any;
  public readonly serviceName: string | undefined;
  public readonly instance: any;
  public readonly otype: any;
  public readonly oid: any;
  public readonly headers: any;
  public readonly params: any;
  public readonly query: any;
  public readonly body: any;
  public readonly locals: any;
  public readonly _stack: any;

  constructor(error: any, state: any) {
    super(error.message);
    this.status = error.status || 500;
    this.method = state.method;
    this.url = state.url;
    this.serviceName = process.env.SERVICE_NAME;
    this.instance = state.instance || "";
    this.otype = state.oType || "";
    this.oid = state.oId || "";
    this.url = state.url;
    this.name = error.name;
    this.params = state.params;
    this.query = state.query;
    this.body = state.body;
    this.locals = state.locals;
    this.headers = state.headers;
    this.stack = error.stack;
    this._stack = error.stack;
  }

  static create(error: any, req: Request, res: Response) {
    const { instance, oId, oType } = req.params;
    const state = {
      method: req.method,
      url: req.originalUrl,
      instance: instance,
      oType: oType,
      oId: oId,
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      locals: res.locals,
    };
    return new InternalError(error, state);
  }
}
