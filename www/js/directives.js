angular.module('starter.directives', [])
.directive('light', function() {
	return {
		restrict: 'E',
		scope: {
			"light":"="
		},
		templateUrl:"www/templates/light-partial.html"
	};
})
.directive('timePicker',function() {
	return {
		restrict: "E",
		scope: {
			"time":"="
		},
		link: function(scope) {
			scope.getRange = function(num) {
				return new Array(num)
			}
		
		},
		templateUrl:"www/templates/time-picker-partial.html"
	
	};

});