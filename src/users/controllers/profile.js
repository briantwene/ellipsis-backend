module.exports.profile = (req, res) => {
  const { id } = req.params;

  res.send(`this profile has an id of ${id}`);
};
