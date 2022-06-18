const { getMessages } = require("./controllers/getMessages");
const { addMessage } = require("./controllers/addMessage");

const router = require("express").Router();

router.get("/fetch", getMessages);

router.post("/addMessage", addMessage);

module.exports = router;
