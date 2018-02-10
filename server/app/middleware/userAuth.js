'use strict';

let userService = require('../services/userService');

module.exports = function (app) {
	// app.use(function (req, res, next) {
	// 	if (req.session.user && req.session.user.token) {
	// 		userService.auth(req, req.session.user.token)
	// 			.then((result) => {
	// 				if (result.token) {
	// 					return next();
	// 				}
	// 			})
	// 			.catch(() => {
	// 				delete req.session.user;
	// 			});
	// 	}

	// 	return next();
	// });
};
