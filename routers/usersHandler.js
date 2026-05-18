const express = require("express");
const { getUser } = require("../controllers/usersControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("./../middlewares/user/avatarUpload");
const { check } = require("express-validator");
router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUser);
router.post("/", avatarUpload, [check("name"), check("email")]);

module.exports = router;
