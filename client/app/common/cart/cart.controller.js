let _CartService;
let _$rootScope;
let _orderService;
let _$state;
let _$mdDialog;
let _Session;





class CartController {
    constructor(STRINGS, $mdDialog, AppConstants, CartService, $rootScope, $state, Session, $uibModal, orderService) {
        'ngInject';
        this.STRINGS = STRINGS;
        this.name = 'cart';
        this.Session = Session;
        this.currencySymbol = AppConstants.country.currencySymbolCode;
        CartService.getEmptyCart()
            .then((cart) => {
                this.cart = cart;
            })
            .catch((error) => {
                //cart fetch error
            });
        // this.showLoader = true;
        _$rootScope = $rootScope;
        _orderService = orderService;
        _CartService = CartService;
        this._$uibModal = $uibModal;
        _$state = $state;
        _$mdDialog = $mdDialog;

        this.showMobileCart = false;
        this.enablePlaceOrder = false;


        
        window.onbeforeunload = (evt) => {

            var message = 'Are you sure you want to leave?';
            if (typeof evt == 'undefined') {
                evt = window.event;
            }
            if (evt) {
                evt.returnValue = message;
            }
            return message;
        }

    }


    openDeliveryAddressModal() {
        let modalInstance = this._$uibModal.open({
            animation: true,
            backdrop: 'false',
            component: 'deliveryAddress',
            size: 'lg',
            windowClass: 'modal-take-order',

        });

        modalInstance.result.then((data) => {

            if (data) {
                this.onDeliveryAddressSelected(data);
                this.selectedDeliveryAddress = this.Session.getSelectedAddress();

                this.selectedDeliveryAddress.fullName = this.Session.getUserDetails().fullName;
                this.selectedDeliveryAddress.mobile = this.Session.getUserDetails().primaryMobile;
            } else
                this.onDeliveryAddressSelected(false);

        }, () => {
            // $log.info('modal-component dismissed at: ' + new Date());
        });
    }

    $onInit() {

        // _$rootScope.$on('startcartupdate', () => {
        //     this.showLoader = true;
        // });
        // _$rootScope.$on('endcartupdate', () => {
        //     this.showLoader = false;
        // });

    }

    $onChanges() {

        this.couponCode = this.appliedCouponCode;
        this.showLoader = this.cartLoaderEnabled;

        if(this.cartLoaderEnabled){
            this.updateCartScroll();
        }

    }

    increase(cartItem) {
        this.showLoader = true;
        _CartService.increase(cartItem.cartItemId)
            .then(() => {
                this.showLoader = false;
                this.checkCoupon();
            })
            .catch(() => {
                this.showLoader = false;
                this.checkCoupon();
            });
    }

    decrease(cartItem) {
        this.showLoader = true;
        _CartService.decrease(cartItem.cartItemId)
            .then(() => {
                this.showLoader = false;
                this.checkCoupon();
            })
            .catch(() => {
                this.showLoader = false;
                this.checkCoupon();
            });
    }



    placeOrder() {

        // console.log(this)
        this.placingOrder = true;
        _orderService.createOrder()
            .then((result) => {
                this.placingOrder = false;

                this.showOrderResultDialog('Order Placed SuccessFully, Order Id :' + result.ltOrderId);
            })
            .catch((error) => {
                this.placingOrder = false;
                this.showOrderResultDialog('Failed to place order');
            });
    }

    validateCart() {
        // if (this.cart.cartItems.length < 0) {
        //  return Promise.reject('NO_ITEMS');
        // }
        return _CartService.validateCartAndFetchPaymentVendors();
    }

    proceed() {
        this.showProceedLoader = true;
        this.validateCart()
            .then(() => {
                this.showProceedLoader = false;
                _$state.go('checkout');
            })
            .catch((error) => {
                // TODO handle
                this.showProceedLoader = false;
                console.log(error);
            });
    }

    showOrderResultDialog(message) {

       document.body.scrollTop = 0;
       
        var alert = _$mdDialog.alert()
            .title('Order Status')
            .textContent(message)
            .ok('Ok');
        _$mdDialog
            .show(alert)
            .then(() => {
                this.Session.resetSession();
            })
            .finally(function() {
                this.Session.resetSession();
            });

    }
    openCart() {
        this.showMobileCart = true;
    }

    dismissCart() {
        this.showMobileCart = false;
    }

    customize(cartItem) {
        _$rootScope.$emit(`customizeitem:${cartItem.outletProductSkuId}`, {
            addons: cartItem.addons
        });
    }

    onDeliveryAddressSelected(data) {
        this.updateCartScroll();
        this.enablePlaceOrder = data;
    }

    updateOrderComment() {
        this.Session.setOrderComment(this.orderComment);
    }
    
    updateCartScroll(){
        angular.element(document.querySelector(".cartMain"))[0].scrollTop = angular.element(document.querySelector(".cartMainInner"))[0].clientHeight;
    } 

    applyCoupon(e) {

        if ((e.which == '13' || e.which == '1')) {
                if (!this.couponCode) {
                    return;
                }
                this.showLoader = true;
                _CartService.applyOffer(this.couponCode, this.Session.getCartId())
                    .then(() => {
                        this.showLoader = false;
                    })
                    .catch(() => {
                        this.showLoader = false;
                    });

            }
        }

    }

    export default CartController;
