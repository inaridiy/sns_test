const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Users = sequelize.define(
    "user",
    {
      name: { type: Sequelize.STRING },
      id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      icon: { type: Sequelize.STRING },
      profile: {
        type: Sequelize.STRING,
      },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password", "email"] },
      },
      scopes: {
        login: (email) => ({ where: { email } }),
      },
    }
  );

  Users.sync();

  return { Users };
};
