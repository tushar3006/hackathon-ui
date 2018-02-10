import angular from 'angular';
// import Navbar from './navbar/navbar';
// import User from './user/user';
// import Session from './session/session';
// import Footer from './footer/footer';
import Brand from './brand/brand';
import authFlow from './authFlow/authFlow';


let commonModule = angular.module('app.common', [
	Brand,
	authFlow
])

	.config(() => {
		'ngInject';
		
	})

	.name;

export default commonModule;
