module.exports = function (app) {
  const {
      tweetGetC,
      tweetPostC,
    } = require("../../src/controllers/tweet/tweetController"),
    { isAuth } = require("../../src/middlewares/isAuth");
  app.route("/tweet").get(tweetGetC).post(isAuth, tweetPostC);
};
