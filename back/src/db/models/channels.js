const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Channels = sequelize.define(
    "channel",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
      type: { type: Sequelize.INTEGER },
      server_id: {
        type: Sequelize.INTEGER,
        references: { model: "servers", key: "id" }, // 外部キー
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      scopes: {},
    }
  );

  Channels.sync();

  return { Channels };
};
