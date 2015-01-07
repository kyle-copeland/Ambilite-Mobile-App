angular.module('starter.services', [])
//TO-DO Handle Rooms with no lights
.factory('Lights', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var lights = [{
    id: 0,
    name: 'Blue Lagoon',
    roomID: 0,
	power: false
  }, {
    id: 1,
    name: 'Red Lava Lamp',
    roomID: 0,
	power: true
  }, {
    id: 2,
    name: 'Green Lantern',
    roomID: 1,
	power: false
  }, {
	id: 3,
	name: 'Invader Zim',
	roomID: 2,
	power: true
  }];

  return {
    all: function() {
		return lights;
    },
    switchLight: function(lightID) {
		for(var i = 0; i < lights.length; ++i)//for each light
		{
			if(lightID === lights[i].id)
				lights[i].power = !lights[i].power;
		}
    },
    getRoom: function(roomID) {
		var roomlights = [];
		for (var i = 0; i < lights.length; i++) {
			if (lights[i].roomID === parseInt(roomID)) {
			  roomlights.push(lights[i]);
			}
		}
		return roomlights;
    }
  }
})
.factory('Rooms', ['Lights',function(Lights) {
	var rooms = [{
		id:0,
		name:"Lanvi's Room",
		
	},
	{
		id:1,
		name:"Deanna's Room",
	},
	{
		id:2,
		name:"Cat's Room"
	},
	{
		id:3,
		name:"Kyle's Room"
	},
	{
		id:4,
		name:"Mark's Room"
	}];
	
	var lights = Lights.all();
	return {
		all: function() {
			return rooms;
		},
		get: function(roomID) {
			for(var i = 0; i < rooms.length; i++)
			{
				if(rooms[i].id === parseInt(roomID))
					return rooms[i];
			}
		},
		setRoomPower: function(roomID,roomPower) {
			//console.log(roomID,roomPower);
			for(var i = 0; i < lights.length; ++i)
			{
				if(lights[i].roomID === parseInt(roomID))
				{
					lights[i].power = roomPower;
					console.log(lights[i].power);
				}
			}
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
.factory('Moods', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var moods = [{
    id: 0,
    name: "Din din"
  }, {
    id: 1,
    name: 'Party Time',
  }, {
    id: 2,
    name: 'Afternoon Yoga',
  }];


  return {
    all: function() {
      return moods;
    }
  }
})
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
