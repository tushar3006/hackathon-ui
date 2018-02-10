import template from './orders.html';
import controller from './orders.controller';
import './orders.scss';

let ordersComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {},
	template,
	controller
};

export default ordersComponent;
