const cart = {},
    listeners = [];
let _Http, _PaymentService, _toastr, _Brand;
class CartService {
    constructor(Http, PaymentService, toastr, Brand, Session) {
        'ngInject';
        _Http = Http;
        _PaymentService = PaymentService;
        _toastr = toastr;
        _Brand = Brand;
        this.Session = Session
    }

    addListener(fn) {
        listeners.push(fn);
    }

    updateListeners() {
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    getCart() {
        if (!cart.cartItems) {
            return this.fetchCart();
        } else {
            return Promise.resolve(cart);
        }
    }

    getEmptyCart() {
        return Promise.resolve(cart);
    }

    updateCart(cartData) {
        for (const prop of Object.keys(cart)) {
            delete cart[prop];
        }
        Object.assign(cart, cartData);
        this.updateListeners();
        if (cart.errorMessage) {
            _toastr.error(cart.errorMessage);
        }
    }

    fetchCart() {
        return _Http.sendRequest('/cart', 'GET')
            .then((result) => {
                Object.assign(cart, result);
                return result;
            });
    }

    addItem(data) {

        /**
         * Check if item already in cart, if yes then change quantity
         */
        if (cart.cartItems && cart.cartItems.length > 0) {
            const item = cart.cartItems.find((element) => {
                return element.outletProductSkuId.toString() === data.outletProductSkuId.toString();
            });
            if (item) {
                // Check if addons are same
                if ((data.addons.length === item.addons.length) && (data.addons.every((e, i) => {
                        return (e.outletProductSkuId === item.addons[i].outletProductSkuId) && (e.quantity === item.addons[i].itemQuantity);
                    }))) {
                    return this.changeQuantity(this.Session.getCartId(), item.cartItemId, item.itemQuantity + 1);
                }
            }
        }

        return _Http.sendRequest('/cart/cartItems', 'PUT', {
                outletId: data.outletId,
                locationId: data.locationId,
                cartId: this.Session.getCartId(),
                outletProductSkuId: data.outletProductSkuId,
                addons: data.addons
            })
            .then((cartResponse) => {
                this.Session.setCartId(cartResponse.result.cartId);
                this.updateCart(cartResponse.result);
                this.Session.setCartData(cart);
            })
            .catch((error) => {
                return error;
            });
    }

    increase(cartItemId) {
        return _Http.sendRequest(`/cart/cartItems/${cartItemId}/increase`, 'PUT', {
                cartId: this.Session.getCartId()
            })
            .then((cartResponse) => {
                this.updateCart(cartResponse.result);
                this.Session.setCartData(cart);
            })
            .catch((error) => {
                return error;
            });
    }

    decrease(cartItemId) {
        return _Http.sendRequest(`/cart/cartItems/${cartItemId}/decrease`, 'PUT', {
                cartId: this.Session.getCartId()
            })
            .then((cartResponse) => {
                this.updateCart(cartResponse.result);
                this.Session.setCartData(cart);
            })
            .catch((error) => {
                return error;
            });
    }

    checkOffer(couponCode) {
        if (cart.offers && cart.offers.couponCode === couponCode) {
            return true;
        }
        return false;
    }

    changeQuantity(cartId, cartItemId, quantity) {
        return _Http.sendRequest(`/cart/cartItems/${cartItemId}?quantity=${quantity}`, 'PUT', { cartId })
            .then((cartResponse) => {
                this.updateCart(cartResponse.result);
                this.Session.setCartData(cart);
            })
            .catch((error) => {
                return error;
            });
    }
    applyOffer(offerId,cartId) {
        if (!cart || !cart.cartItems || cart.cartItems.length <= 0) {
            this.updateListeners();
            _toastr.error('Please add some items to your cart first.');
            return Promise.reject();
        }
        return _Http.sendRequest('/cart/offer', 'PUT', {
                offerId,
                cartId
            })
            .then((cartResponse) => {
                if (Object.keys(cartResponse.result).length) {
                    this.updateCart(cartResponse.result);
                } else {
                    _toastr.error("Offer not valid.");
                }
                return Promise.resolve();
            })
            .catch((error) => {
                if (error.data.message) {
                    _toastr.error(error.data.message);
                } else {
                    _toastr.error("Offer not valid.");
                }
                this.updateListeners();
                return error;
            });
    }

    removeOffer(cartId) {
        return _Http.sendRequest('/cart/offer', 'DELETE', {
                cartId
            })
            .then((cartResponse) => {
                this.updateCart(cartResponse.result);
            })
            .catch((error) => {
                _toastr.error(error.data.message);
                this.updateListeners();
                return error;
            });
    }

    validateCartAndFetchPaymentVendors() {
        return _Http.sendRequest('/cart/validate', 'GET')
            .then((response) => {
                Object.assign(cart, response.cart);
                // _PaymentService.setPaymentVendors(response.paymentVendors);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

}

export default CartService;
