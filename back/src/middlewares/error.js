const { accessLogger, systemLogger } = require("../logger/logger");

module.exports.logErrors = function (err, req, res, next) {
  accessLogger.error(err.msg);
  systemLogger.error(err.Stack);
  next(err);
};

module.exports.errorHandler = function (err, req, res, next) {
  res.status(err.statusCode || 500);
  res.send({ error: err.msg || "不明なエラー" });
};
