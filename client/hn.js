  Meteor.startup(function () {

  });

  Template.hackernews.helpers({
    hackerNews: function () {
      return HackerNews.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });

  Meteor.subscribe('hackerNews');
