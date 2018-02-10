import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addressEditComponent from './addressEdit.component';

let addressEditModule = angular.module('addressEdit', [
	uiRouter
])

	.component('addressEdit', addressEditComponent)

	.name;

export default addressEditModule;
