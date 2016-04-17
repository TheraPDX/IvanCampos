  Meteor.startup(function () {

  });

  Template.techmeme.helpers({
    techmeme: function () {
      return Techmeme.find({},{sort: {pubDate: -1}, limit: 10});
    }
  });

  Meteor.subscribe('techmeme');
