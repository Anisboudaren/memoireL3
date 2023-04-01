const Joi = require('joi-oid');
const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 20
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],
  visits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visit',
    },
  ],
  role: {
    type: String,
    enum: ["doctor", "nurse"],
    default: "caregiver",
  },
}, { timestamps: true });

const caregiverValidationSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  phone: Joi.string().trim().min(10).max(20).required(),
  address: Joi.string().trim().min(10).max(200).required(),
  patients: Joi.array().items(Joi.objectId()),
  visits: Joi.array().items(Joi.objectId()),
  role: Joi.string().valid("doctor", "nurse")
});

caregiverSchema.statics.validateCaregiver = function(caregiver) {
  return caregiverValidationSchema.validate(caregiver, { abortEarly: false });
};

const Caregiver = mongoose.model('Caregiver', caregiverSchema);

module.exports = Caregiver;
