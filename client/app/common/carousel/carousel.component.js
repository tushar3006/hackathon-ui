import template from './carousel.html';
import controller from './carousel.controller';
import './carousel.scss';

let carouselComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		images: '<',
		interval: '@'
	},
	template,
	controller
};

export default carouselComponent;
