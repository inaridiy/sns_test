module.exports = function (app) {
  var memoC = require("../src/controllers/memoController");

  app.route("/memos/:memoId").get(memoC.get).post(memoC.update);
};
