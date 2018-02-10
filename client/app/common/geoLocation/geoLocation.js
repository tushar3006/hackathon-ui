import angular from 'angular';
import GeoLocationService from './geoLocation.service';

let geoLocationModule = angular.module('geoLocation', [])

	.service('GeoLocationService', GeoLocationService)

	.name;

export default geoLocationModule;
