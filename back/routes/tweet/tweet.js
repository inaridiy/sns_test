module.exports = function (app) {
  const {
      tweetGet,
      tweetPost,
    } = require("../../src/controllers/tweet/tweetController"),
    { isAuth } = require("../../src/middlewares/isAuth");
  app.route("/tweet").get(tweetGet).post(isAuth, tweetPost);
};
