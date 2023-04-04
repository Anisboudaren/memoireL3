const createError = require('http-errors');
const Patient = require('../models/patient.model');
const userController = require('../controllers/user.controller');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');
const User = require('../models/user.model');

const getProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.user.owner);
    console.log(req.user.owner);
    if (patient) {
      req.patient = patient;
      return res.status(200).json({
        result: true,
        patient: patient,
        message: 'successful',
      });
    } else {
      return res.status(404).json({
        result: false,
        message: 'no record has been found !',
      });
    }
  } catch (e) {
    next(createError(e));
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findById(
      { _id: req.user.owner },
      {},
      { lean: true },
    );

    if (patient) {
      const willBeUpdated = await Patient.findByIdAndUpdate(
        { _id: req.body.id },
        req.body,
        { lean: true, new: true },
      );

      if (willBeUpdated) {
        return res.status(201).json({
          result: true,
          message: 'patient updated.',
        });
      } else {
        return res.status(400).json({
          result: true,
          message: 'Something went wrong while updating patient.',
        });
      }
    } else {
      return res.status(404).json({
        result: false,
        message: 'no records has been found',
      });
    }
  } catch (e) {
    next(createError(e));
  }
};
const addNewPatient = async (req, res, next) => {
  const patient = _.pick(req.body, [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'address',
    'phoneNumber',
    'medicalHistory',
    'insuranceInformation',
  ]);

  const newPatient = new Patient(patient);

  const { error } = newPatient.validatePatient(patient);

  if (error) {
    return res.status(400).json({
      result: false,
      message: error,
    });
  } else {
    try {
      const result = await newPatient.save();
      console.log(result);
      if (result) {
        req.body.owner = result._id;
       
            await userController.addNewUser(req, res, next)
            .catch(async (err)=>{
                console.error("this is a god damn error : " , err);
                
                    const createdCG = await Patient.findByIdAndRemove(result._id);
                    return res.status(400).json({
                      result: false,
                      message: 'something went wrong while creating the user',
                      deletedPatient : createdCG
                    });
                  
            })
            console.log(req.user);
        
        
        // create the user after adding the patient profile info to the data base

        return res.status(201).json({
          result: true,
          message: 'new patient has been added',
          user: req.user,
        });
      } else {
        res.status(400).json({
          result: false,
          message: 'something went wrong while saving the patient',
          user: req.user,
        });
      }
    } catch (e) {
      next(createError(e));
    }
  }

  next();
};
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(
      { _id: req.body.id },
      {},
      { lean: true },
    );

    if (patient) {
      const willBeUpdated = await Patient.findByIdAndUpdate(
        { _id: req.body.id },
        req.body,
        { lean: true, new: true },
      );

      if (willBeUpdated) {
        return res.status(201).json({
          result: true,
          message: 'patient updated.',
        });
      } else {
        return res.status(400).json({
          result: true,
          message: 'Something went wrong while updating patient.',
        });
      }
    } else {
      return res.status(404).json({
        result: false,
        message: 'no records has been found',
      });
    }
  } catch (e) {
    next(createError(e));
  }
};
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOneAndDelete({ _id: req.params.id });
    if (patient) {
      return res.status(202).json({
        result: true,
        message: 'patient successfully deleted',
      });
    } else {
      return res.status(400).json({
        result: false,
        message: 'something went wrong with the delete',
      });
    }
  } catch (e) {
    next(createError(e));
  }
};
const getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      req.patient = patient;
      return res.status(200).json({
        result: true,
        patient: patient,
        message: 'successful',
      });
    } else {
      return res.status(404).json({
        result: false,
        message: 'no record has been found !',
      });
    }
  } catch (e) {
    next(createError(e));
  }
};
const getAll = async (req, res, next) => {
  try {
    const allPatients = await Patient.find({}, {}, { lean: true });
    return res.status(200).json({
      result: true,
      AllPatients: allPatients,
    });
  } catch (e) {
    next(createError(e));
  }
};
module.exports = {
  addNewPatient,
  updatePatient,
  deletePatient,
  getPatient,
  getAll,
  getProfile,
  updateProfile
};
