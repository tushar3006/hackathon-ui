import angular from 'angular';
import httpService from './http.service';

let httpModule = angular.module('Http', [])

	.service('Http', httpService)

	.name;

export default httpModule;
