module.exports = function (app) {
  const { loginC } = require("../../src/controllers/authController.js");
  app.route("/auth/login").post(loginC);
};
