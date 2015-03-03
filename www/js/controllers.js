angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, $ionicHistory, Moods) {
	Moods.all().success(function (moods) {
		$scope.moods = moods.moods;
	});
	$scope.showDelete = false;
	$scope.toggleShowDelete = function() {$scope.showDelete = !$scope.showDelete}
	$scope.onMoodDelete = function(index,mood) {
		if(!mood.noDelete)
		{
			$scope.moods.splice(index,1);
			Moods.remove(mood);
		}
	}
	$scope.activate = Moods.activate;
})
.controller('MoodsEditCtrl', function($scope, $stateParams,Moods) {
	Moods.get($stateParams.moodID).then(function(mood) {
		$scope.mood= mood;
	});
	
})
.controller('MoodsAddCtrl', function($scope,$stateParams,Moods) {
	$scope.title = $stateParams.moodID === "" ? "Add Mood" : "Edit Mood";
	if($stateParams.moodID === '')
		Moods.reset();
	Moods.get($stateParams.moodID).then(function(mood) {
		$scope.mood= mood;
		console.log($scope.mood);
	});
	
	$scope.saveMood = function() {
		console.log("ASD");
		Moods.setName(document.getElementById("mood-name").value,$scope.mood.id);
		Moods.save();
	}
	$scope.showTimeForm = false;
	$scope.date = new Date();
})
.controller('MoodsAddLightsCtrl', function($scope, $stateParams,Moods,Rooms,Lights,ClassPicker) {
	$scope.moodID = $stateParams.moodID;
	Lights.all().success(function(lights) {
		Moods.get($stateParams.moodID).then(function(mood) {
			$scope.mood = mood;
			$scope.lights = _.groupBy(lights.lights,'roomID');
		});
	});
	
	$scope.setLights = function() {
		Moods.save();
	}
	
	$scope.getCheckboxClass = function(roomID) {
		return "checkbox-"+ClassPicker.getClass(roomID);
	};
})
.controller('MoodsAddEffectsCtrl', function($scope,$stateParams,Moods,Lights,ClassPicker) {
	$scope.moodID = $stateParams.moodID;
	Moods.get($stateParams.moodID).then (function (mood) {
		$scope.mood = mood;
		$scope.lights = $scope.mood.lights;
		
	});
	
	$scope.saveMood = function() {
		Moods.save();
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


