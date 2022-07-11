"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getConversations = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  const conversations = await prisma.Conversation.findMany({
    where: {
      userId
    },
    include: {
      GroupMember: true
    }
  });

  console.log(conversations);
  if (!conversations) {
    console.log("is failed");
    res.status(400).json({
      error: "an error occured when fetching conversations"
    });
  } else {
    res.status(200).json(conversations);
  }
};
