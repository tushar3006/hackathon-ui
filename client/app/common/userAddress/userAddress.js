import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userAddressComponent from './userAddress.component';
import User from '../user/user';
import addressEdit from './addressEdit/addressEdit';

let userAddressModule = angular.module('userAddress', [
	uiRouter,
	User,
	addressEdit
])

	.component('userAddress', userAddressComponent)

	.name;

export default userAddressModule;
