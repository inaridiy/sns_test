module.exports.userC = async function (req, res, next) {
  res.json({ user: req.user });
};
