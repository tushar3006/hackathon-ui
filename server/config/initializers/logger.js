'use strict';

const bunyan = require('bunyan');

module.exports.getBasicLogger = (name = 'init') => {
	return bunyan.createLogger({ name });
};

module.exports.getRequestLogger = require('express-bunyan-logger')({
	name: 'request',
	src: true,
	excludes: [
		'user-agent',
		'res-headers',
		'res',
		'req'
	],
	genReqId: (req) => {
		return req.headers['x-request-id'] || require('node-uuid').v4();
	},
	levelFn: (status, err, meta) => {
		if (meta['response-time'] > 2000) {
			return 'fatal';
		} else {
			return 'info';
		}
	}
});

module.exports.addLogFields = (req, res, next) => {

	// req.log.fields.brandUserId = req.authHelper.getBrandUserId();

	next();	
};