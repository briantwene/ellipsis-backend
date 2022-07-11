const { sign, verify } = require("jsonwebtoken");

//function to create a JWT
const createTokens = (user) => {
  //need to create one that expires
  const accessToken = sign(
    { username: user.userName, id: user.userId },
    "secret-need to change for later"
  );

  return accessToken;
};

//token validation middleware function
validateToken = (req, res, next) => {
  //get the token from the cookie store
  let token;
  const accessToken = req.headers.authorization;

  //if the token isnt there then send an error
  if (accessToken) {
    const bearer = accessToken.split(" ");
    token = bearer[1];
  } else {
    return res.status(400).json({ error: "User not Authenticated" });
  }

  //try....
  try {
    //checking if the cookie is valid

    const validToken = verify(token, "secret-need to change for later");
    //and if it is

    if (validToken) {
      //then set the authenticated header to true
      req.authenticated = true;
      return next();
    }
    //if there are any errors then let the frontend know
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
