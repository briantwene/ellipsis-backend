"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addMessage = async (req, res) => {
  const { userId, datetime, conversationId, message_text, username } = req.body;
  console.log(username);
  const createdMessage = await prisma.message.create({
    data: {
      from: userId,
      datetime: datetime,
      conversation_id: conversationId,
      username: username,
      message_text: message_text
    }
  });

  if (!createdMessage) {
    res.status(400).json({
      error: "an error occured when message was trying to be deleted"
    });
  } else {
    res.status(200).json({ success: "message has been deleted" });
  }
};
