import AddressEditModule from './addressEdit'
import AddressEditController from './addressEdit.controller';
import AddressEditComponent from './addressEdit.component';
import AddressEditTemplate from './addressEdit.html';

describe('AddressEdit', () => {
	let $rootScope, makeController;

	beforeEach(window.module(AddressEditModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AddressEditController();
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
			expect(AddressEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AddressEditComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(AddressEditTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(AddressEditController);
			});
	});
});
