import template from './footer.html';
import controller from './footer.controller';
import './footer.scss';

let footerComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {},
	template,
	controller
};

export default footerComponent;
