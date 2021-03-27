const memo = require("./memo"),
  login = require("./auth/login"),
  register = require("./auth/register"),
  user = require("./auth/user"),
  tweet = require("./tweet/tweet"),
  follow = require("./follow/follow"),
  like = require("./tweet/like"),
  retweet = require("./tweet/retweet");

module.exports = (app) => {
  memo(app);
  login(app);
  register(app);
  user(app);
  tweet(app);
  follow(app);
  like(app);
  retweet(app);
};
