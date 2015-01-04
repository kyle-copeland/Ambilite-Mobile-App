angular.module('starter.services', [])

.factory('Lights', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var lights = [{
    id: 0,
    name: 'Blue Lagoon',
    room: 'Lanvi\'s Room'
  }, {
     id: 1,
    name: 'Red Lava Lamp',
    room: 'Cats\'s Room'
  }, {
   id: 2,
    name: 'Green Lantern',
    room: 'Deanna\'s Room'
  }];

  return {
    all: function() {
      return lights;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

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
});
