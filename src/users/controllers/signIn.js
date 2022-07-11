const { PrismaClient } = require("@prisma/client");
const { createTokens } = require("../../middleware/jwt");

const prisma = new PrismaClient();

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  const user = await prisma.User.findUnique({
    where: {
      email: email
    }
  });

  console.log(user);
  if (!user) {
    res.status(400).json("user/not found or email doesnt exist");
  }

  if (user.password === password) {
    const token = createTokens(user);

    res.status(200).json({
      username: user.userName,
      userId: user.userId,
      token: token
    });
  } else {
    res.status(400).json("user/not found or email doesnt exist");
  }
};
