import template from './locationSelector.html';
import controller from './locationSelector.controller';
import './locationSelector.scss';

let locationSelectorComponent = {
    restrict: 'E',
    controllerAs: 'vm',
    bindings: {
        onSelect: '&',
        close: '&',
        fromHero: '<',
        initData: '<',
        resolve: '<',
        orderSelectedLocation: '<',
        onResetDelivery: '&'
    },
    template,
    controller
};

export default locationSelectorComponent;
