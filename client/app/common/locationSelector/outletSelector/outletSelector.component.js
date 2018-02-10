import template from './outletSelector.html';
import controller from './outletSelector.controller';
import './outletSelector.scss';

let outletSelectorComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};

export default outletSelectorComponent;
