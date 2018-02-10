import angular from 'angular';
import uiRouter from 'angular-ui-router';
import DeliveryAddress from '../deliveryAddress/deliveryAddress';
import cartComponent from './cart.component';

import CartService from './cart.service';
import Payment from '../../components/checkout/payment/payment';




let cartModule = angular.module('cart', [
	uiRouter,
	DeliveryAddress

])

	.service('CartService', CartService)

	.component('cart', cartComponent)

	.name;

export default cartModule;
