
angular.module('starter', ['ionic','color-slider','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "www/templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.moods', {
    url: '/moods',
    views: {
      'tab-moods': {
        templateUrl: 'www/templates/tab-moods.html',
        controller: 'MoodsCtrl'
      }
    }
  })
  .state('tab.moods-edit', {
	url: '/moods/edit/:moodID',
	views: {
		'tab-moods': {
			templateUrl : 'www/templates/tab-moods-edit.html',
			controller: 'MoodsEditCtrl'
		}
	
	}
  
  })
  .state('tab.moods-add', {
	url: '/moods/add/:moodID',
	views: {
	  'tab-moods': {
		templateUrl: 'www/templates/tab-moods-add.html',
		controller: 'MoodsAddCtrl'
	  }
	
	}
  
  })
  .state('tab.moods-add-lights', {
	url: '/moods/add/lights/:moodID',
	views: {
	  'tab-moods': {
		templateUrl: 'www/templates/tab-moods-add-lights.html',
		controller:'MoodsAddLightsCtrl'
	  }
	}
  })
  .state('tab.moods-add-effects', {
	url: '/moods/add/effects/:moodID',
	views: {
	  'tab-moods': {
		templateUrl: 'www/templates/tab-moods-add-effects.html',
		controller:'MoodsAddEffectsCtrl'
	  }
	}
  })
  .state('tab.lights', {
      url: '/lights',
      views: {
        'tab-lights': {
          templateUrl: 'www/templates/tab-lights.html',
          controller: 'LightsCtrl'
        }
      }
    })
	.state('tab.lights-room', {
		url:'/lights/:roomID',
		views: {
			'tab-lights': {
				templateUrl: 'www/templates/tab-lights-room.html',
				controller: 'RoomCtrl'
			}
		}
    })
	.state('tab.lights-edit', {
		url:'/lights/:lightID',
		views: {
			'tab-lights': {
				templateUrl: 'www/templates/tab-lights-edit.html',
				controller: 'EditLightCtrl'
			}
		}
	});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/moods');

});
