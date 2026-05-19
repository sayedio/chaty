const express = require("express");
const { getUser } = require("../controllers/usersControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("./../middlewares/user/avatarUpload");
const { check } = require("express-validator");
const {
  addUserValidators,
  addUserValidatorHandler,
} = require("./../middlewares/user/userValidators");
router = express.Router();

// routes
router.get("/", decorateHtmlResponse("Users"), getUser);
router.post("/", avatarUpload, addUserValidators, addUserValidatorHandler);

module.exports = router;
