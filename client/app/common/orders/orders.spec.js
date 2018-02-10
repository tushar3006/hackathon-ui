import OrdersModule from './orders'
import OrdersController from './orders.controller';
import OrdersComponent from './orders.component';
import OrdersTemplate from './orders.html';

describe('Orders', () => {
  let $rootScope, makeController;

  beforeEach(window.module(OrdersModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new OrdersController();
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
      expect(OrdersTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = OrdersComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(OrdersTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(OrdersController);
      });
  });
});
