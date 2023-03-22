const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  medicalConditions: {
    type: [String],
    required: true
  },
  medications: {
    type: [String],
    required: true
  },
  caregivers: {
    type: [String]
  },
  appointments: {
    type: [{
      date: Date,
      location: String,
      doctor: String
    }]
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('patient', patientSchema);

