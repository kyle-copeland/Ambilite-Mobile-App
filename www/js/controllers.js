angular.module('starter.controllers', [])

.controller('MoodsCtrl', function($scope, $state,$ionicHistory,$ionicPopup, Moods) {
	Moods.all().then(function (moods) {
		$scope.moods = moods;
	});
	$scope.showDelete = false;
	$scope.toggleShowDelete = function() {$scope.showDelete = !$scope.showDelete}
	$scope.onMoodDelete = function(index,mood) {
		if(!mood.noDelete)
		{
			$scope.moods.splice(index,1);
			Moods.remove(mood);
		}
		else
		{
			
			var alertPopup = $ionicPopup.alert({
			 title: 'Permission Denied',
			 template: 'Cannot delete special preset. Shame on you!'
		   });
		   alertPopup.then(function(res) {
				 $state.go('tab.moods');
		   });
		}
	}
})
.controller('MoodsSet', function($scope,$stateParams,Rooms,Moods) {
	console.log($stateParams.moodID);
	Rooms.all().success(function(rooms) {
		$scope.rooms = rooms.rooms;
	});
	
	$scope.activate = function(roomID) {
		Moods.activate(roomID,$stateParams.moodID);
	}
})
.controller('MoodsEditCtrl', function($scope, $stateParams,Moods) {
	Moods.get($stateParams.moodID).then(function(mood) {
		$scope.mood= mood;
	});
	
})
.controller('MoodsAddCtrl', function($scope,$state,$stateParams,$ionicPopup,Moods,Rooms) {
	$scope.title = $stateParams.moodID === "" ? "Add Mood" : "Edit Mood";

	if($stateParams.moodID === '')
		Moods.reset();
	
	$scope.setRoomID = function(roomID) {
		$scope.mood.time.roomID = roomID;
	}
	Rooms.all().success(function(rooms) {
		$scope.rooms = rooms.rooms;
		console.log($scope.rooms);
	});
	Moods.get($stateParams.moodID).then(function(mood) {
		$scope.mood= mood;
	});
	
	
	$scope.saveMood = function() {
		Moods.setName(document.getElementById("mood-name").value,$scope.mood.id);
		Moods.save();
		 // An alert dialog
		if($scope.title == "Edit Mood")
		{
		   var alertPopup = $ionicPopup.alert({
			 title: 'Mood Saved',
			 template: 'Save Successful'
		   });
		   alertPopup.then(function(res) {
			$state.go('tab.moods-edit')
		   });
		}
	}
	$scope.showTimeForm = false;
	$scope.date = new Date();
})
.controller('MoodsAddEffectsCtrl', function($scope,$stateParams,$state,$ionicPopup,Moods,Lights,ClassPicker) {
	$scope.moodID = $stateParams.moodID;
	Moods.get($stateParams.moodID).then (function (mood) {
		$scope.mood = mood;
		$scope.lights = $scope.mood.lights;		
	});
	
	$scope.saveMood = function() {
		Moods.save();
		var alertPopup = $ionicPopup.alert({
		 title: 'Mood Saved',
		 template: 'Save Successful'
	   });
	   alertPopup.then(function(res) {
		if($scope.moodID != "")
		 $state.go('tab.moods-edit');
		 else
		 {
			Moods.reset();
			$state.transitionTo('tab.moods', $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		}
	   });
	}
	$scope.removeLightEffect = function(index) {
		$scope.lights.splice(index,1);
	}
	$scope.addLightEffect = function() {
		$scope.lights.push(new LightEffect(undefined,undefined,undefined));
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
	{
		Rooms.setRoomPower($scope.rooms[i].id,$scope.power); 
		$scope.rooms[i].power = $scope.power;
		
	}
	$scope.power = !$scope.power;
  }
  
  $scope.toggleRoom = function(index,roomID) {
	Rooms.setRoomPower(roomID,$scope.rooms[index].power);
	$scope.time = new Date();
  }
  
  $scope.getRoomPower = Rooms.getRoomPower;
  
  $scope.getToggleClass = function(roomID) {
	//console.log("toggle-"+ClassPicker.getClass(roomID));
	return "toggle-"+ClassPicker.getClass(roomID);
  }
})
.controller('RoomCtrl', function($scope, Lights, Rooms,$stateParams,ClassPicker) {
	Rooms.get($stateParams.roomID).success(function (lights) {
		console.log(lights);
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
		console.log($scope.lights,lightID);
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


