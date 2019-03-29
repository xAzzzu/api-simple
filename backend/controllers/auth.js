const config =  require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authService = require('../services/auth');
const userService = require('../services/user');

function login(req, res){
	return authService.authenticate(req.body)
	.then(token => {
		res.send({
			success: true,
			data: { token }
		});
	})
	.catch(err => {
		if (err.type === 'custom'){
			return res.send({
				success: false,
				message: err.message
			});
		}
		return res.send({
			success: false,
			message: 'Authentication failed. Unexpected Error.'
		});
	});
}

function register(req, res){
    if(req.body.login !== undefined || req.body.password !== undefined){
        return userService.getUserByLogin(req.body.login || '')
            .then(exists => {

                if (exists){
                    return res.send({
                        success: false,
                        message: 'Registration failed. User with this email already registered.'
                    });
                }
                var user = {
                    login: req.body.login,
                    password: bcrypt.hashSync(req.body.password, config.saltRounds)
                }

                return userService.addUser(user)
                    .then(() => res.send({success: true}));
            });
    } else {
        res.send({success: false})
	}
}

module.exports = {
	login,
	register
};
