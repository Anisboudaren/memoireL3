const Joi = require('joi-oid');
const mongoose = require('mongoose');

const MedicalSpecialties = [
  "General Practitioners or Family Medicine Physicians", // Provide primary care services and can treat a wide range of medical conditions.
  "Registered Nurses", // Provide comprehensive nursing care and can assist with medication management, wound care, and patient education.
  "Physical Therapists", // Help patients regain strength, mobility, and range of motion after an injury or surgery.
  "Occupational Therapists", // Assist patients in regaining the skills they need to perform daily activities and return to work.
  "Speech-Language Pathologists", // Assist patients in regaining their communication skills and addressing swallowing difficulties.
  "Respiratory Therapists", // Help patients with lung conditions improve their breathing and manage their symptoms.
  "Dietitians or Nutritionists", // Provide nutritional counseling and education to help patients manage chronic conditions or recover from an illness.
  "Geriatricians", // Specialize in caring for elderly patients and can help manage chronic health conditions that are common in older adults.
  "Palliative Care Physicians", // Focus on providing comfort and relief from symptoms to patients with serious illnesses.
  "Rehabilitation Medicine Physicians", // Specialize in helping patients recover from injuries or illnesses that affect their mobility and function.
  "Psychiatrists", // Diagnose and treat mental health conditions, including depression, anxiety, and dementia.
  "Infectious Disease Specialists" // Diagnose and treat infectious diseases, which can be a concern for patients who are receiving care in their homes.
];


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
    default: "doctor",
  },
  Specialties: {
    type: String,
    enum: MedicalSpecialties,
  },
}, { timestamps: true });

const caregiverValidationSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  phone: Joi.string().trim().min(10).max(20).required(),
  address: Joi.string().trim().min(10).max(200).required(),
  patients: Joi.array().items(Joi.objectId()),
  visits: Joi.array().items(Joi.objectId()),
  role: Joi.string().valid("doctor", "nurse"),
  Specialties : Joi.string()
});

caregiverSchema.methods.validateCaregiver = function(caregiver) {
  return caregiverValidationSchema.validate(caregiver, { abortEarly: false });
};

const Caregiver = mongoose.model('Caregiver', caregiverSchema);

module.exports = Caregiver;



