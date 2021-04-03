const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Servers = sequelize.define(
    "server",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "users", key: "id" }, // 外部キー
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      scopes: {},
    }
  );

  Servers.sync();

  return { Servers };
};
