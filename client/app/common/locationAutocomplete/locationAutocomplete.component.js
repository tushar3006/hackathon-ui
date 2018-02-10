import template from './locationAutocomplete.html';
import controller from './locationAutocomplete.controller';
import './locationAutocomplete.scss';

let locationAutocompleteComponent = {
	restrict: 'E', controllerAs: 'vm',
	bindings: {
		city: '<',
		disabled: '<',
		placeholder: '<',
		selectedAddress: '=',
		onSelectAddress: '&',
		isRequired :'<'
	},
	template,
	controller
};

export default locationAutocompleteComponent;
