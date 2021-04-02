const { Channels, Servers } = require("../../db/models");

module.exports.getServerData = async (req, res, next) => {
  const { server_id } = req.query;
  try {
    const server = await Servers.findByPk(server_id, {
      include: [{ model: Channels }],
    });
    res.json(server);
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};

module.exports.createServer = async (req, res, next) => {
  const { name = "無名のサーバー" } = req.query,
    { id: user_id } = req.user;
  try {
    await Servers.create({ name, user_id });
    return res.json({
      message: "create server successfully",
    });
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};

module.exports.deleteChannel = async (req, res, next) => {
  const { channel_id } = req.query,
    { id: user_id } = req.user;

  const channelData = await Channels.findByPk(channel_id);

  if (!Object.keys(channelData).length) {
    return res.status(400).json({
      message: "channel not found",
    });
  }

  if (channelData.user_id === user_id) {
    channelData.destroy();
  } else {
    return res.status(400).json({
      message: "not match channel created user",
    });
  }
};
