const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Belong = sequelize.define("belong", {
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

  Belong.sync();

  return { Belong };
};
