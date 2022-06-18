const { profile } = require("./controllers/profile");
const { signIn } = require("./controllers/signIn");
const { signOut } = require("./controllers/signOut");
const { signUp } = require("./controllers/signup");
const { updateUser } = require("./controllers/updateUser");

const router = require("express").Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/update", updateUser);

router.get("/profile/:id", profile);

router.get("/sign-out", signOut);

module.exports = router;
