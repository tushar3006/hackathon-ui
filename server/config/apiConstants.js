const nconf = require('nconf');
module.exports = {
	BRANDS: {
		DOMAIN: {url: `${nconf.get('BRAND_DOMAIN')}/api/v1/outlet-service/brand-by-domain-name`, method: 'GET'},
		OUTLETS_BY_CITY: {url: `${nconf.get('BRAND_DOMAIN')}/api/v1/outlet-service/brands/{brandId}/outlets/city`, method: 'GET'},
		IS_OUTLET_OPEN: {url: `${nconf.get('BRAND_DOMAIN')}/api/v1/outlet-service/outlets/{outletId}/is-outlet-open`, method: 'GET'},
		OUTLETS_BY_LOCATION: {url: `${nconf.get('BRAND_DOMAIN')}/api/v1/outlet-service/brands/{brandId}/outlets-by-location`, method: 'GET'},
		OUTLETS_DELIVERY_SETTINGS: {url: `${nconf.get('BRAND_DOMAIN')}/api/v1/outlet-service/outlets/{outletId}/deliverysettings`, method: 'GET'}
	},
	USERS: {
		LOGIN: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/login`, method: 'POST'},
		CREATE: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/brand/{brandId}/user`, method: 'POST'},
		AUTH: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/auth`, method: 'POST'},
		DETAILS: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/user/{brandUserId}`, method: 'GET'},
		SEND_OTP: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/sendOtp`, method: 'POST'},
		VERIFY_OTP: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/verifyOtp`, method: 'POST'},
		VERIFY_OTP_PASSWORD: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/verifyOtp/changePassword`, method: 'POST'},
		ADD_ADDRESS: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/{brandUserId}/address`, method: 'POST'},
		UPDATE_ADDRESS: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/address/{addressId}`, method: 'PUT'},
		DELETE_ADDRESS: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/users/address/{addressId}`, method: 'DELETE'},
		FETCH_USER_DETAILS: {url: `${nconf.get('USER_DOMAIN')}/api/v1/people-service/brands/{brandId}/users/userName/{userName}`, method: 'GET'}
	},
	GL: {
		COUNTRY: {url: `${nconf.get('GL_DOMAIN')}/api/v1/geo-location/country/{countryId}`, method: 'GET'},
		SUGGESTIONS: {url: `${nconf.get('GL_DOMAIN')}/api/v1/geo-location/locations/search`, method: 'GET'},
		BULKLOCATION : {url: `${nconf.get('GL_DOMAIN')}/api/v1/geo-location/locations-bulk`, method: 'GET'}
	},
	ORDER: {
		ORDERS_BY_CUSTOMER: {url: `${nconf.get('ORDER_DOMAIN')}/api/v1/order-service/orders/user/{brandUserId}`, method: 'GET'},
		CREATE: {url: `${nconf.get('ORDER_DOMAIN')}/api/v1/order-service/orders`, method: 'POST'},
		GET: {url: `${nconf.get('ORDER_DOMAIN')}/api/v1/order-service/orders/{ltOrderId}`, method: 'GET'},
		UPDATE_STATE: {url: `${nconf.get('ORDER_DOMAIN')}/api/v1/order-service/orders/{ltOrderId}/changeState`, method: 'POST'},
		ADD_PAYMENT: {url: `${nconf.get('ORDER_DOMAIN')}/api/v1/order-service/orders/{ltOrderId}/addPayment`, method: 'POST'}
	},
	CART : {
		CREATE: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart`, method: 'POST'},
		GET: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}`, method: 'GET'},
		ADD_ITEM: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/cartItems`, method: 'PUT'},
		CHANGE_QUANTITY: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/cartItem/{cartItemId}`, method: 'PUT'},
		INCREASE: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/cartItem/{cartItemId}/increase`, method: 'PUT'},
		DECREASE: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/cartItem/{cartItemId}/decrease`, method: 'PUT'},
		DELETE_ITEM: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/cartItem/{cartItemId}`, method: 'DELETE'},
		APPLY_OFFER: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/offers`, method: 'PUT'},
		REMOVE_OFFER: {url: `${nconf.get('CART_DOMAIN')}/api/v1/cart-service/cart/{cartId}/offers`, method: 'DELETE'}
	},
	OFFERS: {
		GET: {url: `${nconf.get('CORE_DOMAIN')}/api/v1/restaurant_id/{brandId}/outlet_id/{outletId}/offers`, method: 'GET'}
	},
	MENU: {
		GET: {url: `${nconf.get('MENU_DOMAIN')}/api/v1/menu`, method: 'GET'}
	},
	PAYMENTS: {
		GET_VENDORS: {url: `${nconf.get('PAYSERV_DOMAIN')}/api/v1/vendors`, method: 'GET'}
	}
};
