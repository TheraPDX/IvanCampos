  Meteor.startup(function () {

  });

  Template.weather.helpers({
    weather: function () {
      return Weather.find({});
    }
  });

  Meteor.subscribe('weather');
