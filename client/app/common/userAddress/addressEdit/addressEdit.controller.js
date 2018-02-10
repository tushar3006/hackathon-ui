class AddressEditController {
	constructor(STRINGS, Brand) {
		'ngInject';
		this.STRINGS = STRINGS;
		this.Brand = Brand;

		this.address = {};
		this.cities = this.Brand.getCities();
		this.addressSearchDisabled = true;
// <<<<<<< HEAD
// 		if (this.resolve.address) {
// 			Object.assign(this.address, this.resolve.address);
// 			this.address.city = this.cities.filter(city => city.cityId === this.address.cityId)[0];
// 			this.address.locality = {
// 				locationId :this.address.locationId,
// 				cityConcatenatedName: this.address.address2
// 			};
// 		}
// 		if (!this.address.addressType) {
// 			this.address.addressType = 'Home';
// 		}
//
// 		if (this.resolve.locationFilter) {
// 			this.cityDisabled = true;
// 			this.addressSearchDisabled = true;
// 			this.address.city = this.cities.filter(city => city.cityId === this.resolve.locationFilter.city.cityId)[0];
// 			this.address.locality = {
// 				locationId :this.resolve.locationFilter.location.locationId,
// 				cityConcatenatedName: this.resolve.locationFilter.location.cityConcatenatedName
// 			};
// 		}
// =======
// 		// if (this.resolve.address) {
// 		// 	Object.assign(this.address, this.resolve.address);
// 		// 	this.address.city = this.cities.filter(city => city.cityId === this.address.cityId)[0];
// 		// 	console.log(this.address);
// 		// 	this.address.locality = {
// 		// 		locationId :this.address.locationId,
// 		// 		cityConcatenatedName: this.address.address2
// 		// 	};
// 		// }
// >>>>>>> ad606e4... merged server changes
	}

	$onChanges() {
	}

	$onInit() {
	}

	onCitySelected () {
		this.addressSearchDisabled = false;
	}

	onSelectAddress (item) {
		// this.address.locality = item;
	}

	submitAddress () {
		// this.close({$value: this.address});
	}
}

export default AddressEditController;
