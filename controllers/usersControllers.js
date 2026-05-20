const bcrypt = require("bcrypt");
const People = require("./../models/people");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");

async function getUser(req, res, next) {
  const users = await People.find();
  // console.log(users);
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

async function removeUser(req, res) {
  const { id } = req.params;
  try {
    const result = await People.findByIdAndDelete(id);
    // User not found
    if (!result) {
      return res.status(404).json({
        errors: {
          common: {
            msg: "User not found",
          },
        },
      });
    }
    if (result.avatar) {
      fs.unlink(
        path.join(__dirname, `../public/uploads/avatars/${result.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    }
    res.status(200).json({
      message: "Successfully removed",
      // id: result._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        common: {
          msg: "Internal server error",
        },
      },
    });
  }
}
module.exports = {
  getUser,
  addUser,
  removeUser,
};
