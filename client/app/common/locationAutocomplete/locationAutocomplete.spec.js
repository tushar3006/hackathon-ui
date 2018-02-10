import locationAutocompleteModule from './locationAutocomplete'
import locationAutocompleteController from './locationAutocomplete.controller';
import locationAutocompleteComponent from './locationAutocomplete.component';
import locationAutocompleteTemplate from './locationAutocomplete.html';

describe('locationAutocomplete', () => {
	let $rootScope, makeController;

	beforeEach(window.module(locationAutocompleteModule));
	beforeEach(inject((_$rootScope_) => {
	$rootScope = _$rootScope_;
	makeController = () => {
	  return new locationAutocompleteController();
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
	  expect(locationAutocompleteTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
	});
	});

	describe('Component', () => {
	  // component/directive specs
	  let component = locationAutocompleteComponent;

	  it('includes the intended template',() => {
	expect(component.template).to.equal(locationAutocompleteTemplate);
	  });

	  it('invokes the right controller', () => {
	expect(component.controller).to.equal(locationAutocompleteController);
	  });
	});
});
