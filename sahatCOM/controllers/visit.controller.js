const createError = require('http-errors');
const Visit = require('../models/visit.model');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');

const addNewVisit = async (req, res) => {
	const visit = _.pick(req.body, ['patientId', 'caregiverId', 'date', 'location', 'state', 'notes']);

	if (!visit.patientId || !visit.caregiverId || !visit.date) {
		return res.json({
			result: false,
			message: 'please put in all needed information to create a visit',
		});
	}

	const newVisit = new Visit(visit);

	const { error } = newVisit.validateVisit(visit);

	if (error) {
		return res.json({
			result: false,
			message: error,
		});
	} else {
		try {
			const result = await newVisit.save();
			if (result) {
				return (req.newVisit = {
					result: true,
					message: 'new visit has been added',
				});
			} else {
				return res.json({
					result: false,
					message: 'something went wrong while saving the visit',
				});
			}
		} catch (e) {
			console.log(createError(e));
			res.status(400).json({
				message: 'an error accrued while saving the visit',
			});
		}
	}
};

const updateVisit = async (req, res, next) => {
	try {
		const visit = await Visit.findById({ _id: req.params.id }, {}, { lean: true });

		if (visit) {
			const willBeUpdated = await Visit.findByIdAndUpdate({ _id: req.params.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'visit updated.',
				});
			} else {
				return res.status(400).json({
					result: false,
					message: 'Something went wrong while updating visit.',
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

const deleteVisit = async (req, res, next) => {
	try {
		const visit = await Visit.findOneAndDelete({ _id: req.params.id });
		console.log(req.params.id);
		if (visit) {
			return res.status(202).json({
				result: true,
				message: 'visit successfully deleted',
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

const getVisit = async (req, res, next) => {
	try {
		const visit = await Visit.findById(req.params.id);
		if (visit) {
			req.visit = visit;
			return res.status(200).json({
				result: true,
				visit: visit,
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

const getAllVisits = async (req, res, next) => {
	try {
		const allVisits = await Visit.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			visit: req.visit,
			AllVisits: allVisits,
		});
	} catch (e) {
		next(createError(e));
	}
};

module.exports = {
	addNewVisit,
	updateVisit,
	deleteVisit,
	getVisit,
	getAllVisits,
};
