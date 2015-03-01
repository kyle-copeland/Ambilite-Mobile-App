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
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var moods = [{
    id: 0,
    name: "Din din",
	lights: [
		{id:0},
		{id:2}
	
	]
  }, {
    id: 1,
    name: 'Party Time',
	lights: [
		{id:0, color:{red:255,green:0,blue:0}},
		{id:4, color:{red:255,green:0,blue:0}}
	
	]
  }, {
    id: 2,
    name: 'Afternoon Yoga',
	lights: [
		{id:0},
		{id:1}
	
	]
  }];

  var currMood = {id:-1};

  return {
    all: function() {
      return $http.get('/api/getAllMoods/');
    },
	remove: function(mood) {
		moods.splice(moods.indexOf(mood),1);
	},
	get: function(id) {
		var deferred = $q.defer();
		if(currMood.id === undefined || currMood.id !== parseInt(id))
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
	createNew: function(moodName) {
		var max = -1;
		for(var i = 0; i < moods.length; i++)
		{
			if(moods[i].id > max)
				max = moods[i].id;
		}
		currMood = {id:max+1,name: moodName};
	},
	setName: function(name,id) {
		currMood.name = name;
		for(var i = 0; i < moods.length; i++)
		{
			if(moods[i].id === parseInt(id))
				moods[i].name = name;
		}
	},
	setLights: function(lights,id) {
		if(id === undefined)
		{
			currMood.lights = lights;
		}
		console.log(currMood);
	},
	getLights: function() {
		return currMood.lights;
	
	},
	save: function() {
		moods.push(currMood);
		currMood = {};
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
