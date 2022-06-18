"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createConversation = async (req, res) => {
  const { name } = req.query;

  const newConversation = await prisma.Conversation.create({
    data: {
      name
    }
  });

  if (!newConversation) {
    res.status(400).json({
      error: "an error occurred when creating a new conversation"
    });
  } else {
    res.status(200).json({ success: "conversation has been created" });
  }
};
