import TakeOrderModule from './takeOrder'
import TakeOrderController from './takeOrder.controller';
import TakeOrderComponent from './takeOrder.component';
import TakeOrderTemplate from './takeOrder.html';

describe('TakeOrder', () => {
	let $rootScope, makeController;

	beforeEach(window.module(TakeOrderModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new TakeOrderController();
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
			expect(TakeOrderTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
		// component/directive specs
		let component = TakeOrderComponent;

		it('includes the intended template', () => {
			expect(component.template).to.equal(TakeOrderTemplate);
		});

		it('invokes the right controller', () => {
			expect(component.controller).to.equal(TakeOrderController);
		});
	});
});
