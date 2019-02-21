const Users = require('../models').User;
const config =  require('../config');
const CustomError = require('../CustomError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = params => {
	return Users.findOne({
		where: {
			login: params.login
		},
		raw: true
	}).then(user => {
		if (!user)
			throw new CustomError('Authentication failed. User not found.');

		if (!bcrypt.compareSync(params.password || '', user.password))
			throw new CustomError('Authentication failed. Wrong password.');

		const payload = {
			login: user.login,
			id: user.id,
			time: new Date()
		};

		var token = jwt.sign(payload, config.jwtSecret, {
			expiresIn: config.tokenExpireTime
		});

		return token;
	});
}

module.exports = {
	authenticate
}
