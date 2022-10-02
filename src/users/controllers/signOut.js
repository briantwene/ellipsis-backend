module.exports.signOut = async (req, res) => {
  console.log(req.headers);
  res
    .status(202)
    .clearCookie("access-token")
    .send({ success: "cookie cleared" });
};
