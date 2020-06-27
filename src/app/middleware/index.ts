import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import errorHandler from "errorhandler";
import morgan from "morgan";
import { AppLevelMiddleware } from "../../core/AppLevelMiddleware";

const appMiddlewares: any = [
  compression(),
  cors({ origin: /https:\/\/(\w|-)*\.bunkerdb\.com$/ }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  helmet(),
  morgan(
    ":remote-addr - :remote-user [:date] :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent [:response-time ms]"
  ),
];

if (process.env.NODE_ENV === "development") {
  appMiddlewares.push(errorHandler());
}

export const AppLevelMiddlewareManager: AppLevelMiddleware = new AppLevelMiddleware(
  appMiddlewares
);
