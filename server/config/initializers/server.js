'use strict';

const express = require('express');
const path = require('path');
const nconf = require('nconf');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const errorHandler = require('../../app/middleware/errorHandler');
const logger = require('./logger');


module.exports.initLocalVariables = (app) => {
	// Setting application local variables
	//app.locals.var = somevar
	//Can be accessed from anywhere
	app.locals.title = nconf.get('title');
	// Passing the request url to environment locals
	app.use((req, res, next) => {
		res.locals.host = `${req.protocol}://${req.hostname}`;
		res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
		next();
	});
};

module.exports.initMiddleware = (app) => {
	// Showing stack errors
	app.set('showStackError', false);

	// EJS
	app.set('view engine', 'ejs');
	/* eslint no-undef: "off" */
	app.set('views', path.join(__dirname, '../../app/views'));

	//Response time
	// app.use(responseTime());
	// Enable jsonp
	app.enable('jsonp callback');

	// Should be placed before express.static
	app.use(compress({
		filter(req, res) {
			return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
		},
		level: 6
	}));

	//Cors
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,x-brandId');
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
		next();
	});

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(errorHandler.bodyParserError);

	app.use(express.static(path.join(__dirname, '../../../dist'))); // serve static files before auth

	//health check
	app.get('/health', (req, res) => {
		res.sendStatus(200);
	});

	// Bunyan Logging
	app.use(logger.getRequestLogger);

	//Auth helper
	// app.use(ltAuth.verify());

	// app.use(logger.addLogFields);

};

module.exports.initHelmetHeaders = (app) => {
	app.use(helmet());
};

module.exports.initModulesServerRoutes = (app) => {
	require('../../app/routes/index.js')(app);
};

module.exports.initErrorHandlers = (app) => {
	app.use(errorHandler.logErrors);
	app.use(errorHandler.clientErrorHandler);
	app.use(errorHandler.catchAllErrorHandler);
};

module.exports.init = () => {
	const app = express();
	
	// Initialize local variables
	this.initLocalVariables(app);


	// Initialize Express middleware
	this.initMiddleware(app);

	// Initialize Helmet security headers
	this.initHelmetHeaders(app);

	// Initialize modules server routes
	this.initModulesServerRoutes(app);

	// Init error handlers
	this.initErrorHandlers(app);

	return app;
};
