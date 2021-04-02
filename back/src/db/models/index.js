const Sequelize = require("sequelize"),
  path = require("path"),
  { databaseLogger } = require("../../logger/logger");

const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: path.join(__dirname, "../../../db.db"),
  logging: (log) => {
    databaseLogger.debug(log);
  },
});

const { Users } = require("./users")(sequelize),
  { Servers } = require("./servers")(sequelize),
  { Channels } = require("./channels")(sequelize),
  { Messages } = require("./messages")(sequelize),
  { Medias } = require("./medias")(sequelize),
  { Belong } = require("./affiliation")(sequelize);

Servers.hasMany(Channels, { foreignKey: "server_id", sourceKey: "id" });
Channels.hasOne(Servers, { foreignKey: "id", sourceKey: "id" });

module.exports = {
  sequelize,
  Users,
  Servers,
  Channels,
  Messages,
  Medias,
  Belong,
};
