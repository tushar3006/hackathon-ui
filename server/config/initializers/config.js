'use strict';

let nconf = require('nconf');
let initConfig = () => {
	// Load Environment variables from .env file
	require('dotenv').load({
		// path: '../../../.env'
	});
	// Set up configs
	nconf.use('memory');
	// First load command line arguments
	nconf.argv();
	// Load environment variables
	nconf.env();

	/* istanbul ignore if */
	if (nconf.get('NODE_ENV') === 'jenkins') {
		require('../environments/jenkins');
	/* istanbul ignore else */
	} else if (nconf.get('NODE_ENV') === 'mocha') {
		require('../environments/mocha');
	}

	//Logger config
	nconf.set('logger', {
		name: nconf.get('title')
	});

	let config = nconf.get();
	return config;
};

module.exports = initConfig();
