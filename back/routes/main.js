const memo = require("./memo"),
  login = require("./auth/login");

module.exports = (app) => {
  memo(app);
  login(app);
};
