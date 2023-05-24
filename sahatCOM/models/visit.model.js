const mongoose = require('mongoose');
const Joi = require('joi-oid');
const { ObjectId } = mongoose.Schema.Types;

const visitSchema = new mongoose.Schema({
	patientId: {
		type: ObjectId,
		required: true,
		ref: 'Patient',
	},
	caregiverId: {
		type: ObjectId,
		required: true,
		ref: 'Caregiver',
	},
	date: {
		type: Date,
		required: true,
	},
	location: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		enum: ['accepted', 'rejected', 'pending'],
	},
	notes: {
		type: String,
		required: false,
	},
});

const validateVisitSchema = Joi.object({
	_id: Joi.objectId().required(),
	patientId: Joi.objectId().required(),
	caregiverId: Joi.objectId().required(),
	date: Joi.date().required(),
	location: Joi.string(),
	notes: Joi.string(),
});

visitSchema.methods.validateVisit = function (visit) {
	validateVisitSchema.required();
	return validateVisitSchema.validate(visit);
};

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
