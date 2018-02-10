'use strict';

let _ = require('lodash');
module.exports = (req, res, next) => {
	if (req.headers['content-type'] !== 'application/json') {
		return res.status(400).send({
			error: 'Content-type header should be set to application.json'
		});
	}
	if (_.isEmpty(req.body)) {
		return res.status(400).send({
			error: 'Body must not be empty'
		});
	}
	next();
};