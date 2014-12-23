  Meteor.startup(function () {

  });

  Template.nfl.helpers({
    nfl: function () {
      return Nfl.find({});
    }
  });

  Meteor.subscribe('nfl');
