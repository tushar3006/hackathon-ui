import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'ui-select';
import ngSanitize from 'angular-sanitize';
import locationSelectorComponent from './locationSelector.component';
import locationAutocomplete from '../locationAutocomplete/locationAutocomplete';
import outletSelector from './outletSelector/outletSelector';

let locationSelectorModule = angular.module('locationSelector', [
	uiRouter,
	'ui.select',
	ngSanitize,
	locationAutocomplete,
	outletSelector
])

	.component('locationSelector', locationSelectorComponent)

	.name;

export default locationSelectorModule;
