module.exports = function (app) {
  const {
      follow,
      unFollow,
      getFollower,
      stateWith,
    } = require("../../src/controllers/follow/followController"),
    { isAuth } = require("../../src/middlewares/isAuth");

  app
    .route("/follow")
    .get(isAuth, getFollower)
    .post(isAuth, follow)
    .delete(isAuth, unFollow);
  app.route("/followWith").get(isAuth, stateWith);
};
