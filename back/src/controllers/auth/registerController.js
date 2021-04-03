const bcrypt = require("bcrypt"),
  { hashConfig } = require("../../config/config");
<<<<<<< HEAD
const { Users } = require("../../db/models/models");
=======
const { Users } = require("../../db/models");
>>>>>>> origin/master

module.exports.registerC = async function (req, res, next) {
  const body = req.body;
  if (!body.name || !body.password || !body.email || !body.id) {
<<<<<<< HEAD
    next({
      Stack: "client error:not enough",
      msg: "not enough",
      statusCode: 400,
=======
    return res.status(400).json({
      message: "not enough",
>>>>>>> origin/master
    });
  }
  const hashedPassword = await bcrypt
    .hash(body.password, hashConfig.saltRounds)
    .catch((e) => next({ Stack: e, msg: "hash error" }));
<<<<<<< HEAD
  await Users.create({
    name: body.name,
    email: body.email,
    password: hashedPassword,
    id: body.id,
  }).catch((e) => next({ Stack: e, msg: "db error" }));
  return res.json({
    message: "create User successfully",
    data: [body.name, body.email, body.id],
  });
=======
  const [user, created] = await Users.findOrCreate({
    where: { id: body.id },
    defaults: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      id: body.id,
    },
  }).catch((e) => next({ Stack: e, msg: "db error" }));
  if (created) {
    return res.json({
      message: "create User successfully",
      data: [body.name, body.email, body.id],
    });
  } else {
    return res.status(400).json({
      message: "already exists",
    });
  }
>>>>>>> origin/master
};
