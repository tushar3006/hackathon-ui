let loggedInListerner;
class OrdersController {
	constructor(STRINGS, $rootScope, orderService, AppConstants) {
		'ngInject';
		this.STRINGS = STRINGS;
		this.$rootScope = $rootScope;
		this.orderService = orderService;
		this.currencySymbolCode = AppConstants.country.currencySymbolCode;
	}

	$onInit() {
		this.showFetchOrdersError = false;
		this.showLoader = false;
		this.init();
		loggedInListerner = this.$rootScope.$on('userloggedin', () => {
			this.init();
		});
	}

	$onDestroy() {
		loggedInListerner();
	}

	init() {
		this.showLoader = true;
		this.orderService.getAllOrders()
			.then((orders) => {
				this.showLoader = false;
				this.orders = orders;
			})
			.catch(() => {
				this.showLoader = false;
				this.showFetchOrdersError = true;
			});
	}
}

export default OrdersController;
