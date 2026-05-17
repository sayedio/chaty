const express = require("express");
const { getLogin } = require("./../controllers/loginControllers");

router = express.Router();

router.get("/", getLogin);

module.exports = router;
