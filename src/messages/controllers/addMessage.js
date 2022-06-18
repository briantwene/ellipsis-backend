"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.addMessage = async (req, res) => {
  const { userId, time, conversationId, message } = req.query;

  const deletedMessage = await prisma.Message.create({
    data: {
      from: userId,
      sent_datetime: time,
      conversationId,
      message_text: message
    }
  });

  if (!deletedMessage) {
    res.status(400).json({
      error: "an error occured when message was trying to be deleted"
    });
  } else {
    res.status(200).json({ success: "message has been deleted" });
  }
};
