import angular from 'angular';
import uiRouter from 'angular-ui-router';
import authComponent from './auth.component';

let authModule = angular.module('auth', [
	uiRouter
])

.component('auth', authComponent)

.name;

export default authModule;
