const express = require("express");
const { getInbox } = require("./../controllers/inboxControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");

router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
