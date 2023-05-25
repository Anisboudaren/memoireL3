const createError = require('http-errors');
const Absence = require('../models/absence.model');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');

const addNewAbsence = async (req, res) => {
	const absence = _.pick(req.body, ['caregiverId', 'numberOfAbsences', 'reason']);

	if (!absence.caregiverId || !absence.numberOfAbsences || !absence.reason) {
		return res.json({
			result: false,
			message: 'please put in all needed information to create a absence',
		});
	}

	const newAbsence = new Absence(absence);

	const { error } = newAbsence.validateAbsence(absence);

	if (error) {
		return res.json({
			result: false,
			message: error,
		});
	} else {
		try {
			const result = await newAbsence.save();
			if (result) {
				return res.status(201).json({
					result: true,
					message: 'new absence has been added',
				});
			} else {
				return res.json({
					result: false,
					message: 'something went wrong while saving the absence',
				});
			}
		} catch (e) {
			console.log(createError(e));
			res.status(400).json({
				message: 'an error accrued while saving the absence',
			});
		}
	}
};

const updateAbsence = async (req, res, next) => {
	try {
		const absence = await Absence.findById({ _id: req.params.id }, {}, { lean: true });

		if (absence) {
			const willBeUpdated = await Absence.findByIdAndUpdate({ _id: req.params.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'absence updated.',
				});
			} else {
				return res.status(400).json({
					result: false,
					message: 'Something went wrong while updating absence.',
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

const deleteAbsence = async (req, res, next) => {
	try {
		const absence = await Absence.findOneAndDelete({ _id: req.params.id });
		console.log(req.params.id);
		if (absence) {
			return res.status(202).json({
				result: true,
				message: 'absence successfully deleted',
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

const getAbsence = async (req, res, next) => {
	try {
		const absence = await Absence.findById(req.params.id);
		if (absence) {
			req.absence = absence;
			return res.status(200).json({
				result: true,
				absence: absence,
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

const getAllAbsences = async (req, res, next) => {
	try {
		const allAbsences = await Absence.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			absence: req.absence,
			AllAbsences: allAbsences,
		});
	} catch (e) {
		next(createError(e));
	}
};

module.exports = {
	addNewAbsence,
	updateAbsence,
	deleteAbsence,
	getAbsence,
	getAllAbsences,
};
