"use strict";
const { PrismaClient } = require("@prisma/client");
const db = require("../../db");
const prisma = new PrismaClient();

module.exports.getConversations = async (req, res) => {
  // const { userId } = req.query;

  const conversations = await db
    .query(db.queryText.getConversations, [req.user.id])
    .then((response) => {
      return response.rows;
    })
    .catch((e) => console.log("there was an error:", e));

  if (!conversations) {
    console.log("is failed");
    res.status(400).json({
      error: "an error occured when fetching conversations"
    });
  } else {
    res.status(200).json(conversations);
  }
};

module.exports.getOne = async (req, res) => {
  const { conversationId } = req.query;

  const conversation = await db
    .query(db.queryText.getConversation, [req.user.id, conversationId])
    .then((response) => {
      return response.rows[0];
    })
    .catch((e) => console.log("there was an error:", e));

  if (!conversation) {
    console.log("is failed");
    res.status(404).json({
      error: "Conversation not found"
    });
  } else {
    res.status(200).json(conversation);
  }
};
