angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, Moods) {
	$scope.moods = Moods.all();
})

.controller('LightsCtrl', function($scope, Lights, Rooms, ClassPicker) {
  $scope.lights = Lights.all();
  $scope.rooms = Rooms.all();
  console.log($scope.rooms);
  for(var i = 0; i < $scope.rooms.length; ++i)
  {
	$scope.rooms[i].power = Lights.getRoomPower;
	console.log($scope.rooms[i].power($scope.rooms[i].id));
  }
  $scope.rooms.power = false; //variable control power of all rooms
  $scope.switchRooms = function() { //turn on/off all rooms
	for(var i = 0; i < $scope.rooms.length; i++)
		Lights.setRoomPower($scope.rooms[i].id,$scope.rooms.power); 
	$scope.rooms.power = !$scope.rooms.power;
  }
  
  
  $scope.toggleRoom = function(index,roomID) {
	Lights.setRoomPower(roomID,!$scope.rooms[index].power(roomID));
	console.log(Lights.all());
  }
  
  $scope.getToggleClass = function(roomID) {
	//console.log("toggle-"+ClassPicker.getClass(roomID));
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('RoomCtrl', function($scope, Lights, Rooms,$stateParams,ClassPicker) {
	$scope.lights = Lights.getRoom($stateParams.roomID);
	$scope.room = Rooms.get($stateParams.roomID);
	$scope.room.power = false;
	$scope.toggleLights = function() {
	
		Lights.setRoomPower($stateParams.roomID,$scope.room.power);
		$scope.room.power = !$scope.room.power;
	}
  $scope.getToggleClass = function(roomID) {
  console.log("toggle-"+ClassPicker.getClass(roomID));
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

