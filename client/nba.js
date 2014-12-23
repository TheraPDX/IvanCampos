  Meteor.startup(function () {

  });

  Template.nba.helpers({
    nba: function () {
      return Nba.find({},{sort: {win_pct: -1}});
    }
  });

  Meteor.subscribe('nba');
