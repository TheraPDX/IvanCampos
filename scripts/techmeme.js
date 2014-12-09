if (Meteor.isClient) {
   
  Meteor.startup(function () {
    
  });
  
  Template.techmeme.helpers({
    techmeme: function () {
      return Techmeme.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });
  
  Meteor.subscribe('techmeme');

}

Techmeme = new Meteor.Collection('techmeme');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    Meteor.call('getTechmeme');
 });
  
  Meteor.methods({
      'getTechmeme':function(){
		      //console.log("Techmeme called");
          Techmeme.remove({});
        getTechmemeRSS('http://www.techmeme.com/feed.xml');
      }
  });
  
  Meteor.publish('techmeme', function() {
      return Techmeme.find({},{sort: {pubDate: -1}, limit: 5});
  });    
}

function getTechmemeRSS(feedURL){
    var FeedParser = Meteor.npmRequire('feedparser'), request = Meteor.npmRequire('request');
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
              Techmeme.insert({
                title: item.title.substring(0, item.title.indexOf(" (")),
                pubDate: item.pubDate
              });
              Fiber.yield();
            }).run();
          }      
        });
}