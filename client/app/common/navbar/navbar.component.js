import template from './navbar.html';
import controller from './navbar.controller';
import './navbar.scss';

let navbarComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		view: '<'
	},
	template,
	controller
};

export default navbarComponent;
