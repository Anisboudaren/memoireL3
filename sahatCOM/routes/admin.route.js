const adminRouter = require('express').Router();
const User = require('../models/user.model');
//const caregiverController = require('../controllers/cgController');
/* GET home page. */
const userController = require('../controllers/user.controller');
const Patient = require('../models/patient.model');
const Caregiver = require('../models/caregiver.model');
const Visit = require('../models/visit.model');

adminRouter.get('/', async (req, res) => {
	try {
		const allUsers = await User.find({}, {}, { lean: true });
		res.render('pages/dashboard', { users: allUsers, focus: 1 });
	} catch (error) {
		console.error(error);
		// Handle the error appropriately
		res.status(500).send('Internal Server Error');
	}
});

adminRouter.get('/users', async (req, res) => {
	try {
		const allUsers = await User.find({}, {}, { lean: true });
		res.render('pages/users', { users: allUsers, focus: 4 });
	} catch (error) {
		console.error(error);
		// Handle the error appropriately
		res.status(500).send('Internal Server Error');
	}
});

adminRouter.get('/patients', async (req, res) => {
	try {
		const allPatients = await Patient.find({}, {}, { lean: true });
		res.render('pages/patients', { patients: allPatients, focus: 4 });
	} catch (error) {
		console.error(error);
		// Handle the error appropriately
		res.status(500).send('Internal Server Error');
	}
});
adminRouter.get('/caregivers', async (req, res) => {
	try {
		const results = await Caregiver.find({}, {}, { lean: true });
		console.log(results);
		res.render('pages/caregivers', { users: results, focus: 4 });
	} catch (error) {
		console.error(error);
		// Handle the error appropriately
		res.status(500).send('Internal Server Error');
	}
});
adminRouter.get('/apoints', async (req, res) => {
	try {
		const results = await Visit.find({}, {}, { lean: true }).populate(['patientId', 'caregiverId']);

		console.log(results);
		res.render('pages/apoints', { users: results, focus: 4 });
	} catch (error) {
		console.error(error);
		// Handle the error appropriately
		res.status(500).send('Internal Server Error');
	}
});
module.exports = adminRouter;
