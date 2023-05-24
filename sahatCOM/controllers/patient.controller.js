const createError = require('http-errors');
const Patient = require('../models/patient.model');
const userController = require('../controllers/user.controller');
const medRecModel = require('../models/medicalRecord.model');
const _ = require('lodash');
const fs = require('fs');

const { genToken } = require('../utils/jwt');
const User = require('../models/user.model');
const { default: mongoose } = require('mongoose');

const getProfile = async (req, res, next) => {
	try {
		const patient = await Patient.findById(req.user.owner);
		console.log(req.user.owner);
		if (patient) {
			req.patient = patient;
			return res.status(200).json({
				result: true,
				patient: patient,
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
		const patient = await Patient.findById({ _id: req.user.owner }, {}, { lean: true });

		if (patient) {
			const willBeUpdated = await Patient.findByIdAndUpdate({ _id: req.body.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'patient updated.',
				});
			} else {
				return res.status(400).json({
					result: true,
					message: 'Something went wrong while updating patient.',
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
const addNewPatient = async (req, res, next) => {
	const patient = _.pick(req.body, ['firstName', 'lastName', 'dateOfBirth', 'gender', 'address', 'phoneNumber', 'medicalHistory']);

	const objectId = new mongoose.Types.ObjectId();

	patient._id = objectId;

	const newPatient = new Patient(patient);

	const { error } = newPatient.validatePatient(patient);

	if (error) {
		return res.status(400).json({
			result: false,
			message: error,
		});
	} else {
		try {
			console.log('we are in try');
			req.body.owner = newPatient._id;
			req.body.usertype = 'Patient';
			await userController.addNewUser(req, res);
			if (req.newUser) {
				console.log('the user that has been created', req.newUser);
				const patientResult = await newPatient.save();
				if (patientResult) {
					console.log('i am in then of save', patientResult);
					return res.status(201).json({
						result: true,
						message: 'new patient has been added',
						user: req.newUser,
						patient: patient,
					});
				} else {
					console.log('i am in then of catch');
					return res.status(400).json({
						result: false,
						message: 'something went wrong while saving the patient',
						err: err,
					});
				}
			}
		} catch (e) {
			next(createError(e));
		}
	}
};
const updatePatient = async (req, res, next) => {
	console.log(req.body);
	try {
		const patient = await Patient.findById({ _id: req.body.id }, {}, { lean: true });

		if (patient) {
			const willBeUpdated = await Patient.findByIdAndUpdate({ _id: req.body.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'patient updated.',
				});
			} else {
				return res.status(400).json({
					result: true,
					message: 'Something went wrong while updating patient.',
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
const deletePatient = async (req, res, next) => {
	try {
		const patient = await Patient.findOneAndDelete({ _id: req.params.id });
		if (patient) {
			return res.status(202).json({
				result: true,
				message: 'patient successfully deleted',
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
const getPatient = async (req, res, next) => {
	try {
		const patient = await Patient.findById(req.params.id);
		if (patient) {
			req.patient = patient;
			return res.status(200).json({
				result: true,
				patient: patient,
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
		const allPatients = await Patient.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			AllPatients: allPatients,
		});
	} catch (e) {
		next(createError(e));
	}
};

// medical record
const addNewMedRec = async (req, res, next) => {
	try {
		// Read the binary stream of bytes from the request and accumulate it into a buffer
		const buffer = [];
		req.on('data', (chunk) => {
			buffer.push(chunk);
		});

		// Handle the end of the request stream
		req.on('end', async () => {
			// Concatenate the buffer into a single buffer containing all the data
			const pdfData = Buffer.concat(buffer);

			// Do something with the PDF data, such as storing it in a database or writing it to disk
			// ...
			console.log(pdfData.toString());

			// assuming 'buffer' is the buffer content received in the request
			fs.writeFile('./filename.pdf', pdfData, function (err) {
				if (err) {
					console.log('Error writing PDF file: ', err);
				} else {
					console.log('PDF file written successfully!');
				}
			});
			await medRecModel.create({ patientId: req.user.owner, pdfFile: pdfData });
			// Send a response to the client
			res.status(200).send(pdfData);
		});

		// Handle any errors that occur during the request
		req.on('error', (err) => {
			console.error(err);
			res.status(500).send('Error uploading PDF file');
		});
	} catch (error) {
		res.status(400).send('something went wrong while uploading pdf to the database');
	}
};
module.exports = {
	addNewPatient,
	updatePatient,
	deletePatient,
	getPatient,
	getAll,
	getProfile,
	updateProfile,
	addNewMedRec,
};
