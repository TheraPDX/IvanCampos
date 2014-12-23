  Meteor.startup(function () {

  });

  Template.techmeme.helpers({
    techmeme: function () {
      return Techmeme.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('techmeme');
