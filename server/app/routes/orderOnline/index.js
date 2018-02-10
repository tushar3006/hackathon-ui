'use strict';

let express = require('express');
let router = express.Router();

module.exports = (app) => {
	let indexController = require('../../controllers/indexController')(app);
	router.get('/', indexController.index);
	return router;
};
