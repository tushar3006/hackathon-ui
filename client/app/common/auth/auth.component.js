import template from './auth.html';
import controller from './auth.controller';
import './auth.scss';

let authComponent = {
	restrict: 'E',
	controllerAs:'vm',
	bindings: {},
	template,
	controller
};

export default authComponent;
