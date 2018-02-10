import template from './cart.html';
import controller from './cart.controller';
import './cart.scss';

let cartComponent = {
    restrict: 'E',
    controllerAs: 'vm',
    bindings: { cartLoaderEnabled : '<' , appliedCouponCode : '<' ,selectedDeliveryAddress:'<' ,removeOffer :'&'},
    template,
    controller
};

export default cartComponent;
