"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getMessages = async (req, res) => {
  const { conversationId } = req.query;

  console.log("getMessages just ran");
  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId
    }
  });

  if (messages.length) {
    console.log("messages was sent");
    res.status(200).json(messages);
  } else {
    console.log("no messages");
    res.status(400).json({ error: "there are no messages" });
  }
};
