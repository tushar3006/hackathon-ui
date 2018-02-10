import angular from 'angular';
import UserService from './user.service';
import toastr from 'angular-toastr';

let userModule = angular.module('user', [
	toastr
])

	.config((toastrConfig) => {
		'ngInject';
		angular.extend(toastrConfig, {
			autoDismiss: true,
			containerId: 'toast-container',
			maxOpened: 0,
			newestOnTop: true,
			positionClass: 'toast-top-center',
			preventDuplicates: false,
			preventOpenDuplicates: false,
			target: 'body',
			tapToDismiss: true,
			closeButton: true,
			closeHtml: '<button>&times;</button>',
			timeout: 200
		});
	})
	.service('User', UserService)

	.name;

export default userModule;
