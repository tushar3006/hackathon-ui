import angular from 'angular';
import uiRouter from 'angular-ui-router';
import managerComponent from './manager.component';
import Auth from '../../common/auth/auth';

let managerModule = angular.module('manager', [
	uiRouter,
	Auth
])

	.config(($stateProvider,$urlRouterProvider) => {
		'ngInject';

		//  $stateProvider
		// .state("otherwise", { url : '/'});
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('manager', {
				url: '/',
				component: 'manager'
			});
	})

	.component('manager', managerComponent)

	.name;

export default managerModule;
