import angular from 'angular';
import uiRouter from 'angular-ui-router';
import orderBoxComponent from './orderBox.component';

let orderBoxModule = angular.module('orderBox', [
	uiRouter
])

	.component('orderBox', orderBoxComponent)

	.name;

export default orderBoxModule;
