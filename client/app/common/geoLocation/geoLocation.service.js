let GeoLocationService = (Http) => {
	'ngInject';
	const service = {};

	service.getSuggestions = (city, query) => {
		return Http.sendRequest(`/suggestions?cityId=${city.cityId}&query=${query}`, 'GET');
	};

	return service;
};

export default GeoLocationService;
