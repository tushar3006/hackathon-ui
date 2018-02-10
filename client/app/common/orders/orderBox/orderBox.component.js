import template from './orderBox.html';
import controller from './orderBox.controller';
import './orderBox.scss';

let orderBoxComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		order: '<',
		isOpen: '<',
		updateStatus: '@'
	},
	template,
	controller
};

export default orderBoxComponent;
