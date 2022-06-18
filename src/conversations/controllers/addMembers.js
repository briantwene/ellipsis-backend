"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addMembers = async (req, res) => {
  const { userId, conversation, conversationId, joined_datetime } = req.query;

  const newMember = await prisma.GroupMember.create({
    data: {
      userId,
      conversation,
      conversationId,
      joined_datetime
    }
  });

  if (!newMember) {
    res.status(400).json({
      error: "an error occured when adding member"
    });
  } else {
    res.status(200).json({ success: "member has been added to group" });
  }
};
