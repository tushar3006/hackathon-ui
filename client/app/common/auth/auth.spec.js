import AuthModule from './auth'
import AuthController from './auth.controller';
import AuthComponent from './auth.component';
import AuthTemplate from './auth.html';

describe('Auth', () => {
	let $rootScope, makeController;

	beforeEach(window.module(AuthModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AuthController();
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
			expect(AuthTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AuthComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(AuthTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(AuthController);
			});
	});
});
