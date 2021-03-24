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

module.exports.Memos = sequelize.define("memo", {
  title: Sequelize.STRING,
  memoId: Sequelize.STRING,
  memo: Sequelize.STRING,
});

module.exports.Users = sequelize.define("user", {
  screen_name: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: { type: Sequelize.STRING, allowNull: false },
});

/* (async () => {
  await Memos.sync();
  const user = await Memos.create({
    title: "テストメモ3",
    memoId: "1235",
    memo: "本文3",
  });
  const rows = await sequelize.query("select * from Memos");
  console.log(rows);
})();*/
