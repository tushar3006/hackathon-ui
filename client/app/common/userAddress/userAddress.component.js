import template from './userAddress.html';
import controller from './userAddress.controller';
import './userAddress.scss';

let userAddressComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		isSelector: '<',
		onSelect: '&',
		locationFilter: '<'
	},
	template,
	controller
};

export default userAddressComponent;
