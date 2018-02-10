import Angular-offlineModule from './angular-offline'
import Angular-offlineController from './angular-offline.controller';
import Angular-offlineComponent from './angular-offline.component';
import Angular-offlineTemplate from './angular-offline.html';

describe('Angular-offline', () => {
	let $rootScope, makeController;

	beforeEach(window.module(Angular-offlineModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new Angular-offlineController();
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
			expect(Angular-offlineTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = Angular-offlineComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(Angular-offlineTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(Angular-offlineController);
			});
	});
});
