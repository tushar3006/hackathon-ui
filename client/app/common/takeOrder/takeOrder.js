import angular from 'angular';
import uiRouter from 'angular-ui-router';
import User from '../user/user';
import takeOrderComponent from './takeOrder.component';
import LocationSelector from '../../common/locationSelector/locationSelector';

let takeOrderModule = angular.module('takeOrder', [
	uiRouter,
	LocationSelector,
	User
])

	.component('takeOrder', takeOrderComponent)

	.name;

export default takeOrderModule;
