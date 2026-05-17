//404 error
const createError = require("http-errors");
function notFoundError(req, res, next) {
  next(createError(404, "Your requested content was not found"));
}
function handleError(err, req, res, next) {
  res.locals.error = process.env.NODE_ENV === "development" ? err : err.message;
  if (!res.locals.html) {
    res.render("error", {
      title: "Error page",
      desc: res.locals.error,
    });
  } else {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      error: res.locals.error,
    });
  }
}

module.exports = {
  notFoundError,
  handleError,
};
