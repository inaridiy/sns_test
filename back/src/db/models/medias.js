const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Medias = sequelize.define("media", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    path: { type: Sequelize.STRING },
    type: { type: Sequelize.STRING },
    user_id: {
      type: Sequelize.STRING,
      references: { model: "users", key: "id" }, // 外部キー
      onUpdate: "cascade",
      onDelete: "cascade",
    },
  });

  Medias.sync();

  return { Medias };
};
