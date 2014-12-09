if (Meteor.isClient) {
   
  Meteor.startup(function () {
    
  });
  
  Template.hackernews.helpers({
    hackerNews: function () {
      return HackerNews.find({},{sort: {pubDate: -1}, limit: 5});
    }
  });
  
  Meteor.subscribe('hackerNews');

}

HackerNews = new Meteor.Collection('hackerNews');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    Meteor.call('getHackerNews');
 });
  
  //https://news.ycombinator.com/rss
  
  Meteor.methods({
      'getHackerNews':function(){
		      //console.log("Hacker News called");
          HackerNews.remove({});
        getHackerNewsRSS('http://feeds.feedburner.com/newsyc100');
      }
  });
  
  Meteor.publish('hackerNews', function() {
      return HackerNews.find({},{sort: {pubDate: -1}, limit: 5});
  });
    
}

function getHackerNewsRSS(feedURL){
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
              //console.log(item.title);
              HackerNews.insert({
                title: item.title,
                pubDate: item.pubDate
              });
              Fiber.yield();
            }).run();
          }      
        });
}