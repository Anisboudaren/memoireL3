const mongoose = require('mongoose');
const Joi = require('joi-oid');
const { ObjectId } = mongoose.Schema.Types;
const reportSchema = new mongoose.Schema({
	caregiverId: {
		type: ObjectId,
		required: true,
		ref: 'Caregiver',
	},
	fullName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	symptoms: {
		type: String,
		required: true,
	},
	relatedCauses: {
		type: String,
		required: true,
	},
	diagnosis: {
		type: String,
		required: true,
	},
	treatmentPlan: {
		type: String,
		required: true,
	},
});

const validateReportSchema = Joi.object({
	caregiverId: Joi.objectId().required(),
	fullName: Joi.string().required(),
	age: Joi.number().required(),
	symptoms: Joi.string().required(),
	relatedCauses: Joi.string().required(),
	diagnosis: Joi.string().required(),
	treatmentPlan: Joi.string().required(),
});

reportSchema.methods.validateReport = function (report) {
	validateReportSchema.required();
	return validateReportSchema.validate(report);
};
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
