const { Tweets } = require("../../db/models/models");

module.exports.tweetPostC = async function (req, res, next) {
  const user = req.user;
  if (!req.auth) {
    next({ Stack: "not login", msg: "not login", statusCode: 403 });
  }
  if (!user.id) {
    next({ Stack: "id not fonund ", msg: "id not fonund", statusCode: 403 });
  }
  if (!req.body.text) {
    next({ Stack: "text empty", msg: "text empty", statusCode: 403 });
  }
  try {
    await Tweets.create({
      id: create_privateid(10),
      user_id: user.id,
      text: req.body.text,
    });
    return res.json({
      message: "post tweet successfully",
    });
  } catch (e) {
    next({ Stack: e, msg: "error", statusCode: 403 });
  }
};
module.exports.tweetGetC = async function (req, res, next) {
  const body = req.body;
  const tweet = await Tweets.findOne({
    where: { id: body.id, user_id: body.user_id },
  });
  res.json(tweet);
};

function create_privateid(n) {
  const CODE_TABLE = "0123456789";
  let r = "";
  for (let i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
}
