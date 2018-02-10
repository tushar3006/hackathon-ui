import angular from 'angular';
import ordersComponent from './orders.component';
import orderService from './order.service';
import orderBox from './orderBox/orderBox';
import Brand from '../brand/brand';
import Cart from '../cart/cart';

let ordersModule = angular.module('orders', [
	orderBox,
	Brand,
	Cart
])

	.service('orderService', orderService)

	.component('orders', ordersComponent)

	.name;

export default ordersModule;
