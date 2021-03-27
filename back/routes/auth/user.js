module.exports = function (app) {
  const { userC } = require("../../src/controllers/auth/userController.js"),
    { isAuth } = require("../../src/middlewares/isAuth");
  app.route("/auth/user").get(isAuth, userC);
};
