const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Messages = sequelize.define("messages", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: Sequelize.STRING },
    channel_id: {
      type: Sequelize.INTEGER,
      references: { model: "channels", key: "id" }, // 外部キー
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    user_id: {
      type: Sequelize.STRING,
      references: { model: "users", key: "id" }, // 外部キー
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  });

  Messages.sync();

  return { Messages };
};
