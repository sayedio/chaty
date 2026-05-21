const jwt = require("jsonwebtoken");

async function checkLogin(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_KEY];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }

      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "Authentication failure!",
          },
        },
      });
    }
  }
}

function redirectLogin(req, res, next) {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies) {
    return next();
  } else {
    res.redirect("/inbox");
  }
}

module.exports = {
  checkLogin,
  redirectLogin,
};
