const createError = require("http-errors");
const User = require("../models/user.model");
const {genToken} = require("../utils/jwt")

const addNewUser = async (req, res, next) => {
  console.log(req.body);
  req.body.token = genToken(req.body)
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
        res.status(201).json({
          result: true,
          message: "new user has been added",
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

module.exports = {
  addNewUser,
};
