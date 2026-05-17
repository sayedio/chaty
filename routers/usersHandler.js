const express = require("express");
const { getUser } = require("../controllers/usersControllers");

router = express.Router();

router.get("/", getUser);

module.exports = router;
