Tweets = new Mongo.Collection("tweets");
if (Meteor.isClient){
  
  Template.twitterfeed.helpers({
    tweets: function(){
      return Tweets.find({});
    }
  });
  
  Meteor.subscribe('tweets');
  
  UI.registerHelper("fromNowRSS", function(datetime) {
    return new moment(datetime).fromNow();
  });
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {	  
     Meteor.call('getTwitter');
  });
  
  Meteor.publish('tweets', function() {
      return Tweets.find({});
  });
  
  Meteor.methods({
    'getTwitter': function(){
      Tweets.remove({});
      return getTweets();
    }
  });
  /*
  Meteor.setInterval(function () {
    Tweets.remove({});
    getTweets();    
  },  30000);
  */
  var getTweets = function (){
    
      var Twit = Meteor.npmRequire('twit');
      var Twitter = new Twit({
        consumer_key:         twtr_consumer_key,
        consumer_secret:      twtr_consumer_secret,
        access_token:         twtr_access_token, 
        access_token_secret:  twtr_access_token_secret
      });
    
      var Future = Npm.require("fibers/future");
      var fut = new Future();
      var Fiber = Npm.require( "fibers" );
      var d = new Date();
      var m = d.getMonth()+1;
      var day = d.getDate();
      var today = d.getFullYear()+"-"+m+"-"+day;
    var query = 'from:meteorjs OR from:kanyewest OR from:paulg OR from:paultoo OR from:elonmusk OR from:tim_cook OR from:BillGates OR from:thoughtworks OR from:sopmac21379 OR from:ivancampos OR from:jimcramer OR from:befamous OR from:mbostock OR from:reidhoffman OR from:warrenbuffett OR from:btaylor OR from:khoslaventures OR from:bhorowitz OR from:marissamayer OR from:NateSilver538 since:' + today;
    //query = 'meteorjs since:' + today;
        Twitter.get('search/tweets',
            {
              q: query,
                count: 5
            },
            function(err, data, response) {
              if (!err){
                 //console.log("Twitter..." + data.statuses.length + "...." + today);
                      Fiber( function(){
                      for (var i=0, len=data.statuses.length; i<len; i++){  
                        var tweet = data.statuses[i];
                        Tweets.insert({
                            text: tweet.text,
                            from: tweet.user.screen_name,
                            created_at: tweet.created_at
                        });
                      }
                      Fiber.yield();
                      }).run();
                
                fut.return("");
              } else {
                fut.return(err +" - " + response);
              }
            }
        );
      return fut.wait();
   }
}