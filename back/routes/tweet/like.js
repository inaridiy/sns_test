module.exports = function (app) {
  const {
      like,
      getLikesCount,
    } = require("../../src/controllers/tweet/likeController"),
    { isAuth } = require("../../src/middlewares/isAuth");
  app.route("/tweet/like").get(getLikesCount).post(isAuth, like);
};
