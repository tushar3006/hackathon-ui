class UserAddressController {
	constructor(STRINGS, User, $uibModal, $rootScope) {
		'ngInject';
		this.STRINGS = STRINGS;
		this.name = 'userAddress';
		this.User = User;
		this.$uibModal = $uibModal;
		this.selectedAddressIndex = 0;
		this.$rootScope = $rootScope;
		this.$rootScope.$on('userloggedin', () => {
			this.addresses = this.filter(this.User.getAddresses());
		});
// <<<<<<< HEAD
		this.addresses = this.filter(this.User.getAddresses());
		this.onSelect({ data: this.addresses[this.selectedAddressIndex] });
// =======
// 		this.addresses = this.User.getAddresses();
// 		// this.onSelect({ data: this.addresses[this.selectedAddressIndex] });
// >>>>>>> ad606e4... merged server changes
	}

	filter(addresses) {
		if (this.locationFilter) {
			return addresses.filter(address => address.locationId == this.locationFilter.location.locationId);
		} else {
			return addresses;
		}
	}

	$onChanges() {}

	$onInit() {
		if (this.User.isSignedIn()) {
			this.addresses = this.filter(this.User.getAddresses());
		}
	}
//
// <<<<<<< HEAD
// 	addAddress() {
// 		let modalInstance = this.$uibModal.open({
// 			animation: true,
// 			backdrop: 'static',
// 			component: 'addressEdit',
// 			size: 'md',
// 			resolve: {
// 				locationFilter: () => {
// 					return this.locationFilter;
// 				}
// 			}
// 		});
//
// 		modalInstance.result.then((address) => {
// 			let addressPayload = {
// 				address1: address.address1,
// 				address2: address.locality.cityConcatenatedName,
// 				city: address.city.cityName,
// 				cityId: address.city.cityId,
// 				locationId: address.locality.locationId.toString(),
// 				addressType: address.addressType
// 			};
// 			addressPayload.showLoader = true;
// 			this.addresses.push(addressPayload);
// 			this.User.addAddress(addressPayload)
// 				.then((result) => {
// 					this.addresses.pop();
// 					this.addresses = this.filter(result);
// 					this.onSelect({ data: this.addresses[this.selectedAddressIndex] });
// 				})
// 				.catch(() => {
// 					this.addresses.pop();
// 				});
// 		}, () => {
// 			// TODO
// 			// $log.info('modal-component dismissed at: ' + new Date());
// 		});
// 	}
// =======
	// addAddress() {
	// 	let modalInstance = this.$uibModal.open({
	// 		animation: true,
	// 		backdrop: 'static',
	// 		component: 'addressEdit',
	// 		size: 'md'
	// 	});

	// 	modalInstance.result.then((address) => {
	// 		let addressPayload = {
	// 			address1: address.address1,
	// 			address2: address.locality.cityConcatenatedName,
	// 			city: address.city.cityName,
	// 			cityId: address.city.cityId,
	// 			locationId: address.locality.locationId.toString(),
	// 			addressType: address.addressType
	// 		};
	// 		addressPayload.showLoader = true;
	// 		this.addresses.push(addressPayload);
	// 		this.User.addAddress(addressPayload)
	// 			.then((result) => {
	// 				this.addresses.pop();
	// 				this.addresses = result;
	// 				this.onSelect({ data: this.addresses[this.selectedAddressIndex] });
	// 			})
	// 			.catch(() => {
	// 				this.addresses.pop();
	// 			});
	// 	}, () => {
	// 		// TODO
	// 		// $log.info('modal-component dismissed at: ' + new Date());
	// 	});
	// }
// >>>>>>> ad606e4... merged server changes

	editAddress(address) {
		let modalInstance = this.$uibModal.open({
			animation: true,
			backdrop: 'static',
			component: 'addressEdit',
			size: 'md',
			resolve: {
				address: () => {
					return Object.assign({}, address);
				},
				locationFilter: () => {
					return this.locationFilter;
				}
			}
		});

		modalInstance.result.then((address) => {
			let addressPayload = {
				addressId: address.addressId,
				address1: address.address1,
				address2: address.locality.cityConcatenatedName,
				city: address.city.cityName,
				cityId: address.city.cityId,
				locationId: address.locality.locationId.toString(),
				addressType: address.addressType
			};
			addressPayload.showLoader = true;
			let addressIndex;
			for(let i=0; i<this.addresses.length; i++) {
				if(this.addresses[i].addressId === address.addressId) {
					this.addresses[i] = addressPayload;
					addressIndex = i;
					break;
				}
			}
			this.User.editAddress(addressPayload, addressIndex)
				.then((result) => {
					this.addresses = this.filter(result);
					this.onSelect({ data: this.addresses[this.selectedAddressIndex] });
				})
				.catch(() => {
					// this.addresses.pop();
				});
		}, () => {
			// TODO
			// $log.info('modal-component dismissed at: ' + new Date());
		});
	}

	deleteAddress(address) {
		address.showLoader = true;
		this.User.deleteAddress(address.addressId)
			.then((result) => {
				this.addresses = this.filter(result);
			})
			.catch(() => {
				/**
				 * TODO Handle error
				 */
			});
	}

	selectAddress(address) {
		for (let i = 0; i < this.addresses.length; i++) {
			if (this.addresses[i].addressId === address.addressId) {
				this.selectedAddressIndex = i;
			}
		}
		this.onSelect({ data: address });
	}


}

export default UserAddressController;
