const People = require("./../models/people");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

function getLogin(req, res, next) {
  res.render("index");
}
async function login(req, res) {
  try {
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user?.password) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign(
          {
            username: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.EXPIRE_TIME,
          },
        );

        res.cookie(process.env.COOKIE_KEY, token, {
          maxAge: process.env.EXPIRE_TIME,
          signed: true,
          httpOnly: true,
        });

        res.locals.loggedInUser = {
          name: user.name,
          email: user.email,
          _id: user._id,
          avatar: user.avatar,
          role: user.role,
          mobile: user.mobile,
        };
        res.render("inbox");
      } else {
        throw createError("Incorrect username or password");
      }
    } else {
      throw createError("Incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

module.exports = {
  getLogin,
  login,
};
