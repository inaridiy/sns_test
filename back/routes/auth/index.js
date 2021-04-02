const express = require("express"),
  router = express.Router();

const { loginC } = require("../../src/controllers/auth/loginController.js"),
  { registerC } = require("../../src/controllers/auth/registerController.js"),
  { userC } = require("../../src/controllers/auth/userController.js"),
  { isAuth } = require("../../src/middlewares/isAuth");

router.post("/login", loginC);
router.post("/register", registerC);
router.get("/user", isAuth, userC);

module.exports = router;
