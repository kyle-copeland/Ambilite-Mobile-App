angular.module('color-slider',[]).directive('colorSlider', function() {
	var RED = 1;
	var GREEN = 0;
	var BLUE = 2;
	return {
		restrict: 'E',
		scope: {
			color: "="
		},
		link: function(scope) {
			scope.colorScaleMax = 359;
			scope.colorScale = 0;
			scope.calcRGB = function() {
				var colorChanges = 6;
				var bucket = scope.colorScale*colorChanges/ scope.colorScaleMax;
				var index = Math.floor(bucket);
				var scale = bucket-index;
				var value = Math.floor(255*scale);
				if(index % 2 == 1)
					value = 255 - value;
				//suppress numbers under threshhold
				if(value < 5)
					value = 0;
				else if(value > 250)
					value = 255;
				switch(index % 3)
				{
					case RED:
						scope.color.red = value;
						break;
					case BLUE:
						scope.color.blue = value;
						break;
					case GREEN:
						scope.color.green = value;
						break;
				}
			}
		},
		templateUrl: 'templates/color-slider.html'
	};
});