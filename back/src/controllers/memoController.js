const { Memos } = require("../db/models/models");

module.exports.get = async function (req, res) {
  const memoId = req.params.memoId;
  try {
    const data = await Memos.findOrCreate({
      where: { memoId },
      defaults: {
        title: "無題",
        memoId,
        memo: "",
      },
    });

    res.json(data[0]);
  } catch (e) {
    res.status(503);
  }
};

module.exports.update = async function (req, res) {
  const memoId = req.params.memoId;
  try {
    await Memos.update(
      {
        memoId,
        title: req.body.title,
        memo: JSON.stringify(req.body.memo),
      },
      { where: { memoId } }
    );
    res.send();
  } catch (e) {
    console.log(e);
    res.status(503);
  }
};
