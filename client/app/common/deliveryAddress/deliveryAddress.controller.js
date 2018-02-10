let addNewDeliveryAddress;
let _Session;
let _timeout
class DeliveryAddressController {
    constructor(STRINGS, User, Session, Brand, $timeout) {
        'ngInject';
        this.STRINGS = STRINGS;
        this.User = User;
        this.name = 'deliveryAddress';
        this.counter = 0;
        this.Brand = Brand;
        this.address = {};
        this.selectedDeliveryAddressIndex = -1;
        _Session = Session;
        _timeout = $timeout;
        this.deliveryCities = this.Brand.getDeliveryCities();
        this.addressTypes = ['Home', 'Work', 'Other'];

    }
    $onInit() {

        this.deliveryAddresses = _Session.getUserDetails().brandUserAddresses || [];

        this.deliveryAddresses = this.deliveryAddresses.filter(function(obj) {
            return parseInt(obj.locationId) === parseInt(_Session.getLocation().locationId)
        })
        if (!_Session.getUserDetails()) {
            this.isNewUser = true;
        }

        if (_Session.getSelectedAddress()) {
            this.selectedDeliveryAddress = _Session.getSelectedAddress();
            this.selectAddress(_Session.getSelectedAddress());
        }

        if (_Session.getDeliveryComment()) {
            this.deliveryComment = _Session.getDeliveryComment();
        }

        this.initializeAddress();

    }

    updateDeliveryComment() {
        _Session.setDeliveryComment(this.deliveryComment);
    }

    initializeAddress() {

        this.address = {};
        if (!this.deliveryAddresses || !this.deliveryAddresses.length) {
            this.addNewAddress = 1;
        } else {
            this.addNewAddress = 0;
        }

        if (_Session.getLocation().hasOwnProperty('address2'))
            this.address.locality = { cityConcatenatedName: _Session.getLocation().address2, locationId: _Session.getLocation().locationId };
        else
            this.address.locality = _Session.getLocation();

        this.address.city = _Session.getCity();
        this.selectedCityId = _Session.getCity().cityId;
    }

    onCitySelected(cityId) {
        this.address.city = this.deliveryCities.filter((obj) => {
            return obj.cityId == cityId
        })[0]
    }
    showAddAddress(val) {
        if (!val) {
          delete this.address.addressId;
          delete this.address.address1;
        }
        this.addNewAddress = val;
    }

    onAddressTypeSelected(type) {
        this.address.addressType = type;
    }

    changeAddress(address, e) {
        if (e) {
            let temp = {};
            Object.assign(temp, address)
            e.stopPropagation();
            this.selectedCityId = address.cityId;
            temp.locality = { cityConcatenatedName: address.address2, locationId: address.locationId };
            temp.city = { cityId: address.cityId, cityName: address.cityName };
            this.address = temp;
            this.showAddAddress(1);
        }

        console.log(this.address)
    }

    updateDeliveryAddress(e) {
        if (this.selectedDeliveryAddressIndex >= 0) {

            this.updateDeliveryComment();
            _Session.setSelectedAddress(this.deliveryAddresses[this.selectedDeliveryAddressIndex]);
            this.close({ $value: true });
        }
    }

    addNewDeliveryAddress(addressPayload) {

        return this.User.addAddress(_Session.getUserDetails().brandUserId, this.Brand.getCountryId(), addressPayload);
    }


    submitAddress(address) {

        let addressPayload = {
            address1: address.address1,
            address2: address.locality.cityConcatenatedName,
            city: address.city.cityName,
            cityId: address.city.cityId,
            locationId: (address.locality.locationId || address.locationId).toString(),
            addressType: address.addressType
        };

        if (!address.addressId) {
            if (!_Session.getUserDetails()) {

                let user = {
                    fullName: this.address.fullName,
                    password: '123456',
                    primaryEmail: this.address.email,
                    primaryMobile: _Session.getUserName()
                };
                this.User.register(user, this.Brand.getCountryId(), addressPayload)
                    .then((result) => {
                        this.isNewUser = 0;
                        this.deliveryAddresses.unshift(result.address);
                        _Session.setUserDetails(result.userDetails);
                        _Session.setUserAddresses(this.deliveryAddresses);
                        this.showAddAddress(0);
                        this.counter = 0;
                        this.selectAddress(result.address);
                    })
                    .catch((error) => {
                        this.errorMessage = 'This User Email already exists, please try again';

                        _timeout(function() {
                            this.errorMessage = '';
                        }, 2000);


                    })
            } else {
                this.addNewDeliveryAddress(addressPayload)
                    .then((response) => {
                        console.log(response)
                        this.deliveryAddresses.unshift(response);
                        _Session.setUserAddresses(this.deliveryAddresses);
                        this.showAddAddress(0);
                        this.counter = 0;
                        this.selectAddress(response);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        } else {
            this.updateAddress(address)
        }
    }

    updateAddress(address) {


        let temp = Object.assign({}, address);
        temp.address2 = this.address.locality.cityConcatenatedName;
        temp.locality = this.address.locality.cityConcatenatedName;
        temp.city = this.address.city.cityName;
        temp.addressType = this.address.addressType;
        temp.cityId = this.address.city.cityId;

        this.User.editAddress(temp)
            .then((result) => {


                for (var val in this.deliveryAddresses) {
                    let obj = this.deliveryAddresses[val];
                    if (obj.addressId == result.addressId) {
                        this.deliveryAddresses[val] = result;
                    }
                }

                _Session.setUserAddresses(this.deliveryAddresses);
                this.showAddAddress(0)
            })
            .catch(() => {
                // this.addresses.pop();
            });
    }
    scroll(val) {
        this.counter = this.counter + val;
        // this.selectedDeliveryAddressIndex = '';
    }

    selectAddress(address) {
        for (let i = 0; i < _Session.getUserDetails().brandUserAddresses.length; i++) {
            if (this.deliveryAddresses[i].addressId == address.addressId) {
                this.selectedDeliveryAddressIndex = i;
            }
        }
    }

    deleteAddress(addressId, e) {


        
        this.User.deleteAddress(addressId)
            .then((result) => {
                console.log(result)
                this.deliveryAddresses = this.deliveryAddresses.filter(function(obj) {
                    return obj.addressId != result
                });
                _Session.setUserAddresses(this.deliveryAddresses);
                if (!this.deliveryAddresses.length) {
                    this.showAddAddress(1);
                }
               
                if(this.deliveryAddresses.length < this.counter + 1){
                   this.counter = this.counter - 2;
                }


                this.initializeAddress();
            })
            .catch(() => {
                /**
                 * TODO Handle error
                 */
            });
        e.stopPropagation();
    }


}

export default DeliveryAddressController;
