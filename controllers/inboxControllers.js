function getInbox(req, res, next) {
  res.render("inbox", {
    title: "inbox page",
  });
}

module.exports = {
  getInbox,
};
