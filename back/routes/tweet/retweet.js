module.exports = function (app) {
  const {
      retweet,
      getRetweetCount,
    } = require("../../src/controllers/tweet/retweetController"),
    { isAuth } = require("../../src/middlewares/isAuth");
  app.route("/tweet").get(getRetweetCount).post(isAuth, retweet);
};
