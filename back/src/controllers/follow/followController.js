const { Followers } = require("../../db/models/models");

module.exports.follow = async function (req, res, next) {
  const newFollow = req.body.user_id;
  if (!newFollow) {
    next({ Stack: "id not fonund ", msg: "id not fonund", statusCode: 403 });
  }

  try {
    const temp = { user_id: req.user.id, by_user_id: newFollow };
    await Followers.findOrCreate({
      where: temp,
      defaults: temp,
    });
    res.json({ message: "Follow successfully" });
  } catch (e) {
    next({ Stack: new Error(e), msg: "DB error", statusCode: 500 });
  }
};

module.exports.unFollow = async function (req, res, next) {
  const unFollow = req.body.user_id;
  if (!unFollow) {
    next({ Stack: "id not fonund ", msg: "id not fonund", statusCode: 403 });
  }

  try {
    const temp = { user_id: req.user.id, by_user_id: newFollow };
    await User.destroy({
      where: temp,
    });
    res.json({ message: "unFollow successfully" });
  } catch (e) {
    next({ Stack: e, msg: "DB error", statusCode: 500 });
  }
};

module.exports.getFollower = async function (req, res, next) {
  const user_id = req.body.user_id || req.user.id;
  if (!user_id) {
    next({ Stack: "id not fonund ", msg: "id not fonund", statusCode: 403 });
  }
  try {
    const attributes = ["user_id", "by_user_id"];
    const following = await Followers.findAll({
      where: { user_id },
      attributes,
    });
    const follower = await Followers.findAll({
      where: { by_user_id: user_id },
      attributes,
    });
    return res.json({
      follower,
      following,
      followingCount: following.length,
      follower: follower.length,
    });
  } catch (e) {
    return next({ Stack: e, msg: "DB error", statusCode: 500 });
  }
};

module.exports.stateWith = async function (req, res, next) {
  const user_id = req.body.user_id || req.user.id,
    { get_user_id } = req.body;

  if (!user_id || !get_user_id) {
    next({ Stack: "id not fonund ", msg: "id not fonund", statusCode: 403 });
  }

  try {
    const isFollow = !!(await Followers.count({
        where: { user_id, by_user_id: get_user_id },
      })),
      isFollower = !!(await Followers.count({
        where: { by_user_id: user_id, user_id: get_user_id },
      }));
    return res.json({ isFollow, isFollower });
  } catch (e) {
    return next({ Stack: e, msg: "DB error", statusCode: 500 });
  }
};
