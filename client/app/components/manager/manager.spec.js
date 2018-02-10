import ManagerModule from './manager'
import ManagerController from './manager.controller';
import ManagerComponent from './manager.component';
import ManagerTemplate from './manager.html';

describe('Manager', () => {
	let $rootScope, makeController;

	beforeEach(window.module(ManagerModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ManagerController();
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
			expect(ManagerTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = ManagerComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(ManagerTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(ManagerController);
			});
	});
});
