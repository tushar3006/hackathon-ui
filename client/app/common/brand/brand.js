import angular from 'angular';
import BrandService from './brand.service';
import Http from '../http/http';

let brandModule = angular.module('brand', [
	Http
])

	.service('Brand', BrandService)

	.name;

export default brandModule;
