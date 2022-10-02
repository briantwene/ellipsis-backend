const { PrismaClient } = require("@prisma/client");
const { createTokens } = require("../../middleware/jwt");
const db = require("../../db");

const prisma = new PrismaClient();

module.exports.signIn = async (req, res) => {
  const { email, password, type } = req.body;

  console.log(req.body);

  const { rows: user } = await db.query(db.queryText.signIn, [email]);

  // const user = await prisma.User.findUnique({
  //   where: {
  //     email: email
  //   }
  // });

  console.log("user", user);

  if (!user) {
    res.status(400).json("user/not found or email doesnt exist");
  } else if (user[0]?.password === password) {
    const token = createTokens(user[0]);

    // res.send({ message: "noice logged in :)", data: user[0] });

    res.status(200).json({
      user: {
        username: user[0].username,
        userId: user[0].user_id,
        avatar:
          user[0].avatar ||
          "https://i.pinimg.com/736x/64/f5/01/64f501db467c44445285591ab8ca8512.jpg",
        email: user[0].email
      },
      token: token
    });
  } else {
    console.log("that one was run ");
    res.status(400).json({ errors: "user/not found or email doesnt exist" });
  }
};
