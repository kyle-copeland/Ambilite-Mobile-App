angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, $ionicHistory, Moods) {
	$scope.moods = Moods.all();
	$scope.showDelete = false;
	$scope.toggleShowDelete = function() {$scope.showDelete = !$scope.showDelete}
	$scope.onMoodDelete = Moods.remove;
})
.controller('MoodsAddCtrl', function($scope) {
	$scope.showTimeForm = false;
	$scope.date = new Date();
})
.controller('MoodsAddLightsCtrl', function($scope,Lights,Rooms,ClassPicker) {
	$scope.rooms = Rooms.all();
	$scope.getRoom = Lights.getRoom;
	$scope.getCheckboxClass = function(roomID) {
	return "checkbox-"+ClassPicker.getClass(roomID);
  }
})
.controller('MoodsAddEffectsCtrl', function($scope,Lights,ClassPicker) {
	$scope.lights = Lights.all();
	$scope.getToggleClass = function(roomID) {
	return "range-"+ClassPicker.getClass(roomID);
  }
})
.controller('LightsCtrl', function($scope, Lights, Rooms, ClassPicker) {
  $scope.lights = Lights.all();
  $scope.rooms = Rooms.all();

  $scope.rooms.power = false; //variable control power of all rooms
  $scope.toggleRooms = function() { //turn on/off all rooms
	for(var i = 0; i < $scope.rooms.length; i++)
		Rooms.setRoomPower($scope.rooms[i].id,$scope.rooms.power); 
		$scope.rooms.power = !$scope.rooms.power;
  }
  
  $scope.toggleRoom = function(index,roomID) {
	console.log(roomID,!Rooms.getRoomPower(roomID));
	Rooms.setRoomPower(roomID,!Rooms.getRoomPower(roomID));
	console.log(Lights.all());
  }
  
  $scope.getRoomPower = Rooms.getRoomPower;
  
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
		Rooms.setRoomPower($stateParams.roomID,$scope.room.power);
		$scope.room.power = !$scope.room.power;
		console.log($scope.room);
	}
  $scope.getToggleClass = function(roomID) {
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

