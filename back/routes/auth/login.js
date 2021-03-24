module.exports = function (app) {
  const { loginC } = require("../../src/controllers/auth/loginController.js");
  app.route("/auth/login").post(loginC);
};
