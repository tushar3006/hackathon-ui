'use strict';

const formatResponse = (res, response, status, query = null) => {
	if (query !== null) {
		return res.status(status).json({
			result: response.result,
			totalCount: response.count,
			status: status.toString(),
			error: null
		});
	} else {
		return res.status(status).json({
			result: response,
			status: status.toString(),
			error: null
		});
	}
};

const formatError = (res, error, status) => {

	if (Array.isArray(error)) {
		error = error[0];
	}
	if (error.message) {
		error = error.message;
	} else if (error.errors) {
		if (Array.isArray(error.errors)) {
			error.errors = error.errors[0];
		}
		error = error.errors.message;
	}
	return res.status(status).json({
		result: null,
		status: status.toString(),
		error: error
	});
};

module.exports = {
	formatResponse: formatResponse,
	formatError: formatError
};