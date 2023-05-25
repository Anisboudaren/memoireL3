const createError = require('http-errors');
const Report = require('../models/report.model');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');

const addNewReport = async (req, res) => {
	const report = _.pick(req.body, ['caregiverId', 'fullName', 'age', 'symptoms', 'relatedCauses', 'diagnosis', 'treatmentPlan']);

	if (!report.fullName || !report.symptoms || !report.diagnosis) {
		return res.json({
			result: false,
			message: 'please put in all needed information to create a report',
		});
	}

	const newReport = new Report(report);

	const { error } = newReport.validateReport(report);

	if (error) {
		return res.json({
			result: false,
			message: error,
		});
	} else {
		try {
			const result = await newReport.save();
			if (result) {
				return res.status(201).json({
					result: true,
					message: 'new report has been added',
				});
			} else {
				return res.json({
					result: false,
					message: 'something went wrong while saving the report',
				});
			}
		} catch (e) {
			console.log(createError(e));
			res.status(400).json({
				message: 'an error accrued while saving the report',
			});
		}
	}
};

const updateReport = async (req, res, next) => {
	try {
		const report = await Report.findById({ _id: req.params.id }, {}, { lean: true });

		if (report) {
			const willBeUpdated = await Report.findByIdAndUpdate({ _id: req.params.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'report updated.',
				});
			} else {
				return res.status(400).json({
					result: false,
					message: 'Something went wrong while updating report.',
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

const deleteReport = async (req, res, next) => {
	try {
		const report = await Report.findOneAndDelete({ _id: req.params.id });
		console.log(req.params.id);
		if (report) {
			return res.status(202).json({
				result: true,
				message: 'report successfully deleted',
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

const getReport = async (req, res, next) => {
	try {
		const report = await Report.findById(req.params.id);
		if (report) {
			req.report = report;
			return res.status(200).json({
				result: true,
				report: report,
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

const getAllReports = async (req, res, next) => {
	try {
		const allReports = await Report.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			report: req.report,
			AllReports: allReports,
		});
	} catch (e) {
		next(createError(e));
	}
};

module.exports = {
	addNewReport,
	updateReport,
	deleteReport,
	getReport,
	getAllReports,
};
