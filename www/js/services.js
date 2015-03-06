 function LightEffect(color,brightness) {
		this.color = color || {red:255,green:0,blue:100};
		this.brightness = brightness || 100;
 }
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
		console.log(light);
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
			$http.post("/api/rooms/switchPower/"+roomID, {power:roomPower});
		}
	}
}])

/**
 * A simple example service that returns some data.
 */
.factory('Moods', ['$http','$q', function($http,$q) {
  
  var currMood = {id:null,lights:[new LightEffect()]};

  return {
    all: function() {
      return $http.get('/api/getAllMoods/');
    },
	remove: function(mood) {
		$http.post("/api/removeMood/"+mood.id);
	},
	reset: function() {
		currMood = {id:null,lights:[new LightEffect()]};
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
				currMood = {id:maxID+1,lights:[new LightEffect()]};
				deferred.resolve(currMood);
			});
		}
		else if(id != "" && currMood.id != parseInt(id))
		{
			$http.get('/api/getMood/'+id).success(function (mood) {
				currMood = mood.mood;
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
		$http.post("/api/saveMood/", {mood:currMood});
	},
	activate: function(roomID,moodID) {
		$http.post("/api/activateMood/"+roomID+"/"+moodID);
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
