angular.module('starter.directives', [])
.directive('light', function() {
	return {
		restrict: 'E',
		scope: {
			"light":"="
		},
		templateUrl:"www/templates/light-partial.html"
	};
});