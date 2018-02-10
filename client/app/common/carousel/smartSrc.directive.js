'use strict';
let smartSrc = () => {
	return {
		restrict: 'A', //attribute directive
		scope: { //isolate scope
			smartSrc: '@', //smart src
			smartSrcWatch: '&' //$watch hook
		},
		link: function(scope, element) {

			//cache for cleanup
			var unwatcher = scope.$watch(scope.smartSrcWatch, function(newVal) {

				//validate $watch
				if (newVal) {

					//add src
					element.attr('src', scope.smartSrc);

					//cleanup
					unwatcher();
				}
			});
		}
	};
};

export default smartSrc;
