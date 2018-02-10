class LocationSelectorController {

    constructor(Brand, STRINGS, $uibModal, AppConstants, Session) {
        'ngInject';
        this.Brand = Brand;
        this.STRINGS = STRINGS;
        this.$uibModal = $uibModal;
        this.AppConstants = AppConstants;
        this.Session = Session;

    }


    $onChanges() {

        if (this.resolve) {
            this.initData = {};
            Object.assign(this.initData, this.resolve.initData);
        }

        this.orderType = this.initData.orderType || this.AppConstants.DELIVERY_SERVICE_ID;
        // this.selectedCity = this.initData.city;
        // this.selectedOutlet = this.initData.selectedOutlet;
        // this.selectedLocation = this.initData.location;
        this.deliveryCities = this.Brand.getDeliveryCities();
        this.takeawayCities = this.Brand.getTakeawayCities();
        this.showLoader = false;

        if (this.orderSelectedLocation) {
            let cityId = this.selectedDeliveryCityId = this.orderSelectedLocation.cityId;
            let item = this.deliveryCities.filter(function(obj) {
                return obj.cityId == cityId;
            })
            this.setOutletForLocation(this.orderSelectedLocation.locationId, this.orderType);
            item = item[0];
            this.addressSearchDisabled = false;
            this.selectedCity = item;
            this.selectedDeliveryCity = item;
            if (this.orderType === this.AppConstants.DELIVERY_SERVICE_ID) {
                this.addressSearchDisabled = false;
            } else {
                this.outletSelectionDisabled = false;
            }
            this.errorMessage = null;
            // this.orderNowDisabled = false;
            // this.orderForLaterDisabled = false;
            this.selectedLocation = { cityConcatenatedName: this.orderSelectedLocation.address2, locationId: this.orderSelectedLocation.locationId };
            this.selectedOutlet = null;
        }

    }
    hideAllErrors() {
        this.errorMessage = null;
    }

    showError(code) {
        if (this.STRINGS.ERRORS[code]) {
            this.errorMessage = this.STRINGS.ERRORS[code];
        }

    }
    validateLocationOrOutlet(selectedOutletDetails) {
        this.selectedOutlet = null;
        /**
         * First check if an outlet exists that services
         * Show error if it does not
         */


         
        if (!selectedOutletDetails.outletId) {
            this.orderNowDisabled = true;
            this.orderForLaterDisabled = true;
            this.showError('NO_OUTLET');
            return;
        }
        if (selectedOutletDetails.preOrderSlots.length === 0) {
            selectedOutletDetails.preOrder = false;
        }


        /**
         * Only preOrder
         * Enable order later
         * Show preOrder only message
         */
        if (selectedOutletDetails.onlyPreOrder === true) {
            this.orderForLaterDisabled = false;
            this.populateDateOptions(selectedOutletDetails);
            this.showError('ONLY_PREORDER');
            return;
        }

        /**
         * PreOrder enabled
         * If outlet open
         *   Enable order now
         *   Enable order for later
         * If outlet closed
         *  Enable order for later
         *  Show outlet closed + preOrder only message
         */
        if (selectedOutletDetails.preOrder === true) {
            this.selectedOutlet = selectedOutletDetails;
            if (selectedOutletDetails.outletOpen === true) {
                this.orderNowDisabled = false;
                this.orderForLaterDisabled = false;
                this.populateDateOptions(selectedOutletDetails);
                return;
            } else {
                this.orderForLaterDisabled = false;
                this.orderNowDisabled = true;
                this.populateDateOptions(selectedOutletDetails);
                this.showError('CLOSED_PREORDER');
                return;
            }
        }

        /**
         * PreOrder disabled
         * If outlet open
         *   Enable order now
         * If outlet closed
         *  Show outlet closed only message
         */
        if (selectedOutletDetails.preOrder === false) {
            this.orderForLaterDisabled = true;
            if (selectedOutletDetails.outletOpen === true) {
                this.selectedOutlet = selectedOutletDetails;
                this.orderNowDisabled = false;
                return;
            } else {
                this.showError('CLOSED_NO_PREORDER');
                return;
            }
        }



    }

    populateDateOptions(selectedOutletDetails) {
        /**
         * If preOrder enabled, populate data options
         */
        if (this.orderForLaterDisabled === false) {
            this.datesMap = {};
            selectedOutletDetails.preOrderSlots.map((slot) => {
                let tempDate = new Date(slot.epochSeconds * 1000);
                tempDate.setHours(0, 0, 0, 0);
                // slot.dateObject = tempDate;
                if (!this.datesMap[tempDate.getTime()]) {
                    this.datesMap[tempDate.getTime()] = [];
                }
                slot.start = new Date(tempDate.getTime() + (slot.start * 1000));
                slot.end = new Date(tempDate.getTime() + (slot.end * 1000));
                this.datesMap[tempDate.getTime()].push(slot);
            });
            const dates = Object.keys(this.datesMap).sort().map((epoch) => {
                return new Date(Number(epoch));
            });
            this.dateOptions.minDate = dates[0];
            this.dateOptions.maxDate = dates[dates.length - 1];
        }
    }

    onDateSelected(date) {
        // console.log(date);
    }

    onDeliveryCitySelected(item) {

        // let item = this.deliveryCities.filter(function(obj) {
        //     return obj.cityId == itemId;
        // })
        // item = item[0];
        this.Session.setCity(item)

        this.selectedCity = item;
        this.selectedDeliveryCity = item;

        if (this.orderType === this.AppConstants.DELIVERY_SERVICE_ID) {
            this.addressSearchDisabled = false;
        } else {
            this.outletSelectionDisabled = false;
        }
        this.errorMessage = null;
        // this.orderNowDisabled = false;
        // this.orderForLaterDisabled = false;
        this.selectedLocation = '';
        this.selectedOutlet = null;

        this.onResetDelivery({ $value: 1 });
    }

    onTakeawayCitySelected(item) {
        this.selectedCity = item;
        this.selectedTakeawayCity = item;
        this.selectedOutlet = null;
        let modalInstance = this.$uibModal.open({
            animation: true,
            backdrop: 'static',
            component: 'outletSelector',
            size: 'md',
            resolve: {
                city: () => {
                    return item;
                }
            }
        });

        const onSelectOutlet = (outlet) => {
            this.hideAllErrors();
            // alert(231)
            this.orderNowDisabled = true;
            this.orderForLaterDisabled = true;
            this.showLoader = true;
            this.Brand.getOutletDetails(outlet.outletId)
                .then((result) => {
                    this.showLoader = false;
                    this.selectedOutlet = outlet;
                    this.validateLocationOrOutlet(result);
                });
        };

        modalInstance.result.then((result) => {
            onSelectOutlet(result);
        }, () => {
            this.selectedTakeawayCity = null;
        });
    }

    reselectOutlet() {
        if (this.selectedTakeawayCity) {
            this.onTakeawayCitySelected(this.selectedTakeawayCity);
        }
    }


    onSelectLocation(item) {
        this.errorMessage = null;
        this.orderNowDisabled = true;
        this.orderForLaterDisabled = true;
        this.selectedLocation = item;
        this.Session.setLocation(item);
        this.setOutletForLocation(item.locationId, this.orderType);
        // Disable controls
        // Show loading

    }

    setOutletForLocation(locationId, orderType) {
        this.Brand.getOutletFromAddress(locationId, orderType)
            .then((result) => {
                // console.log(result)
                if (result.outletFound === false) {
                    this.showError('mc1');
                    return;
                }
                
                // this.orderNowDisabled = false;
                // this.orderForLaterDisabled = false;
                this.Session.setOutlet(result)
                this.validateLocationOrOutlet(result);

            });
    }

    orderNow() {
        if (!this.checkValidLocation()) {
            return;
        }
        // save outlet in session
        this.closeSelector({
            data: {
                orderType: this.orderType,
                outlet: this.selectedOutlet,
                city: this.selectedCity,
                location: this.selectedLocation,
                preOrder: false,
                preOrderTimeSlot: null
            }
        });
    }

    openPreOrderSelector() {
        if (!this.checkValidLocation()) {
            return;
        }
        this.showPreOrderSelector = true;
    }

    orderForLater() {
        if (!this.checkValidLocation()) {
            return;
        }
        if (!this.selectedTimeSlot.start) {
            return;
        }

        this.Session.setPreOrder(true);
        this.Session.setPreOrderTimeSlot(this.selectedTimeSlot);

        console.log(this.Session.getAllLocationData());
        this.closeSelector({
            data: {
                orderType: this.orderType,
                outlet: this.selectedOutlet,
                city: this.selectedCity,
                location: this.selectedLocation,
                preOrder: true,
                preOrderTimeSlot: this.selectedTimeSlot
            }
        });
        // preOrder date/time selection
    }

    checkValidLocation() {



        if (this.orderType === this.AppConstants.DELIVERY_SERVICE_ID) {
            if (this.selectedLocation) {
                return true;
            }

            this.errorMessage = this.STRINGS.LOCALITY_NOT_SELECTED;
        } else {
            if (this.selectedOutlet) {
                return true;
            }

            this.errorMessage = this.STRINGS.OUTLET_NOT_SELECTED;
        }
        return false;
    }

    $onInit() {
        this.showPreOrderSelector = false;
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };

        this.addressSearchDisabled = true;
        this.outletSelectionDisabled = true;
        this.errorMessage = null;

        this.orderNowDisabled = true;
        this.orderForLaterDisabled = true;
    }


    changeOrderType(orderType) {
        if (this.orderType !== orderType) {
            this.orderType = orderType;
            // init();
        }
    }

    skipToMenu() {
        // 'ngInject';
        this.closeSelector();
    }

    closeSelector(data) {
        // if (this.fromHero) {
        this.onSelect(data);
        // } else {
        // this.close({$value: data});
        // }
    }

    openDatePicker() {
        this.datePickerOpened = true;
        this.selectedTimeSlot = null;
    }

    onSelectTime(slot) {
        this.selectedTimeSlot = slot;
    }

}

export default LocationSelectorController;
