angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, $ionicHistory, Moods) {
	$scope.moods = Moods.all();
	$scope.showDelete = false;
	$scope.toggleShowDelete = function() {$scope.showDelete = !$scope.showDelete}
	$scope.onMoodDelete = Moods.remove;
})
.controller('MoodsEditCtrl', function($scope, $stateParams,Moods) {
	$scope.mood = Moods.get($stateParams.moodID);

})
.controller('MoodsAddCtrl', function($scope,$stateParams,Moods) {
	$scope.title = $stateParams.moodID === "" ? "Add Mood" : "Edit Mood";
	$scope.mood = Moods.get($stateParams.moodID);
	$scope.addMood = function() {
		Moods.createNew(document.getElementById("mood-name").value);
	}
	$scope.saveMood = function() {
		Moods.setName(document.getElementById("mood-name").value,$scope.mood.id);
	}
	$scope.showTimeForm = false;
	$scope.date = new Date();
})
.controller('MoodsAddLightsCtrl', function($scope, $stateParams,Moods,Rooms,Lights,ClassPicker) {
	$scope.rooms = Rooms.all();
	$scope.getRoom = Lights.getRoom;
	$scope.selected = {};
	if($stateParams.moodID != "")
	{
		$scope.lights = Moods.get($stateParams.moodID).lights;
		for(var i = 0; i < $scope.lights.length ;i++)
		{
			$scope.selected[$scope.lights[i].id] = true;
		}
	}
	$scope.setLights = function() {
		var lights = [];
		for(id in $scope.selected)
		{
			if($scope.selected[id])
				lights.push({id:id})
		}
		Moods.setLights(lights);
	}
	$scope.getCheckboxClass = function(roomID) {
	return "checkbox-"+ClassPicker.getClass(roomID);
  }
})
.controller('MoodsAddEffectsCtrl', function($scope,$stateParams,Moods,Lights,ClassPicker) {
	$scope.mood = Moods.get($stateParams.moodID);
	
	if($scope.mood == null)
	{
		$scope.lights = Moods.getLights();
		$scope.saveMood = Moods.save();
	}
	else
	{
		$scope.lights = $scope.mood.lights;
		
		$scope.saveMood = function() {
			Moods.setLights($scope.lights);
			Moods.save();
			console.log(Moods.get($stateParams.moodID));
		}
	}
	
	
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
.controller('EditLightCtrl', function($scope) {
	$scope.light = { 
		id: 0,
		power:true,
		name:"Kyle is so cool",
		brightness: 0,
		color: {red:0,green:0,blue:0}
	};
	
	$scope.saveLight = function() {
		console.log("Light Saved");
	}
});


