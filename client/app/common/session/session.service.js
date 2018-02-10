let session = {};
let _$window;

class SessionService {
    constructor(Http, Brand, $state, $window, STRINGS) {
        'ngInject';
        this.Http = Http;
        this.Brand = Brand;
        this.$state = $state;
        this.STRINGS = STRINGS;

        // if ($window.initialState.sessionData) {
        //  Object.assign(session, $window.initialState.sessionData);
        // }
        _$window = $window;
        $window.sessionData = session;
    }


    getDeliveryComment() {
        return session.deliveryComment;
    }
    getLtOrderId() {
        return session.ltOrderId;
    }

    getOrderComment(){
        return session.orderComment;
    }

    getPayableAmount() {
        return session.payableAmount;
    }
    getSessionData() {
        return session;
    }

    getOrderType() {

        return session.orderType;
    }

    getOutlet() {
        return session.outlet;
    }

    getCity() {
        if (session.city) {
            return Object.assign({}, session.city);
        } else {
            return null;
        }
    }

    getLocation() {
        if (session.location) {
            return Object.assign({}, session.location);
        } else {
            return null;
        }
    }

    getAllLocationData() {
        return {
            orderType: this.getOrderType(),
            outlet: this.getOutlet(),
            city: this.getCity(),
            location: this.getLocation(),
            preOrder: this.getPreOrder(),
            preOrderTimeSlot: this.getPreOrderTimeSlot()
        };
    }
    getUserName() {
        return session.userName;
    }

    getPreOrder() {
        return session.preOrder;
    }

    getCartData() {
        return session.cartData;
    }

    getUserDetails() {
        if (session.userDetails.hasOwnProperty('token'))
            session.userDetails.token = this.STRINGS.userDetails != '' ? this.STRINGS.userDetails.token : '';
        return session.userDetails;
    }

    getCartId() {
        return session.cartId;
    }

    getPreOrderTimeSlot() {
        return session.preOrderTimeSlot;
    }

    getSelectedAddress() {
        return session.selectedAddress;
    }

    setOrderType(orderType) {
        session.orderType = orderType;
    }

    setOutlet(outlet) {
        session.outlet = outlet;
    }

    setCartId(cartId) {
        session.cartId = cartId;
    }

    setCity(city) {
        session.city = Object.assign({}, city);
        delete session.city.outlets;
    }

    setCartData(data) {
        session.cartData = data;
    }

    setLocation(location) {
        session.location = location;
    }

    setDeliveryComment(comment) {
        session.deliveryComment = comment;
    }

    setOrderComment(comment){
        session.orderComment = comment;
    }

    setPreOrder(preOrderFlag) {
        session.preOrder = preOrderFlag;
    }

    setPreOrderTimeSlot(slot) {
        session.preOrderTimeSlot = slot;
    }

    setSelectedAddress(address) {
        session.selectedAddress = address;
    }

    setUserDetails(details) {
        session.userDetails = details;
    }
    setUserAddresses(addresses) {
        session.userDetails = session.userDetails ? session.userDetails : {};
        session.userDetails.brandUserAddresses = addresses;
    }




    setUserName(userName) {
        session.userName = userName;
    }


    resetSession() {
            _$window.sessionData = session = {};
            this.$state.reload();

        }
        /**
         * If this method is called, it means that the user is done with the home page,
         * and wants to proceed to the menu page.
         * This call should do the following operations:
         * 1. Save the session in the user session
         */
    commitHome() {
        session.outletSelected = true;
        const sessionPayload = session;
        sessionPayload.outlet = {
            outletId: session.outlet.outletId
        };
        return this.Http.sendRequest('/users/current/session', 'POST', { session: sessionPayload });
    }
}

export default SessionService;
