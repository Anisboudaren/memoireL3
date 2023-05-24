const createError = require('http-errors');
const Caregiver = require('../models/caregiver.model');
const userController = require('../controllers/user.controller');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');
const User = require('../models/user.model');
const { default: mongoose } = require('mongoose');

const getProfile = async (req, res, next) => {
	try {
		const caregiver = await Caregiver.findById(req.user.owner);
		console.log(req.user.owner);
		if (caregiver) {
			req.caregiver = caregiver;
			return res.status(200).json({
				result: true,
				caregiver: caregiver,
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
const updateProfile = async (req, res, next) => {
	try {
		const caregiver = await Caregiver.findById({ _id: req.user.owner }, {}, { lean: true });

		if (caregiver) {
			const willBeUpdated = await Caregiver.findByIdAndUpdate({ _id: req.body.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'caregiver updated.',
				});
			} else {
				return res.status(400).json({
					result: true,
					message: 'Something went wrong while updating caregiver.',
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
const addNewCaregiver = async (req, res, next) => {
	const caregiver = _.pick(req.body, ['firstName', 'lastName', 'phone', 'address', 'role', 'Specialties']);
	console.log(req.body);
	const objectId = new mongoose.Types.ObjectId();

	caregiver._id = objectId;

	const newCaregiver = new Caregiver(caregiver);

	const { error } = newCaregiver.validateCaregiver(caregiver);
	console.log(error);
	if (error) {
		console.log('now here ==>');
		res.status(400).json({
			result: false,
			message: error,
		});
	} else {
		try {
			console.log('we are in try');
			req.body.usertype = 'Caregiver';
			req.body.owner = newCaregiver._id;
			await userController.addNewUser(req, res);
			if (req.newUser) {
				console.log('the user that has been created', req.newUser);
				const caregiverResult = await newCaregiver.save();
				if (caregiverResult) {
					console.log('i am in then of save', caregiverResult);
					return res.status(201).json({
						result: true,
						message: 'new caregiver has been added',
						user: req.newUser,
						caregiver: caregiver,
					});
				} else {
					console.log('i am in then of catch');
					return res.status(400).json({
						result: false,
						message: 'something went wrong while saving the caregiver',
						err: err,
					});
				}
			}
		} catch (e) {
			next(createError(e));
		}
	}
};

const updateCaregiver = async (req, res, next) => {
	console.log(req.body);
	try {
		const caregiver = await Caregiver.findById({ _id: req.body.id }, {}, { lean: true });

		if (caregiver) {
			const willBeUpdated = await Caregiver.findByIdAndUpdate({ _id: req.body.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'caregiver updated.',
				});
			} else {
				return res.status(400).json({
					result: true,
					message: 'Something went wrong while updating caregiver.',
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
const deleteCaregiver = async (req, res, next) => {
	try {
		const caregiver = await Caregiver.findOneAndDelete({ _id: req.params.id });
		if (caregiver) {
			return res.status(202).json({
				result: true,
				message: 'caregiver successfully deleted',
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
const getCaregiver = async (req, res, next) => {
	try {
		const caregiver = await Caregiver.findById(req.params.id);
		if (caregiver) {
			req.caregiver = caregiver;
			return res.status(200).json({
				result: true,
				caregiver: caregiver,
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
const getAll = async (req, res, next) => {
	try {
		const allCaregivers = await Caregiver.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			AllCaregivers: allCaregivers,
		});
	} catch (e) {
		next(createError(e));
	}
};
module.exports = {
	addNewCaregiver,
	updateCaregiver,
	deleteCaregiver,
	getCaregiver,
	getAll,
	getProfile,
	updateProfile,
};
