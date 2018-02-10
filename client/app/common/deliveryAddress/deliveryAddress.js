import angular from 'angular';
import uiRouter from 'angular-ui-router';
import userAddress from '../userAddress/userAddress';
import locationAutocomplete from '../locationAutocomplete/locationAutocomplete';
import deliveryAddressComponent from './deliveryAddress.component';

let deliveryAddressModule = angular.module('deliveryAddress', [
	uiRouter,
	userAddress,
	locationAutocomplete
	])

.component('deliveryAddress', deliveryAddressComponent)

.name;

export default deliveryAddressModule;
