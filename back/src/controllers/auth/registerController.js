const bcrypt = require("bcrypt"),
  { hashConfig } = require("../../config/config");
const { Users } = require("../../db/models");

module.exports.registerC = async function (req, res, next) {
  const body = req.body;
  if (!body.name || !body.password || !body.email || !body.id) {
    return res.status(400).json({
      message: "not enough",
    });
  }
  const hashedPassword = await bcrypt
    .hash(body.password, hashConfig.saltRounds)
    .catch((e) => next({ Stack: e, msg: "hash error" }));
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
};
