const express = require("express");
const { getLogin, login } = require("./../controllers/loginControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const {
  loginValidators,
  handleLoginValidators,
} = require("./../middlewares/login/loginValidators");

router = express.Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post(
  "/",
  decorateHtmlResponse("Login"),
  loginValidators,
  handleLoginValidators,
  login,
);

module.exports = router;
