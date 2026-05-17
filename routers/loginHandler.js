const express = require("express");
const { getLogin } = require("./../controllers/loginControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");

router = express.Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
