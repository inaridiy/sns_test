const express = require("express"),
  router = express.Router();

const { isAuth } = require("../../src/middlewares/isAuth");
const {
  getChannelData,
  createChannel,
  deleteChannel,
} = require("../../src/controllers/management/channelController");
const {
  getServerData,
  createServer,
} = require("../../src/controllers/management/serverController");

router
  .route("/channel")
  .get(getChannelData)
  .post(isAuth, createChannel)
  .delete(deleteChannel);

router.route("/server").get(getServerData).post(isAuth, createServer);

module.exports = router;
