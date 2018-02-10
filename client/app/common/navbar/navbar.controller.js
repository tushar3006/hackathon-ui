let _$uibModal;
let _User;
let _Brand;
let _$state;
let _$rootScope;
let _$document;
class NavbarController {
	constructor(User, Brand, $uibModal, STRINGS, $state, $rootScope, $document) {
		'ngInject';
		this.STRINGS = STRINGS;
		_$uibModal = $uibModal;
		_User = User;
		_Brand = Brand;
		_$state = $state;
		_$rootScope = $rootScope;
		_$document = $document;

		$rootScope.$on('userloggedin', () => {
			this.initUser();
		});
	}

	openLoginModal () {
		let modalInstance = _$uibModal.open({
			animation: true,
			backdrop: 'static',
			component: 'authFlow',
			size: 'sm'
		});

		modalInstance.result.then(() => {
			this.initUser();
		}, () => {
				// $log.info('modal-component dismissed at: ' + new Date());
		});
	}

	logout () {
		_User.logout()
			.then(() => {
				this.initUser();
			});
	}

	openUserProfile (tab) {
		_$state.go('profile', {tab: tab});
	}

	openLocation() {
		_$rootScope.$emit('openlocationselector', {});
	}

	$onInit() {
		this.brandLogo = _Brand.getBrandLogo();
		this.brandPhone = _Brand.getBrandPhone();
		this.initUser();
	}

	initUser() {
		this.isSignedIn = _User.isSignedIn();
		if (this.isSignedIn) {
			this.userFullName = _User.getFullName().split(' ')[0];
		}
	}

	textChanged() {
		_$rootScope.$emit('menusearch', this.searchText);
	}

	openSearch() {
		this.showSearch = true;
		_$document.getElementById('navbarSearch').focus();
	}

	closeSearch() {
		this.showSearch = false;
		this.searchText='';
		_$rootScope.$emit('menusearch', this.searchText);
	}
}

export default NavbarController;
