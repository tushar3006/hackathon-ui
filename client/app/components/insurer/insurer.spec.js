import InsurerModule from './insurer'
import InsurerController from './insurer.controller';
import InsurerComponent from './insurer.component';
import InsurerTemplate from './insurer.html';

describe('Insurer', () => {
	let $rootScope, makeController;

	beforeEach(window.module(InsurerModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new InsurerController();
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
			expect(InsurerTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = InsurerComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(InsurerTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(InsurerController);
			});
	});
});
