const express = require("express");
const {
  getLogin,
  login,
  logout,
} = require("./../controllers/loginControllers");
const decorateHtmlResponse = require("./../middlewares/common/decorateHtmlResponse");
const {
  loginValidators,
  handleLoginValidators,
} = require("./../middlewares/login/loginValidators");
const { redirectLogin } = require("./../middlewares/common/checkLogin");

router = express.Router();

router.get("/", decorateHtmlResponse("Login"), redirectLogin, getLogin);
router.post(
  "/",
  decorateHtmlResponse("Login"),
  loginValidators,
  handleLoginValidators,
  login,
);
router.delete("/", logout);

module.exports = router;
