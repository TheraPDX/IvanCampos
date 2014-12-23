  Meteor.startup(function () {

  });

  Template.vice.helpers({
    vice: function () {
      return Vice.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('vice');
