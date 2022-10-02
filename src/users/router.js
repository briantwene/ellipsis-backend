const { validateToken } = require("../middleware/jwt");
const { getMe } = require("./controllers/me");
const { getMembers } = require("./controllers/members");
const { profile } = require("./controllers/profile");
const { signIn } = require("./controllers/signIn");
const { signOut } = require("./controllers/signOut");
const { signUp } = require("./controllers/signup");
const { updateUser } = require("./controllers/updateUser");

const router = require("express").Router();

router.post("/login", signIn);

router.post("/sign-up", signUp);

router.post("/update", updateUser);

router.get("/profile/:id", profile);

router.post("/logout", signOut);

router.get("/me", validateToken, getMe);

router.get("/members", validateToken, getMembers);

router.get("/isAuth", validateToken, (req, res) => {
  res.status(200).json(res.locals.user);
});
module.exports = router;
