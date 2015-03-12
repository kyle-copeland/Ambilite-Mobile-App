 function LightEffect(color,brightness) {
		this.color = color || {red:255,green:0,blue:100};
		this.brightness = brightness || 100;
 }
 
 function Time() {
	this.timeSet = false;
	this.hour = 0;
	this.minute = 0;
	this.roomID = -1;
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
			var time = new Date();
			console.log("ASDASD");
			console.log(time.getSeconds(),time.getMilliseconds());
			$http.post("/api/rooms/switchPower/"+roomID, {power:roomPower});
		}
	}
}])

/**
 * A simple example service that returns some data.
 */
.factory('Moods', ['$http','$q', function($http,$q) {
  
  var currMood = {id:null,time:new Time(),lights:[new LightEffect()]};
  var moods;
  return {
    all: function() {
		var deferred = $q.defer();
		if(moods === undefined)
		{
			$http.get('/api/getAllMoods/').success(function(data) {
				moods = data.moods;
				deferred.resolve(moods);
			});
			
		}
		else
		{
			deferred.resolve(moods);
		}
      return deferred.promise;
    },
	remove: function(mood) {
		$http.post("/api/removeMood/"+mood.id);
	},
	reset: function() {
		console.log("RESET");
		currMood = {id:null,time:new Time(),lights:[new LightEffect()]};
	},
	get: function(id) {
		var deferred = $q.defer();
		console.log("GET");
		if(currMood.id === null && id == "")
		{
			console.log("RESET GET");
			$http.get('/api/getAllMoods/').success(function(moods){
				var maxID = -1;
				for(var i = 0; i < moods.moods.length; i++)
				{
					maxID = Math.max(maxID,moods.moods[i].id);
				}
				currMood = {id:maxID+1,time:new Time(),lights:[new LightEffect()]};
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
		console.log("Save",currMood)
		$http.post("/api/saveMood/", {mood:currMood});
		var exists = false;
		for(var i =0; i < moods.length; i++)
		{
			if(moods[i].id == currMood.id)
				exists = true;
		}
		if(!exists)
			moods.push(currMood);
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
