class OrderBoxController {
	constructor(STRINGS, AppConstants) {
		'ngInject';
		this.STRINGS = STRINGS;
		this.name = 'orderBox';
		this.currencySymbolCode = AppConstants.country.currencySymbolCode;
	}
}

export default OrderBoxController;
