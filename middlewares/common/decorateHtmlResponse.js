function decorateHtmlResponse(page_name) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${page_name} - ${process.env.APP_NAME}`;
    res.locals.loggedInUser = {};
    res.locals.data = {};
    res.locals.errors = {};
    next();
  };
}
module.exports = decorateHtmlResponse;
