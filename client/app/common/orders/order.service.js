let _Brand, _Http, _Session,$window;
class OrderService {
	constructor(Http, Brand, Session,$window) {
		'ngInject';
		_Brand = Brand;
		_Http = Http;
		_Session = Session;
		$window = $window;
	}

	getAllOrders() {
		return _Http.sendRequest('/orders', 'GET')
			.then((result) => {
				let orders = result;
				orders = orders.map((order) => {
					order.outlet = _Brand.getOutletMetaById(order.outletId);
					return order;
				});
				return Promise.resolve(orders);
			});
	}

	getOrder(ltOrderId) {
		return _Http.sendRequest(`/orders/${ltOrderId}`, 'GET');
	}


	/**
	 * Create order with comments,
	 * addressId and
	 * payment
	 */
	createOrder(paymentDetails) {
		let selectedAddress = _Session.getSelectedAddress().addressId;
		return _Http.sendRequest('/orders', 'POST', {
			selectedAddress,
			orderData : _Session.getSessionData()

		})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

	retryOrder(paymentDetails) {
		return _Http.sendRequest('/orders', 'PUT', {
			paymentDetails
		})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}

}

export default OrderService;
