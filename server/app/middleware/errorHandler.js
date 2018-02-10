'use strict';

module.exports.bodyParserError = (err, req, res, next) => {
	req.log.error('Bad Json passed');
	res.status(400).send({
		error: 'Invalid JSON passed'
	});
	next(err);
};

module.exports.logErrors = (err, req, res, next) => {
	req.log.error(err);
	next(err);
};

module.exports.clientErrorHandler = (err, req, res, next) => {
	res.status(err.statusCode || err.status || 500).send({
		result: null,
		error: err.message,
		status: err.statusCode || err.status || 500
	});
};

module.exports.catchAllErrorHandler = (err, req, res, next) => {
	res.status(500);
	res.render('error', { error: err });
};