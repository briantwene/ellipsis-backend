const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.signIn = async (req, res) => {
  const { email, password } = req.query;

  const user = await prisma.User.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    res.status(400).json("user/not found or email doesnt exist");
  }

  if (user.password === password) {
    res.status(200).json("logged in");
  } else {
    res.status(400).json("user/not found or email doesnt exist");
  }
};
