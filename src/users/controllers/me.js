const db = require("../../db");

module.exports.getMe = async (req, res) => {
  // console.log("req.user", req.user);
  const { rows: user } = await db.query(db.queryText.getMe, [req.user.id]);

  //if no user
  if (!user) {
    res.status(400).json("user/not found or email doesnt exist");
  }
  // console.log(user);
  res.status(200).json({
    username: user[0].username,
    userId: user[0].user_id,
    avatar: user[0].avatar
  });
};
