const adminRouter = require('express').Router();
const User = require('../models/user.model');
//const caregiverController = require('../controllers/cgController');
/* GET home page. */
const userController = require('../controllers/user.controller');

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

adminRouter.get('/maps', (req, res) => {
	res.render('pages/maps');
});

adminRouter.get('/tables', (req, res) => {
	res.render('pages/tables');
});
module.exports = adminRouter;
