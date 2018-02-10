import DeliveryAddressModule from './deliveryAddress'
import DeliveryAddressController from './deliveryAddress.controller';
import DeliveryAddressComponent from './deliveryAddress.component';
import DeliveryAddressTemplate from './deliveryAddress.html';

describe('DeliveryAddress', () => {
	let $rootScope, makeController;

	beforeEach(window.module(DeliveryAddressModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new DeliveryAddressController();
		};
	}));

	describe('Module', () => {
		// top-level specs: i.e., routes, injection, naming
	});

	describe('Controller', () => {
		// controller specs
		it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
			let controller = makeController();
			expect(controller).to.have.property('name');
		});
	});

	describe('Template', () => {
		// template specs
		// tip: use regex to ensure correct bindings are used e.g., {{  }}
		it('has name in template [REMOVE]', () => {
			expect(DeliveryAddressTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = DeliveryAddressComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(DeliveryAddressTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(DeliveryAddressController);
			});
	});
});
