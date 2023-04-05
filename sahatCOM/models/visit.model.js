const mongoose = require('mongoose');
const Joi = require('joi-oid');
const { ObjectId } = mongoose.Schema.Types;

const visitSchema = new mongoose.Schema({
  patientId: {
    type: ObjectId,
    required: true
  },
  caregiverId: {
    type: ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

  const validateVisitSchema = Joi.object({
    _id: Joi.objectId().required(),
    patientId : Joi.objectId().required(),
    caregiverId : Joi.objectId().required(),
    date : Joi.date().required() , 
    duration : Joi.number(),
    notes : Joi.string()
  });
 
  visitSchema.methods.validateVisit = function(visit) {
    validateVisitSchema.required();
    return validateVisitSchema.validate(visit);
  };

const Visit = mongoose.model('Visit', visitSchema);
module.exports =  Visit
  

