const express = require("express"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const log4js = require("log4js"),
  { systemLogger, accessLogger } = require("./src/logger/logger");
app.use(log4js.connectLogger(accessLogger));

const routes = require("./routes"); // Routeのインポート

app.use("/", routes);

const { logErrors, errorHandler } = require("./src/middlewares/error");
app.use(logErrors);
app.use(errorHandler);

(async () => {
  app.listen(port, () => {
    systemLogger.info("system start");
  });
})();
