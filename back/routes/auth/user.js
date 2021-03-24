module.exports = function (app) {
  const { userC } = require("../../src/controllers/auth/userController.js");
  app.route("/auth/user").get(userC);
};
