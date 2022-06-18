"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getConversations = async (req, res) => {
  const { userId } = req.query;

  const conversations = await prisma.GroupMember.findMany({
    where: {
      userId
    }
  });

  if (!conversations) {
    res.status(400).json({
      error: "an error occured when fetching conversations"
    });
  } else {
    res.status(200).json(conversations);
  }
};
