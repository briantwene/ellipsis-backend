const uuid = require("uuid");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
module.exports.signUp = async (req, res) => {
  const { firstname, lastname, email, password, username } = req.query;
  console.log(req.query);
  const newUser = await prisma.User.create({
    data: {
      userId: uuid.v4(),
      firstName: firstname,
      lastName: lastname,
      email: email,
      password,
      userName: username
    }
  });

  if (!newUser) {
    res.status(400).json({
      error: "an error occured when creating new user"
    });
  } else {
    res.status(200).json({ success: "user has been created" });
  }
};
