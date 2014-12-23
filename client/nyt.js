  Meteor.startup(function () {

  });

  Template.nyt.helpers({
    nyt: function () {
      return Nyt.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('nyt');
