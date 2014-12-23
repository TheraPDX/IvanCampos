  Meteor.startup(function () {

  });

  Template.reddit.helpers({
    reddit: function () {
      return Reddit.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('reddit');
