import angular from 'angular';
import navbarComponent from './navbar.component';
import User from '../user/user';
import Brand from '../brand/brand';
import AuthFlow from '../authFlow/authFlow';

let navbarModule = angular.module('navbar', [
	User,
	Brand,
	AuthFlow
])

	.component('navbar', navbarComponent)

	.name;

export default navbarModule;
