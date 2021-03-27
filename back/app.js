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

const Models = require("./src/db/models/models");

const routes = require("./routes/main"); // Routeのインポート
routes(app);

const { logErrors, errorHandler } = require("./src/middlewares/error");
app.use(logErrors);
app.use(errorHandler);

(async () => {
  await Promise.all(Object.values(Models).map((model) => model.sync()));
  app.listen(port, () => {
    systemLogger.info("system start");
  });
})();
