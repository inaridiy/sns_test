const memo = require("./memo"),
  login = require("./auth/login"),
  register = require("./auth/register"),
  user = require("./auth/user");

module.exports = (app) => {
  memo(app);
  login(app);
  register(app);
  user(app);
};
