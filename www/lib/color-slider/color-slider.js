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
			scope.colorScale = 50;
			scope.lumScale = 50;
			//From http://en.wikipedia.org/wiki/HSL_and_HSV
			scope.calcRGB = function() {
				console.log(scope.lumScale);
				var L = scope.lumScale/100;
				var S = 1;
				var C = (1-Math.abs(2*L -1))*S;
				var H = scope.colorScale/60;
				var X = C*(1-Math.abs(H%2-1));
				if(H == undefined){
					scope.color.red = 0; scope.color.blue = 0; scope.color.green = 0;
				}
				else if(0 <= H && H < 1){
					scope.color.red = C; scope.color.blue = X; scope.color.green = 0;
				}
				else if(1 <= H && H < 2){
					scope.color.red = X; scope.color.blue = C; scope.color.green = 0;
				}
				else if(2 <= H && H < 3){
					scope.color.red = 0; scope.color.blue = C; scope.color.green = X;
				}
				else if(3 <= H && H < 4){
					scope.color.red = 0; scope.color.blue = X; scope.color.green = C;
				}
				else if(4 <= H && H < 5){
					scope.color.red = X; scope.color.blue = 0; scope.color.green = C;
				}
				else if(5 <= H && H < 6){
					scope.color.red = C; scope.color.blue =0; scope.color.green = X;
				}
				var m = L - 1/2*C;
				
				scope.color.red = Math.round((scope.color.red + m)*255); 
				scope.color.blue = Math.round((scope.color.blue + m)*255);
				scope.color.green = Math.round((scope.color.green + m)*255);
				
				
				
			}
			scope.$watch('color', function(oldValue,newValue) {
				if(oldValue !== undefined)
				{
					scope.initScales(oldValue);
				}
			});
			//Taken from http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
			scope.initScales = function(rgb) {
				var r = rgb.red/255; var b = rgb.blue/255; var g = rgb.green/255;
				var	min = Math.min(r,g,b);
				var	max = Math.max(r,g,b);
				var l = (min + max)/2;
				var delta = max-min;
				var h = 0;
			
				if( r == max )
					h = (r - b) / delta;		// between yellow & magenta
				else if( g == max )
					h = 2 + ( b - r ) / delta;	// between cyan & yellow
				else
					h = 4 + ( r - g) / delta;	// between magenta & cyan
				h *= 60;				// degrees
				if( h < 0 )
					h += 360;
				scope.colorScale = Math.round(360-h);
				scope.lumScale = 100*l;
				console.log(h,scope.lumScale);
			
			}
			scope.getColor = function() {
				return {'background-color':'rgb('+scope.color.red+','+scope.color.green+','+scope.color.blue+')'
			};
			scope.getHue = function() {
				var hue = scope.colorScale/60;
				return {'background':' linear-gradient(left, hsl('+hue+', 100%, 0%),hsl('+hue+', 100%, 20%),hsl('+hue+', 100%, 40%),hsl('+hue+', 100%, 60%),hsl('+hue+', 100%, 80%),hsl('+hue+', 100%, 100%))'};
			};
	}	
			
		},
		templateUrl: 'www/templates/color-slider.html'
	};
});