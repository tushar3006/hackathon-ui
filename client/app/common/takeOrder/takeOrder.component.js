import template from './takeOrder.html';
import controller from './takeOrder.controller';
import './takeOrder.scss';


let takeOrderComponent = {
    restrict: 'E',
    controllerAs: 'vm',
    bindings: { userData: '&', _dataAvailable: '&', close: '&' },
    template,
    controller
};

export default takeOrderComponent;
