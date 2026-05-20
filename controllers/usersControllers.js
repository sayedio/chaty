const bcrypt = require("bcrypt");
const People = require("./../models/people");
const createError = require("http-errors");

async function getUser(req, res, next) {
  const users = await People.find();
  res.render("users", {
    users,
  });
}

async function addUser(req, res, next) {
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
    const people = new People(newUser);
    await people.save();

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
