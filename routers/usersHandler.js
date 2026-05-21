const express = require("express");
const {
  getUser,
  addUser,
  removeUser,
} = require("../controllers/usersControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("./../middlewares/user/avatarUpload");
const { check } = require("express-validator");
const {
  addUserValidators,
  addUserValidatorHandler,
} = require("./../middlewares/user/userValidators");
const { checkLogin } = require("./../middlewares/common/checkLogin");
router = express.Router();

// routes
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUser);
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidatorHandler,
  addUser,
);
router.delete("/:id", removeUser);

module.exports = router;
