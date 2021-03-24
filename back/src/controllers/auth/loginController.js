const bcrypt = require("bcrypt"),
  { jwtconfig } = require("../../config/config"),
  { Users } = require("../../db/models/models"),
  jwt = require("jsonwebtoken");

module.exports.loginC = async function (req, res, next) {
  const body = req.body;
  if (!body.email || !body.password)
    return next({ Stack: "client error", msg: "not enough", statusCode: 400 });

  const userData = await Users.findOne({ where: { email: body.email } });
  if (!userData)
    return next({
      Stack: "client error:user not found",
      msg: "user not found",
      statusCode: 400,
    });

  const result = await bcrypt
    .compare(body.password, userData.dataValues.password)
    .catch((e) => next({ Stack: e, msg: "hash error" }));

  if (!result)
    return next({ Stack: "client error:not match", msg: "not match" });

  const payload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
  const token = jwt.sign(payload, jwtconfig.secretKey);
  return res.json({ token });
};
