module.exports.userC = async function (req, res, next) {
<<<<<<< HEAD
  const isAuth = req.auth;
  if (isAuth) {
    res.json({ user: req.user });
  } else {
    next({ Stack: "not match key", msg: "not match key", statusCode: 403 });
  }
=======
  res.json({ user: req.user });
>>>>>>> origin/master
};
