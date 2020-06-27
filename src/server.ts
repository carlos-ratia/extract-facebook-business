import dotEnv from "dotenv";
import App from "./core/App";
import ErrnoException = NodeJS.ErrnoException;
import _ from "lodash";

dotEnv.config();

_.forIn(
  {
    SERVICE_NAME: process.env.SERVICE_NAME,
    PORT: process.env.PORT,
  },
  (value, key) => {
    if (_.isUndefined(value) || _.isNull(value) || _.isEmpty(value)) {
      console.error(`The ${key} is no define in the .env`);
      process.exit(1);
    }
  }
);

const port = process.env.PORT;
const app: App = new App();

export const server = app.framework.listen(port, () => {
  console.log(
    " App is running at http://localhost:%d in %s mode",
    port,
    app.framework.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

//server.on('close', onClose);
//server.on('connection', onConnection);
server.on("error", (error: ErrnoException) => {
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Port " + port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port " + port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

export default server;
