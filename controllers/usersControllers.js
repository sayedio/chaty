const bcrypt = require("bcrypt");
const People = require("./../models/people");
const createError = require("http-errors");
function getUser(req, res, next) {
  res.render("users");
}
async function addUser(req, res) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = {
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    };
  } else {
    newUser = {
      ...req.body,
      password: hashedPassword,
    };
  }

  try {
    const People = new People(newUser);

    await People.save();

    res.status(201).json({
      message: "User added successfully!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}
module.exports = {
  getUser,
  addUser,
};
