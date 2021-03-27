const bcrypt = require("bcrypt"),
  { hashConfig } = require("../../config/config");
const { Users } = require("../../db/models/models");

module.exports.registerC = async function (req, res, next) {
  const body = req.body;
  if (!body.name || !body.password || !body.email || !body.id) {
    next({
      Stack: "client error:not enough",
      msg: "not enough",
      statusCode: 400,
    });
  }
  const hashedPassword = await bcrypt
    .hash(body.password, hashConfig.saltRounds)
    .catch((e) => next({ Stack: e, msg: "hash error" }));
  await Users.create({
    name: body.name,
    email: body.email,
    password: hashedPassword,
    user_id: body.id,
  }).catch((e) => next({ Stack: e, msg: "db error" }));
  return res.json({
    message: "create User successfully",
    data: [body.name, body.email],
  });
};
