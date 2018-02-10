import angular from 'angular';

import ooManager from './manager/manager';
import insurer from './insurer/insurer';




let componentModule = angular.module('app.components', [
	
	ooManager,
	insurer
])

	.name;

export default componentModule;
