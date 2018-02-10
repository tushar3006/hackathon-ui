import template from './deliveryAddress.html';
import controller from './deliveryAddress.controller';
import './deliveryAddress.scss';

let deliveryAddressComponent = {
	restrict: 'E', controllerAs:'vm',
	bindings: {close:'&',onDeliveryAddressSelected:'&'},
	template,
	controller
};

export default deliveryAddressComponent;
