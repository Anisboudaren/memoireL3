const createError = require('http-errors');
const User = require('../models/user.model');
const _ = require('lodash');
const { genToken } = require('../utils/jwt');

const addNewUser = async (req, res) => {
	const user = _.pick(req.body, ['email', 'password', 'owner', 'usertype']);

	if (!user.email || !user.password || !user.usertype) {
		return res.json({
			result: false,
			message: 'please put in all needed information to create a user',
		});
	}

	const newUser = new User(user);

	const { error } = newUser.validateUser(user);

	if (error) {
		return res.status(400).json({
			result: false,
			message: error,
		});
	} else {
		try {
			const result = await newUser.save();
			if (result) {
				return (req.newUser = {
					result: true,
					message: 'new user has been added',
					token: genToken(result.toObject()),
				});
			} else {
				return res.status(400).json({
					result: false,
					message: 'something went wrong while saving the user',
				});
			}
		} catch (e) {
			console.log(createError(e));
			res.status(400).json({
				message: 'an error accrued while saving the user',
			});
		}
	}
};

const updateUser = async (req, res, next) => {
	try {
		const user = await User.findById({ _id: req.params.id }, {}, { lean: true });

		if (user) {
			const willBeUpdated = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { lean: true, new: true });

			if (willBeUpdated) {
				return res.status(201).json({
					result: true,
					message: 'user updated.',
				});
			} else {
				return res.status(400).json({
					result: false,
					message: 'Something went wrong while updating user.',
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

const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.id });
		console.log(req.params.id);
		if (user) {
			return res.status(202).json({
				result: true,
				message: 'user successfully deleted',
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

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			req.user = user;
			return res.status(200).json({
				result: true,
				user: user,
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

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({}, {}, { lean: true });
		return res.status(200).json({
			result: true,
			user: req.user,
			allUsers: allUsers,
		});
	} catch (e) {
		console.log(createError(e));
	}
};

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email }).then(async (user) => {
		if (user) {
			const isMatch = await user.comparePassword(password);
			if (isMatch) return res.status(201).json({ token: genToken(user.toObject()) });
			else {
				return res.status(400).json({
					message: 'password does not match!',
				});
			}
		} else {
			return res.status(400).json({
				message: 'no records of this email!',
			});
		}
	});
};
const loginAdmin = async (req, res, next) => {
	const { email, password } = req.body;
	await User.findOne({ email: email }).then(async (admin) => {
		console.log('admin is : ' + admin);
		if (admin) {
			console.log('inside if');
			const isMatch = await admin.comparePassword(password);
			if (isMatch) return res.status(201).json({ token: genToken(admin.toObject()) });
			else {
				return res.status(400).json({
					message: 'password does not match!',
				});
			}
		} else {
			console.log('inside else');
			return res.status(400).json({
				message: 'no records of this email!',
			});
		}
	});
};

module.exports = {
	addNewUser,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
	loginUser,
	loginAdmin,
};
