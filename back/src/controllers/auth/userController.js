const { jwtconfig } = require("../../config/config"),
  jwt = require("jsonwebtoken");

module.exports.userC = async function (req, res, next) {
  const bearToken = req.headers["authorization"];
  const bearer = bearToken.split(" ");
  const token = bearer[1];

  jwt.verify(token, jwtconfig.secretKey, (err, user) => {
    if (err) {
      next({ Stack: err, msg: "not match key", statusCode: 403 });
    } else {
      return res.json({
        user,
      });
    }
  });
};
