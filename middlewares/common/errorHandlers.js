//404 error
const createError = require("http-errors");
function notFoundError(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}
function handleError(err, req, res, next) {
  res.render("error", { title: "Error page" });
}
