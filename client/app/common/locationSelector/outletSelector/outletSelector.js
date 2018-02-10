import angular from 'angular';
import uiRouter from 'angular-ui-router';
import outletSelectorComponent from './outletSelector.component';

let outletSelectorModule = angular.module('outletSelector', [
	uiRouter
])

	.component('outletSelector', outletSelectorComponent)

	.name;

export default outletSelectorModule;
