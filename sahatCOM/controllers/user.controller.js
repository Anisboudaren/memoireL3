const createError = require("http-errors");
const { findByIdAndUpdate } = require("../models/user.model");
const User = require("../models/user.model");
const { genToken } = require("../utils/jwt");

const addNewUser = async (req, res, next) => {
  const newUser = new User(req.body);

  const { error } = newUser.validation(req.body);

  if (error) {
    return res.status(400).json({
      result: false,
      message: error,
    });
  } else {
    try {
      const result = await newUser.save();
      if (result) {
        console.log(result);
        res.status(201).json({
          result: true,
          message: "new user has been added",
          token: genToken(result.toObject()),
        });
      } else {
        res.status(400).json({
          result: false,
          message: "something went wrong while saving the user",
        });
      }
    } catch (e) {
      next(createError(e));
    }
  }

  next();
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id, {}, { lean: true });

    if (user) {
      const willBeUpdated = await findByIdAndUpdate(
        { _id: req.user.id },
        req.body,
        { lean: true, new: true }
      );

      if (willBeUpdated) {
        return res.status(201).json({
          result: true,
          message: "user updated.",
        });
      } else {
        return res.status(400).json({
          result: true,
          message: "Something went wrong while updating user.",
        });
      }
    }
  } catch (e) {
    next(createError(e));
  }
};

const deleteUser = "";

const getUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  req.user = user;
  next;
};

const getAllusers = async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    result: true,
    AllUsers: allUsers,
  });
};
module.exports = {
  addNewUser,
  updateUser,
  deleteUser,
  getUser,
  getAllusers,
};
