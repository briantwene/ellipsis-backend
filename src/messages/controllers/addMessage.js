"use strict";
const { PrismaClient } = require("@prisma/client");
const db = require("../../db");
const prisma = new PrismaClient();

module.exports.addMessage = async (req, res) => {
  const { sender, message_text, c_id, sent } = req.body;
  console.log("req.bidy", req.body);

  const { rows } = await db.query(db.queryText.addMessage, [
    sender,
    message_text,
    sent,
    c_id
  ]);

  if (!rows) {
    res.status(400).json({
      error: "an error occured when message was being added"
    });
  } else {
    res.status(200).json({ success: "message has been added" });
  }
};
