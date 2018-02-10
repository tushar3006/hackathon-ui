let _State;
class AuthController {
	constructor(STRINGS,$state) {
		'ngInject';
		this.STRINGS = STRINGS;
		this.formData = {};
		_State = $state;
	}

	submit(){
		_State.go('insurer');
	}
	
}

export default AuthController;
