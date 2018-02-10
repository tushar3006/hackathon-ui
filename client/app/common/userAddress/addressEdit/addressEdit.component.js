import template from './addressEdit.html';
import controller from './addressEdit.controller';
import './addressEdit.scss';

let addressEditComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};

export default addressEditComponent;
