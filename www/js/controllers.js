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

  Rooms.all().success(function (rooms) {
	$scope.rooms = rooms.rooms;
  });

  $scope.power = false; //variable control power of all rooms
  $scope.toggleRooms = function() { //turn on/off all rooms
	for(var i = 0; i < $scope.rooms.length; i++)
		Rooms.setRoomPower($scope.rooms[i].id,$scope.power); 
		$scope.power = !$scope.power;
  }
  
  $scope.toggleRoom = function(index,roomID) {
	Rooms.setRoomPower(roomID,$scope.rooms[index].id,$scope.rooms[index].power);
  }
  
  $scope.getRoomPower = Rooms.getRoomPower;
  
  $scope.getToggleClass = function(roomID) {
	//console.log("toggle-"+ClassPicker.getClass(roomID));
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('RoomCtrl', function($scope, Lights, Rooms,$stateParams,ClassPicker) {
	Rooms.get($stateParams.roomID).success(function (lights) {
		$scope.lights = lights.lights;
	});
	$scope.roomPower = false;
	$scope.toggleLights = function() {
		for(var i = 0; i < $scope.lights.length; i++)
			$scope.lights[i].power = $scope.roomPower;
		Rooms.setRoomPower($stateParams.roomID, $scope.roomPower);
		$scope.roomPower = !$scope.roomPower;
	}
	
	$scope.changePower = function(lightID) {
		Lights.save($scope.lights[lightID]);
	};
  $scope.getToggleClass = function(roomID) {
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('EditLightCtrl', function(Lights,$scope,$stateParams) {
	Lights.get($stateParams.lightID).success(function(light) {
		$scope.light = light.light;
	});
	
	
	$scope.saveLight = function() {
		Lights.save($scope.light);
	}
});


