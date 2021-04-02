const { Channels, Servers } = require("../../db/models");

module.exports.getChannelData = async (req, res, next) => {
  const { channel_id } = req.query;
  try {
    const channel = await Channels.findByPk(channel_id, {
      include: [{ model: Servers }],
    });
    res.json(channel);
  } catch (e) {
    next({ Stack: e, msg: "db error" });
  }
};

module.exports.createChannel = async (req, res, next) => {
  const { server_id, name = "無名のチャンネル", type = "text" } = req.query,
    userData = req.user;
  if (!server_id) {
    return res.status(400).json({
      message: "server id not found",
    });
  }
  try {
    const serverData = await Servers.findByPk(server_id).catch((e) => {
      throw new Error(e);
    });

    if (!Object.keys(serverData).length) {
      return res.status(400).json({
        message: "server not found",
      });
    }
    if (!serverData.user_id === userData.id) {
      return res.status(400).json({
        message: "not match server created user",
      });
    }
    await Channels.create({ server_id, name, type }).catch((e) => {
      throw new Error(e);
    });
    return res.json({
      message: "create channel successfully",
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
