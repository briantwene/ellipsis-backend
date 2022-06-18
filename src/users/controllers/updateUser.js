const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.updateUser = async (req, res) => {
  const { userId, password } = req.query;
  //find the user
  const user = await prisma.User.findUnique({
    where: {
      userId
    }
  });

  //check if the password is the same
  if (user.password === password) {
    res.status(400).json({ error: "the passwords are the same" });
  } else {
    const user = await prisma.User.update({
      where: {
        userId
      },
      data: {
        password
      }
    });

    res.status(200).json({ success: "user profile updated" });
  }
  //if it is the same then send an error else save the password
};
