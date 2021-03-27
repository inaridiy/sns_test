const { jwtconfig } = require("../config/config"),
  jwt = require("jsonwebtoken");

module.exports.isAuth = async function (req, res, next) {
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];
  jwt.verify(token, jwtconfig.secretKey, (err, user) => {
    if (err) {
      req.auth = false;
      next();
    } else {
      req.user = user;
      req.auth = true;
      next();
    }
  });
};
