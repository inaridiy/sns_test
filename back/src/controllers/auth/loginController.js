const bcrypt = require("bcrypt"),
  { jwtconfig } = require("../../config/config"),
<<<<<<< HEAD
  { Users } = require("../../db/models/models"),
=======
  { Users } = require("../../db/models"),
>>>>>>> origin/master
  jwt = require("jsonwebtoken");

module.exports.loginC = async function (req, res, next) {
  const body = req.body;
<<<<<<< HEAD
  if (!body.email || !body.password)
    return next({ Stack: "client error", msg: "not enough", statusCode: 400 });

  const userData = await Users.findOne({ where: { email: body.email } });
  if (!userData)
    return next({
      Stack: "client error:user not found",
      msg: "user not found",
      statusCode: 400,
    });
=======
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
>>>>>>> origin/master

  const result = await bcrypt
    .compare(body.password, userData.dataValues.password)
    .catch((e) => next({ Stack: e, msg: "hash error" }));

<<<<<<< HEAD
  if (!result)
    return next({ Stack: "client error:not match", msg: "not match" });
=======
  if (!result) {
    return res.status(400).json({
      message: "not match",
    });
  }
>>>>>>> origin/master

  const payload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };
  const token = jwt.sign(payload, jwtconfig.secretKey);
  return res.json({ token });
};
