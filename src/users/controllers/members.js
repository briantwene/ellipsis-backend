const db = require("../../db");

module.exports.getMembers = async (req, res) => {
  const { conversationId } = req.query;

  const { rows: members } = await db.query(db.queryText.getMembers, [
    conversationId
  ]);
  //   console.log("members", members);
  if (!members) {
    res.status(400).json({ message: "no members found" });
  } else {
    res.status(200).json(members);
  }
};
