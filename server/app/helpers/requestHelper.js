'use strict';
let rp = require('request-promise');

const sendRequest = (request, options) => {
	options = options || {};

	if (typeof options.json === typeof undefined) {
		options.json = true;
	}

	let logger = request.req.log;

	let requestOptions = {
		uri: request.uri,
		method: request.method,
		headers: {
			'Content-Type': 'application/json',
			'X-Request-Id': logger.fields.req_id
		},
		json: options.json,
		time: true,
		resolveWithFullResponse: true
	};

	requestOptions.headers['Authorization'] = request.req.authHelper.getToken();

	if (request.body) {
		requestOptions.body = request.body;
	}

	if (request.headers) {
		for (let header in request.headers) {
			if (request.headers.hasOwnProperty(header)) {
				requestOptions.headers[header] = request.headers[header];
			}
		}
	}
	logger.info({ request: requestOptions }, 'Sending request');

	return rp(requestOptions)
		.then((response) => {
			logger.info({ response: response.body, time: response.elapsedTime }, 'Request completed');
			return Promise.resolve(response.body);
		})
		.catch((error) => {
			logger.error({ error: error.error, options: requestOptions }, 'Error sending request');
			return Promise.reject(error);
		});
};

module.exports = {
	sendRequest: sendRequest
};
