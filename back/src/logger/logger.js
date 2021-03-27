const log4js = require("log4js");
const path = require("path");

log4js.configure({
  appenders: {
    system: {
      type: "file",
      filename: path.join(__dirname, "../../log/system.log"),
    },
    console: {
      type: "console",
    },
    access: {
      type: "file",
      filename: path.join(__dirname, "../../log/access.log"),
    },
    database: {
      type: "file",
      filename: path.join(__dirname, "../../log/database.log"),
    },
  },
  categories: {
    default: { appenders: ["system", "console"], level: "debug" },
    web: { appenders: ["access"], level: "debug" },
    db: { appenders: ["database"], level: "debug" },
  },
});

module.exports = {
  systemLogger: log4js.getLogger(),
  accessLogger: log4js.getLogger("web"),
  databaseLogger: log4js.getLogger("db"),
};
