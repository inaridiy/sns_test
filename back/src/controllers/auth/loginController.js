const bcrypt = require("bcrypt"),
  { jwtconfig } = require("../../config/config"),
  { Users } = require("../../db/models"),
  jwt = require("jsonwebtoken");

module.exports.loginC = async function (req, res, next) {
  const body = req.body;
  if (!body.email || !body.password) {
    return res.status(400).json({
      message: "not enough",
    });
  }

  const userData = await Users.scope({
    method: ["login", body.email],
  }).findOne();
  if (!userData) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const result = await bcrypt
    .compare(body.password, userData.dataValues.password)
    .catch((e) => next({ Stack: e, msg: "hash error" }));

  if (!result) {
    return res.status(400).json({
      message: "not match",
    });
  }

  const payload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
  const token = jwt.sign(payload, jwtconfig.secretKey);
  return res.json({ token });
};
