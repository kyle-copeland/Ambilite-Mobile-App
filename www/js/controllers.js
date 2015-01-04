angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, Moods) {
	$scope.moods = Moods.all();
})

.controller('LightsCtrl', function($scope, Lights) {
  $scope.lights = Lights.all();
})
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

