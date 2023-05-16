const jwt = require('jsonwebtoken');
require('dotenv').config();

const genToken = function (payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET);
};

const authToken = function (req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	console.log(req.headers);
	if (token == null)
		return res.status(401).json({
			result: false,
			message: 'please send a token with your request',
		});

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({
				result: false,
				message: 'this token is no longer valid , access denied',
			});
		req.user = user;
		console.log(user);
		next();
	});
};

module.exports = {
	authToken,
	genToken,
};
