const createError = require("http-errors");
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
    const user = await User.findById({_id : req.body.id}, {}, { lean: true });

    if (user) {
      const willBeUpdated = await User.findByIdAndUpdate(
        { _id: req.body.id },
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
    } else {
        return  res.status(404).json({
        result : false, 
        message : "no records has been found"
      })
    }
  } catch (e) {
    next(createError(e));
  }
};

const deleteUser = async (req , res , next)=>{
  try {
    const user = await User.findOneAndDelete({_id: req.body.id})
    if(user){
      return  res.status(202).json({
        result : true , 
        message : "user successfully deleted"
      })
    }
    else {
      return  res.status(400).json({
        result : false , 
        message : "something went wrong with the delete"
      })
    }
  } catch (e) {
    next(createError(e))
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);
    if(user){
      req.user = user
      return  res.status(200).json({
        result : true , 
        user : user ,
        message : "successful"
      })
  } else {
    return  res.status(404).json({
        result : false , 
        message : "no record has been found !"
      })
  }

  }
  catch (e) {
    next(createError(e))
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({}, {}, { lean: true });
    return res.status(200).json({
      result: true,
      AllUsers: allUsers,
    });
  } catch (e) {
    next(createError(e))
  }
  
};
module.exports = {
  addNewUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
