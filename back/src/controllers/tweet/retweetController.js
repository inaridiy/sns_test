const { Retweets } = require("../../db/models/models");

module.exports.retweet = async function (req, res, next) {
  const { tweet_id } = req.body;
  if (!tweet_id) {
    next({
      Stack: "client error",
      msg: "tweetid not found",
      statusCode: 403,
    });
  }
  try {
    await Retweets.create({ user_id: req.user.id, tweet_id });
    res.json({ message: "Like successfully" });
  } catch (e) {
    next({ Stack: e, msg: "DB error", statusCode: 500 });
  }
};

module.exports.getRetweetCount = async function (req, res, next) {
  const { tweet_id } = req.body;
  if (!tweet_id) {
    next({
      Stack: "client error",
      msg: "tweetid not found",
      statusCode: 403,
    });
  }
  try {
    const count = await Retweets.count({ where: { tweet_id } });
    return res.json({ likesCount: count });
  } catch (e) {
    next({ Stack: e, msg: "DB error", statusCode: 500 });
  }
};
