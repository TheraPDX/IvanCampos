  Meteor.startup(function () {

  });

  Template.cnn.helpers({
    cnn: function () {
      return Cnn.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('cnn');
