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
  profile: {
    type: Sequelize.STRING,
  },
  password: { type: Sequelize.STRING, allowNull: false },
});

module.exports.Tweets = sequelize.define("tweet", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: { model: "users", key: "id" }, // 外部キー
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  to: {
    type: Sequelize.INTEGER,
  },
  text: {
    type: Sequelize.STRING,
  },
});
module.exports.Followers = sequelize.define("follower", {
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: { model: "users", key: "id" }, // 外部キー
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  by_user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: { model: "users", key: "id" }, // 外部キー
    onUpdate: "cascade",
    onDelete: "cascade",
  },
});
module.exports.Likes = sequelize.define("like", {
  tweet_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: "tweets", key: "id" }, // 外部キー
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
    references: { model: "users", key: "id" }, // 外部キー
    onUpdate: "cascade",
    onDelete: "cascade",
  },
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
