'use strict';

const user = {};
class UserService {
	constructor(Http, Brand, STRINGS, toastr, $rootScope, $window) {
		'ngInject';
		this.Http = Http;
		this.Brand = Brand;
		this.STRINGS = STRINGS;
		this.toastr = toastr;
		this.$rootScope = $rootScope;

		user.session = {};
		// if (this.userDetails.token) {
		// 	this.setCurrentUser(this.STRINGS.userDetails);
		// }
	}

	setCurrentUser(userDetails) {
		// let temp = JSON.parse(atob(token.split('.')[1]));
		// Object.assign(user, temp);
		// user.token = token;
		Object.assign(user, userDetails);
		this.Http.setToken(user.token);
		// this.toastr.success(this.STRINGS.LOGIN_SUCCESSFUL);
		this.$rootScope.$emit('userloggedin', {});
	}


	isSignedIn () {
		if (user.token) {
			return true;
		}
		return false;
	}

	getFullName () {
		return user.fullName;
	}

	getEmail () {
		return user.primaryEmail;
	}

		getMobile () {
		return user.primaryMobile;
	}

	getAddresses () {
		return user.brandUserAddresses?user.brandUserAddresses.slice(0):[];
	}

	logout () {
		return this.Http.sendRequest('/users/current/logout', 'POST')
			.then(() => {
				// let tempSession = user.session;
				Object.keys(user).forEach(function(key) { delete user[key]; });
				this.$rootScope.$emit('userloggedout', {});
				this.toastr.success(this.STRINGS.LOGOUT_SUCCESSFUL);
				return Promise.resolve();
			});
	}


	login (username, password) {
		return this.Http.sendRequest('/users/login', 'POST', {
			username: username,
			password: password
		})
			.then((result) => {
				result = result.result;
				this.setCurrentUser(result);
				return Promise.resolve(true);
			})
			.catch(() => {
				return Promise.reject(false);
			});
	}
	register (newUser,countryId,addressPayload) {
		newUser.countryCode = this.Brand.getCountryCode();
		return this.Http.sendRequest('/users/register', 'POST',{newUser,countryId,addressPayload})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				let errorMessage = error.data.error;
				if ((typeof errorMessage) != 'string') {
					errorMessage = 'Something went wrong';
				}
				return Promise.reject(errorMessage);
			});
	}

	submitOtp (otp) {
		return this.Http.sendRequest('/users/submitOtp', 'POST', {
			otp: otp
		})
			.then((result) => {
				result = result.result;
				this.setCurrentUser(result);
				return Promise.resolve(true);
			})
			.catch((error) => {
				error = error.data;
				let errorMessage = error.error.error.message;
				if ((typeof errorMessage) != 'string') {
					errorMessage = 'Something went wrong';
				}
				return Promise.reject(errorMessage);
			});
	}

	resendOtp () {
		/**
		 * TODO: Complete
		 */
		this.Http.sendRequest('/users/resendOtp', 'POST');
	}

	sendOtpToMobile (primaryMobile, otpPurpose) {
		return this.Http.sendRequest('/users/sendOtpToMobile', 'POST', {
			primaryMobile: primaryMobile,
			otpPurpose: otpPurpose
		})
			.then(() => {
				return Promise.resolve(true);
			})
			.catch((error) => {
				let errorMessage = error.error;
				if ((typeof errorMessage) != 'string') {
					errorMessage = 'Something went wrong';
				}
				return Promise.reject(errorMessage);
			});
	}

	changePasswordWithOtp (primaryMobile, otp, password) {
		return this.Http.sendRequest('/users/changePasswordWithOtp', 'POST', {
			primaryMobile: primaryMobile,
			otp: otp,
			password: password
		})
			.then((result) => {
				result = result.result;
				this.setCurrentUser(result);
				return Promise.resolve(true);
			})
			.catch((error) => {
				let errorMessage = error.error;
				if ((typeof errorMessage) != 'string') {
					errorMessage = 'Something went wrong';
				}
				return Promise.reject(errorMessage);
			});
	}

	updateDetails () {
		return this.Http.sendRequest('/users/current', 'PUT', {
			user: user
		})
			.then((response) => {
				Object.assign(user, response);
			})
			.catch(error => {return error;});
	}


	getAddressFromUserName(userName,brandId) {
		return this.Http.sendRequest(`/users/getUserFromUserName/${brandId}?userName=`+userName, 'GET')
			.then((response) => {
				return response;
			})
			.catch(error => {return error;});
	}


	addAddress (brandUserId,countryId,address) {
		// address.showLoader = false;
        let reqObj = {brandUserId:brandUserId,countryId:countryId,address: address};
        
		return this.Http.sendRequest('/users/current/address', 'POST', reqObj)
			.then((address) => {
				// user.brandUserAddresses.push(address);
				return address;
			})
			.catch((error) => {
				return error;
			});
	}

	editAddress (address) {
		address.showLoader = false;
		return this.Http.sendRequest(`/users/current/address/${address.addressId}`, 'PUT', {address: address})
			.then((addressResult) => {
				return addressResult;
			})
			.catch((error) => {
				return error;
			});
	}

	deleteAddress (addressId) {
		return this.Http.sendRequest(`/users/current/address/${addressId}`, 'DELETE')
			.then(() => {
				// TODO validate
				return addressId;
			})
			.catch((error) => {
				return error;
			});
	}
}


export default UserService;
