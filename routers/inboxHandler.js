const express = require("express");
const { getInbox } = require("./../controllers/inboxControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("./../middlewares/common/checkLogin");

router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
