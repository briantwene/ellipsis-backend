"use strict";
const { PrismaClient } = require("@prisma/client");
const db = require("../../db");

const generic =
  "https://mpng.subpng.com/20180426/ovq/kisspng-multi-user-encapsulated-postscript-users-group-co-5ae16d22590853.6022972915247229783647.jpg";
// if the type is group

const addGroupAvatar = (type) => {
  if (type === "G") {
    return generic;
  }
};

module.exports.createConversation = async (req, res) => {
  const { name, type } = req.body;

  // then get the avatar from the body and if that is null
  //then use the generic one

  const newConversation = await db
    .query(db.queryText.createConversation, [name, type, addGroupAvatar(type)])
    .catch((e) => console.log("there was an error in creating new chat:", e));

  if (!newConversation) {
    res.status(400).json({
      error: "an error occurred when creating a new conversation"
    });
  } else {
    res.status(200).json({ success: "conversation has been created" });
  }
};
