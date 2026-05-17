const express = require("express");
const { getInbox } = require("./../controllers/inboxControllers");

router = express.Router();

router.get("/", getInbox);

module.exports = router;
