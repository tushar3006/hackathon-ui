import template from './insurer.html';
import controller from './insurer.controller';
import './insurer.scss';

let insurerComponent = {
	restrict: 'E',
	controllerAs: 'vm',
	bindings: {},
	template,
	controller
};

export default insurerComponent;
