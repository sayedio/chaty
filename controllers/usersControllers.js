function getUser(req, res, next) {
  res.render("users", {
    title: "Users page",
  });
}

module.exports = {
  getUser,
};
