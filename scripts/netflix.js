if (Meteor.isClient) {
   
  Meteor.startup(function () {
    //Meteor.call('getFlix');
  });
  
  Template.nflx.helpers({
    flix: function () {
      return Netflix.find({},{ limit : 5 });
    }
  });
  
  Meteor.subscribe('netflix');

}

Netflix = new Meteor.Collection('netflix');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    
 });
    
  Meteor.publish('netflix', function() {
      return Netflix.find({},{ limit : 5 });
  });
  
  Meteor.methods({
    'getFlix': function(){
      Netflix.remove({});
      getRSS('http://dvd.netflix.com/Top100RSS');
    }
  });
   
}

function getRSS(feedURL){
    var FeedParser = Meteor.require('feedparser'), request = Meteor.require('request');
        var req = request(feedURL), feedparser = new FeedParser();
        var Fiber = Npm.require( "fibers" );
  
        req.on('error', function (error) {
          // handle any request errors
        });
    
        req.on('response', function (res) {
          var stream = this;
          if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
          stream.pipe(feedparser);
        });

        feedparser.on('error', function(error) {
          // always handle errors
        });
        feedparser.on('readable', function() {
          // This is where the action is!
          var stream = this, meta = this.meta, item;

          while (item = stream.read()) {
            Fiber( function(){
              Netflix.insert({
                title: item.title
              });
              Fiber.yield();
            }).run();
          }      
        });
  }