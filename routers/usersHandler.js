const express = require("express");
const { getUser } = require("../controllers/usersControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUser);

module.exports = router;
