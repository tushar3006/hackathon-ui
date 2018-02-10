import angular from 'angular';
import SessionService from './session.service';

let sessionModule = angular.module('session', [])

	.service('Session', SessionService)

	.name;

export default sessionModule;
