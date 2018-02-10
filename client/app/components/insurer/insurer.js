import angular from 'angular';
import uiRouter from 'angular-ui-router';
import insurerComponent from './insurer.component';

let insurerModule = angular.module('insurer', [
	uiRouter
])

	.component('insurer', insurerComponent)

	.config(($stateProvider,$urlRouterProvider) => {
		'ngInject';

		//  $stateProvider
		// .state("otherwise", { url : '/'});
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('insurer', {
				url: '/insurer',
				component: 'insurer'
			});
	})

	.name;

export default insurerModule;
