import OutletSelectorModule from './outletSelector'
import OutletSelectorController from './outletSelector.controller';
import OutletSelectorComponent from './outletSelector.component';
import OutletSelectorTemplate from './outletSelector.html';

describe('OutletSelector', () => {
  let $rootScope, makeController;

  beforeEach(window.module(OutletSelectorModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new OutletSelectorController();
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
      expect(OutletSelectorTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = OutletSelectorComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(OutletSelectorTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(OutletSelectorController);
      });
  });
});
