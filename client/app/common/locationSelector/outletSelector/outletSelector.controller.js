class OutletSelectorController {
	constructor(STRINGS) {
		'ngInject';
		this.STRINGS = STRINGS;
	}
	$onInit() {
		this.city = this.resolve.city;
		this.outlets = this.city.outlets;
		this.selectedOutlet = {
			outlet: this.outlets[0]
		};
	}
}

export default OutletSelectorController;
