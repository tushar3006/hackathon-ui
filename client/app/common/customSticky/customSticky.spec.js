import CustomStickyModule from './customSticky'
import CustomStickyController from './customSticky.controller';
import CustomStickyComponent from './customSticky.component';
import CustomStickyTemplate from './customSticky.html';

describe('CustomSticky', () => {
	let $rootScope, makeController;

	beforeEach(window.module(CustomStickyModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new CustomStickyController();
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
			expect(CustomStickyTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = CustomStickyComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(CustomStickyTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(CustomStickyController);
			});
	});
});
