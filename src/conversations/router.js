const { validateToken } = require("../middleware/jwt");
const { addMembers } = require("./controllers/addMembers");
const { getConversations } = require("./controllers/getConversations");

const router = require("express").Router();

router.get("/getAll", validateToken, getConversations);

router.post("/join", addMembers);

router.post("/leave", (req, res) => {
  res.send("auth works");
});

module.exports = router;
