import angular from 'angular';
import locationAutocompleteComponent from './locationAutocomplete.component';
import GeoLocationService from '../../common/geoLocation/geoLocation';

let locationAutocompleteModule = angular.module('locationAutocomplete', [
	GeoLocationService
])

	.component('locationAutocomplete', locationAutocompleteComponent)

	.name;

export default locationAutocompleteModule;
