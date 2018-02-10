'use strict';

// let brandService = require('../services/brandService');
// const nconf = require('nconf');

module.exports = function (app) {
	app.use(function (req, res, next) {
		if (req.headers['x-brandid']) {
			req.brandId = req.headers['x-brandid'];
		}
		// req.log.info("request to resolve brand for url %s", req.url);
		// if (req.session.brand && req.brandId) {
		//   return next();
		// }
		// let domainName = req.headers.host.replace("www.", "");
		// if (nconf.get('NODE_ENV') === 'development') {
		// 	let domainName = 'bk.test.limetray.in';
		// 	req.log.info(`domainName: ${domainName}`);
		// 	brandService.getDomainDetails(req, domainName)
		// 		.then((brandResults) => {
		// 			req.session.brand = brandResults;
		// 			return next();
		// 		})
		// 		.catch((error) => {
		// 			return next(error);
		// 		});
		// } else {
		// 	return next();
		// }
		return next();
	});
};
