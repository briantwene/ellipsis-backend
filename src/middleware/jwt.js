const { sign, verify } = require("jsonwebtoken");

//function to create a JWT
const createTokens = (user) => {
  //need to create one that expires
  const accessToken = sign(
    { username: user.username, id: user.user_id },
    "secret-need to change for later"
  );

  return accessToken;
};

const getTokenFromHeader = (accessToken, type) => {
  if (type === "WEB") {
    return accessToken;
  } else {
    const bearer = accessToken.split(" ");
    return bearer[1];
  }
};

//token validation middleware function
validateToken = (req, res, next) => {
  //get the token from the cookie store
  const { device_type } = req.headers;

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  //try....

  const validToken = verify(
    token,
    "secret-need to change for later",
    (err, user) => {
      if (err) return res.sendStatus(403);
      // console.log("auth work");
      req.user = user;
      next();
    }
  );
};

module.exports = { createTokens, validateToken };
