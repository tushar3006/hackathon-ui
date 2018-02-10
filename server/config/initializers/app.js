'use strict';


const server = require('./server');
const config = require('./config.js');
const logger = require('./logger').getBasicLogger('app');

module.exports.init = (callback) => {
	const app = server.init();
	if (callback) callback(app, config);
};

module.exports.start = (callback) => {
	const _this = this;

	_this.init((app, config) => {

		// Start the app by listening on <port>
		app.listen(config.NODE_PORT, () => {

			// Logging initialization
			logger.info('Starting');
			logger.info(app.locals.title);
			logger.info((`Environment:${config.NODE_ENV}`));
			logger.info((`Port:${config.NODE_PORT}`));
			
			if (callback) callback(app, config);
		});

	});

};

	/* eslint no-undef: "off" */
process.on('uncaughtException', err => {
  /* eslint no-console: "off" */
	console.log('uncaught', err);
	setTimeout(() => {

	}, 1000);
});
