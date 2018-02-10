'use strict';

// var router = require('express').Router();

// Define API versions here

// router.use('/v2', require('./v2/'));

module.exports = (app) => {

	app.use('/api', require('./api/')(app));

	app.get('/docs', (req, res) => {
		/* eslint no-undef: "off" */
		res.sendFile(require('path').join(__dirname , '../../docs/docs.json'));
	});

	app.use('/', require('./orderOnline')(app));

	app.use('/*', require('./orderOnline')(app));
	

};
