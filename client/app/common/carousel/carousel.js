import angular from 'angular';
import uiRouter from 'angular-ui-router';
import carouselComponent from './carousel.component';
import smartSrc from './smartSrc.directive';

let carouselModule = angular.module('carousel', [
	uiRouter,
	'ui.bootstrap.carousel'
])

	.component('carousel', carouselComponent)

	.directive('smartSrc', smartSrc)

	.name;

export default carouselModule;
