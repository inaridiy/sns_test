const express = require("express"),
  router = express.Router();

router.use("/auth", require("./auth"));
router.use("/management", require("./management"));

module.exports = router;
