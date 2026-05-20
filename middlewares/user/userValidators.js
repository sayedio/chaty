const { check, validationResult } = require("express-validator");
const People = require("./../../models/people");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

//add user

const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlphanumeric("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already in use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("mobile")
    .isMobilePhone("any", {
      strictMode: true,
    })
    .withMessage("Need number with country code")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        // console.log(user);
        if (user) {
          throw createError("Mobile number already in use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password length must be 8 & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol",
    ),
];

const addUserValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  /**
   * mappedErrors = {
   *  name:{
   *    msg:"Name is required"
   *  }
   *  email:{
   *    msg:"Invalid email address!"
   *  }
   * };
   *
   */

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //remove upload files
    if (req.files.length > 0) {
      const { filename } = req.files[0];

      fs.unlink(
        path.join(
          __dirname,
          "..",
          "..",
          "public",
          "uploads",
          "avatars",
          filename,
        ),
        (err) => {
          if (err) console.log(err);
        },
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidatorHandler,
};
