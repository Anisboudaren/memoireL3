const mongoose = require('mongoose');
const Joi = require('joi-oid');

const patientSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
	},
	dateOfBirth: {
		type: Date,
		required: false,
	},
	gender: {
		type: String,
		enum: ['male', 'female'],
		required: false,
	},
	address: {
		type: String,
		required: false,
		minlength: 1,
		maxlength: 1024,
	},
	phoneNumber: {
		type: String,
		required: false,
		minlength: 10,
		maxlength: 10,
	},
	medicalHistory: {
		type: String,
		minlength: 1,
		maxlength: 4096,
	},
	insuranceInformation: {
		type: String,
		minlength: 1,
		maxlength: 4096,
	},
});

const schema = Joi.object({
	_id: Joi.objectId().required(),
	firstName: Joi.string().required().min(1).max(255),
	lastName: Joi.string().required().min(1).max(255),
	dateOfBirth: Joi.date(),
	gender: Joi.string().valid('male', 'female'),
	address: Joi.string().min(1).max(1024),
	phoneNumber: Joi.string().length(10),
	medicalHistory: Joi.string().min(1).max(4096),
	insuranceInformation: Joi.string().min(1).max(4096),
});

patientSchema.methods.validatePatient = function (patient) {
	return schema.validate(patient, { abortEarly: false });
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
