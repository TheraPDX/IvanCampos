  Template.twitterfeed.helpers({
    tweets: function(){
      return Tweets.find({});
    }
  });

  Meteor.subscribe('tweets');

  UI.registerHelper("fromNowRSS", function(datetime) {
    return new moment(datetime).fromNow();
  });
