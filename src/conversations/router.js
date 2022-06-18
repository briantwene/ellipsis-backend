const { addMembers } = require("./controllers/addMembers");
const { getConversations } = require("./controllers/getConversations");

const router = require("express").Router();

router.get("/getAll", getConversations);

router.post("/join", addMembers);

router.post("/leave", (req, res) => {
  res.send("auth works");
});

module.exports = router;
