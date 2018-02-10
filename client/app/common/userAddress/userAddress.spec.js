import UserAddressModule from './userAddress'
import UserAddressController from './userAddress.controller';
import UserAddressComponent from './userAddress.component';
import UserAddressTemplate from './userAddress.html';

describe('UserAddress', () => {
	let $rootScope, makeController;

	beforeEach(window.module(UserAddressModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new UserAddressController();
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
			expect(UserAddressTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = UserAddressComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(UserAddressTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(UserAddressController);
			});
	});
});
