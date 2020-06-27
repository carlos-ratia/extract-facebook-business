import { Request } from "express";
import PromiseB from "bluebird";
import ActionBase from "../ActionBase";

export default class Ping extends ActionBase {
  constructor() {
    super();
  }
  protected doCall(_req: Request): PromiseB<{ status: "ok" }> {
    return PromiseB.try(() => {
      return { status: "ok" };
    });
  }
}
