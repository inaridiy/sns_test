const loginC = require("../controllers/loginController");
module.exports = function (app) {
  app.route("/login").post(loginC.login);
};
