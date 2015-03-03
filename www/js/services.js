angular.module('starter.services', [])
//TO-DO Handle Rooms with no lights
.factory('Lights',['$http', function($http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
		return $http.get('api/getAllLights/-1');
    },
    get: function(lightID) {
		return $http.get('/api/getLight/' +lightID);
	},
    save: function(light) {
		console.log(light.brightness, parseInt(light.brightness));
		light.brightness = parseInt(light.brightness);
		$http.post('/api/saveLight/', {light:light});
	}
  }
}])
.factory('Rooms', ['Lights','$http', function(Lights,$http) {

	return {
		all: function() {
			return $http.get('api/getRooms/');
		},
		get: function(roomID) {
			return $http.get('api/getAllLights/'+roomID);
		},
		setRoomPower: function(roomID,roomPower) {
			console.log(roomID,roomPower);
			$http.post("/api/rooms/switchPower/"+roomID, {power:roomPower});
		},
		getRoomPower:  function(roomID) {
			var powerOn = false;
			for(var i = 0; i < lights.length; ++i)
			{
				if(lights[i].roomID === parseInt(roomID) && lights[i].power)
				{
					powerOn = true;
					return powerOn;
				}
			}
			return powerOn;
		}
	}
}])

/**
 * A simple example service that returns some data.
 */
.factory('Moods', ['$http','$q', function($http,$q) {
  
  var currMood = {id:null,lights:{}};

  return {
    all: function() {
      return $http.get('/api/getAllMoods/');
    },
	remove: function(mood) {
		$http.post("/api/removeMood/"+mood.id);
	},
	reset: function() {
		console.log("RESET");
		currMood = {id:null};
	},
	get: function(id) {
		var deferred = $q.defer();
		if(currMood.id === null && id == "")
		{
			$http.get('/api/getAllMoods/').success(function(moods){
				var maxID = -1;
				for(var i = 0; i < moods.moods.length; i++)
				{
					maxID = Math.max(maxID,moods.moods[i].id);
				}
				currMood = {id:maxID+1,lights:{}};
				console.log(currMood);
				deferred.resolve(currMood);
			});
		}
		else if(id != "" && currMood.id != parseInt(id))
		{
			$http.get('/api/getMood/'+id).success(function (mood) {
				currMood = mood.mood;
				console.log(currMood);
				deferred.resolve(currMood);
			});	
		}
		else
		{
			deferred.resolve(currMood);
		}
		return deferred.promise;
	},
	setName: function(name,id) {
		currMood.name = name;
	},
	save: function() {
		//remove lights that are off
		console.log("SAVE",currMood.lights, currMood.lights.length);
		for(light in currMood.lights)
		{
			console.log(light);
			if(!currMood.lights[light].power)
				delete currMood.lights[lights];
		
			if(currMood.lights[light].color == undefined)
			{
				currMood.lights[light].color = {red:255,green:0,blue:0};
			}
		}
		console.log(currMood);
		$http.post("/api/saveMood/", {mood:currMood});
	},
	activate: function(moodID) {
		console.log(moodID);
		$http.post("/api/activateMood/"+moodID);
	}
  }
}])
.factory('ClassPicker', function() {
	return {
		getClass: function(id) {
			var index = parseInt(id) % 7 ;
			switch(index) {
				case 0:
					return "positive";
				case 1:
					return "calm";
				case 2:
					return "balanced";
				case 3:
					return "energized";
				case 4:
					return "assertive";
				case 5:
					return "royal";
				case 6:
					return "dark";	
				}
		}
	}

});
