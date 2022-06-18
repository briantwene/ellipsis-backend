"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getMessages = async (req, res) => {
  const { conversationId } = req.query;

  const messages = await prisma.Message.findMany({
    where: {
      conversationId
    }
  });

  if (!messages) {
    res.status(400).json({ error: "there are no messages" });
  } else {
    res.status(200).json(messages);
  }
};
