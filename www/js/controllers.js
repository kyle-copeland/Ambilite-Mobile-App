angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, Moods) {
	$scope.moods = Moods.all();
})

.controller('LightsCtrl', function($scope, Lights, Rooms) {
  $scope.lights = Lights.all();
  $scope.rooms = Rooms.all();
  $scope.rooms.power = false; //control power of all rooms
  $scope.switchLights = function() {
	for(var i = 0; i < $scope.rooms.length; i++)
		$scope.rooms[i].power = $scope.rooms.power; //turn on and off al lights
	$scope.rooms.power = !$scope.rooms.power;
  }
})
.controller('RoomCtrl', function($scope, Lights) {
	console.log("ASD");
})
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

