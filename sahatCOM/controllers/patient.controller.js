const createError = require('http-errors');
const Patient = require('../models/patient.model');
const userController = require('../controllers/user.controller');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');
const User = require('../models/user.model');
const { default: mongoose } = require('mongoose');

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

const objectId = new mongoose.Types.ObjectId()

  patient._id = objectId 
  
  const newPatient = new Patient(patient);

  const { error } = newPatient.validatePatient(patient);

  if (error) {
     res.status(400).json({
      result: false,
      message: error,
    });
  } else {
    try {
      console.log("we are in try");
      req.body.owner = newPatient._id;
      await userController.addNewUser(req, res)
        if(req.newUser){
                console.log("the user that has been created" , req.newUser);
               const patientResult =  await newPatient.save()
               if(patientResult) {
               
                  console.log("i am in then of save" , patientResult);
                 return res.status(201).json({
                    result: true,
                    message: 'new patient has been added',
                    user: req.newUser,
                    patient : patient
                  });
                
               }else {
               
                  console.log("i am in then of catch");
                   return res.status(400).json({
                      result: false,
                      message: 'something went wrong while saving the patient',
                      err : err 
                    })
                   
               }
                   
                  
         }
    } catch (e) {
      next(createError(e));
    }
  }

  
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
