import OrderBoxModule from './orderBox'
import OrderBoxController from './orderBox.controller';
import OrderBoxComponent from './orderBox.component';
import OrderBoxTemplate from './orderBox.html';

describe('OrderBox', () => {
	let $rootScope, makeController;

	beforeEach(window.module(OrderBoxModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new OrderBoxController();
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
			expect(OrderBoxTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = OrderBoxComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(OrderBoxTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(OrderBoxController);
			});
	});
});
