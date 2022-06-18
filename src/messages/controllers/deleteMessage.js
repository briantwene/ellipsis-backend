"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.deleteMessage = async (req, res) => {
  const { messageId } = req.query;

  const deletedMessage = await prisma.Message.delete({
    where: {
      id: messageId
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
