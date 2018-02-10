import LocationSelectorModule from './locationSelector'
import LocationSelectorController from './locationSelector.controller';
import LocationSelectorComponent from './locationSelector.component';
import LocationSelectorTemplate from './locationSelector.html';

describe('LocationSelector', () => {
	let $rootScope, makeController;

	beforeEach(window.module(LocationSelectorModule));
	beforeEach(inject((_$rootScope_) => {
	$rootScope = _$rootScope_;
	makeController = () => {
	  return new LocationSelectorController();
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
	  expect(LocationSelectorTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
	});
	});

	describe('Component', () => {
	  // component/directive specs
	  let component = LocationSelectorComponent;

	  it('includes the intended template',() => {
	expect(component.template).to.equal(LocationSelectorTemplate);
	  });

	  it('invokes the right controller', () => {
	expect(component.controller).to.equal(LocationSelectorController);
	  });
	});
});
