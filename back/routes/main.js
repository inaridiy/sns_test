const memo = require("./memo"),
  login = require("./auth/login"),
  register = require("./auth/register"),
  user = require("./auth/user"),
  tweet = require("./tweet/tweet"),
  follow = require("./follow/follow");

module.exports = (app) => {
  memo(app);
  login(app);
  register(app);
  user(app);
  tweet(app);
  follow(app);
};
