const createError = require("http-errors");
const Caregiver = require("../models/caregiver.model");
const userController = require('../controllers/user.controller')
const _ = require('lodash');
const { genToken } = require("../utils/jwt");
const User = require("../models/user.model");

const addNewCaregiver = async (req, res, next) => {

   const caregiver = _.pick(req.body  , [ "firstName"  ,"lastName" ,"phone", "patients"  ,"address",  "visits"  ,  "role"  ,  "Specialties"])


  const newCaregiver = new Caregiver(caregiver);

  const { error } = newCaregiver.validation(caregiver);

  if (error) {
    return res.status(400).json({
      result: false,
      message: error,
      
    });
  } else {
    try {

      const result = await newCaregiver.save();
      console.log(result);
      if (result) {

        req.body.owner = result._id

        await userController.addNewUser(req , res , next) 
       console.log(req.user);
        // create the user after adding the caregiver profile info to the data base
        if(!req.user) 
        {
         const createdCG = await Caregiver.findByIdAndRemove(result._id)
       return res.status(400).json({
        result : false , 
        message : "something went wrong while creating the user" , 
       })
    }

        return res.status(201).json({
          result: true,
          message: "new caregiver has been added",
          user : req.user , 
        });
      } else {
        res.status(400).json({
          result: false,
          message: "something went wrong while saving the caregiver",
          user : req.user , 
        });
      }
    } catch (e) {
      next(createError(e));
    }
  }

  next();
};

const updateCaregiver = async (req, res, next) => {
  try {
    const caregiver = await Caregiver.findById({_id : req.body.id}, {}, { lean: true });

    if (caregiver) {
      const willBeUpdated = await Caregiver.findByIdAndUpdate(
        { _id: req.body.id },
        req.body,
        { lean: true, new: true }
      );

      if (willBeUpdated) {
        return res.status(201).json({
          result: true,
          message: "caregiver updated.",
        });
      } else {
        return res.status(400).json({
          result: true,
          message: "Something went wrong while updating caregiver.",
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

const deleteCaregiver = async (req , res , next)=>{
  try {
    const caregiver = await Caregiver.findOneAndDelete({_id: req.body.id})
    if(caregiver){
      return  res.status(202).json({
        result : true , 
        message : "caregiver successfully deleted"
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

const getCaregiver = async (req, res, next) => {
  try {
    const caregiver = await Caregiver.findById(req.body.id);
    if(caregiver){
      req.caregiver = caregiver
      return  res.status(200).json({
        result : true , 
        caregiver : caregiver ,
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

const getAllCaregivers = async (req, res, next) => {
  try {
    const allCaregivers = await Caregiver.find({}, {}, { lean: true });
    return res.status(200).json({
      result: true,
      AllCaregivers: allCaregivers,
    });
  } catch (e) {
    next(createError(e))
  }
  
};
module.exports = {
  addNewCaregiver,
  updateCaregiver,
  deleteCaregiver,
  getCaregiver,
  getAllCaregivers,
};
