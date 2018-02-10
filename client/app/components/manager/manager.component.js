import template from './manager.html';
import controller from './manager.controller';
import './manager.scss';

let managerComponent = {
	restrict: 'E',controllerAs : 'vm',
	bindings: {},
	template,
	controller
};

export default managerComponent;
