const mongoose = require('mongoose');
const Joi = require('joi');
const JoiObjectId = require('joi-oid');

// Define the Absence schema
const absenceSchema = new mongoose.Schema(
	{
		caregiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Caregiver',
		},
		numberOfAbsences: {
			default: 0,
			type: Number,
			required: true,
		},
		reason: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const validateAbsenceSchema = Joi.object({
	caregiverId: JoiObjectId.objectId().required(),
	numberOfAbsences: Joi.number().required(),
	reason: Joi.string().required(),
});

absenceSchema.methods.validateAbsence = function (absence) {
	validateAbsenceSchema.required();
	return validateAbsenceSchema.validate(absence);
};

// Create the Absence model
const Absence = mongoose.model('Absence', absenceSchema);
module.exports = Absence;
