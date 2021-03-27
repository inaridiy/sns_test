module.exports = function (app) {
  const {
      followC,
      unFollowC,
      getFollowerC,
      stateWithC,
    } = require("../../src/controllers/follow/followController"),
    { isAuth } = require("../../src/middlewares/isAuth");

  app
    .route("/follow")
    .get(isAuth, getFollowerC)
    .post(isAuth, followC)
    .delete(isAuth, unFollowC);
  app.route("/followWith").get(isAuth, stateWithC);
};
