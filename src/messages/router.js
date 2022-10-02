const { getMessages } = require("./controllers/getMessages");
const { addMessage } = require("./controllers/addMessage");
const { deleteMessage } = require("./controllers/deleteMessage");

const router = require("express").Router();

router.get("/fetch", getMessages);

router.post("/addMessage", addMessage);

router.delete("/deleteMessage", deleteMessage);
module.exports = router;
