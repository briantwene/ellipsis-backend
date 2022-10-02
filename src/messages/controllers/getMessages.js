"use strict";
const { PrismaClient } = require("@prisma/client");
const db = require("../../db");
const prisma = new PrismaClient();

module.exports.getMessages = async (req, res) => {
  const { conversationId } = req.query;

  const { rows: messages } = await db
    .query(db.queryText.getMessages, [conversationId])
    .catch((e) =>
      console.log("there was an error with getting the messages: ", e)
    );

  if (messages.length) {
    // console.log("messages was sent");
    res.status(200).json(messages);
  } else {
    console.log("no messages");
    res.status(404).json([]);
  }
};
