const uuid = require("uuid");
const { PrismaClient } = require("@prisma/client");
const db = require("../../db");

const prisma = new PrismaClient();
module.exports.signUp = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);

  const avatar = `https://avatars.dicebear.com/api/bottts/${username}.svg`;

  const newUser = await db.query(
    db.queryText.signUp[(email, username, password, avatar)]
  );
  // const newUser = await prisma.User.create({
  //   data: {
  //     userId: uuid.v4(),
  //     firstName: firstname,
  //     lastName: lastname,
  //     email: email,
  //     password,
  //     userName: username
  //   }
  // });

  if (!newUser) {
    res.status(400).json({
      error: "an error occured when creating new user"
    });
  } else {
    res.status(200).json({ success: "user has been created" });
  }
};
