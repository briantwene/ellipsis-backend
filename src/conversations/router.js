const { validateToken } = require("../middleware/jwt");
const { addMembers } = require("./controllers/addMembers");
const { createConversation } = require("./controllers/createConversation");
const { getConversations, getOne } = require("./controllers/getConversations");

const router = require("express").Router();

router.post("/create", createConversation);

router.get("/fetch", validateToken, getConversations);

router.post("/join", addMembers);

router.get("/fetchOne", validateToken, getOne);

router.post("/leave", (req, res) => {
  res.send("auth works");
});

module.exports = router;
