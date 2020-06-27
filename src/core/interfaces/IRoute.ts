import { IAction } from "./IAction";
import { IRouteMiddleware } from "./IRouteMiddleware";

export type RouteMethodType = "GET" | "POST" | "PUT" | "DELETE";

export const GET: RouteMethodType = "GET";
export const POST: RouteMethodType = "POST";
export const PUT: RouteMethodType = "PUT";
export const DELETE: RouteMethodType = "DELETE";

export interface IRoute {
  method: RouteMethodType;
  pattern: string;
  action: IAction;
  middleware?: IRouteMiddleware[];
}
