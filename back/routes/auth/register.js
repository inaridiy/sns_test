module.exports = function (app) {
  const {
    registerC,
  } = require("../../src/controllers/auth/registerController.js");
  app.route("/auth/register").post(registerC);
};
