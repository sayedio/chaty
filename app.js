const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");

const {
  handleError,
  notFoundError,
} = require("./middlewares/common/errorHandlers");

mongoose
  .connect("process.env.MONGO_URI")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
//set cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static(path.join(__dirname, "public")));

// 404 not found
app.use(notFoundError);

// Default Error Handler
app.use(handleError);
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
