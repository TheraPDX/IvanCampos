if (Meteor.isClient) {
    //look into trying http://techmeme.com/mini as well
}

if (Meteor.isServer) {
  
  //http://digg.com/rss/top.rss
  //vice, cnn, etc... 
 
  Meteor.startup(function () {
    /*
        var rssArray = ['http://www.techmeme.com/feed.xml',
                       'http://www.reddit.com/r/technology.rss',
                       'http://www.reddit.com/r/programming.rss',
                       'http://www.reddit.com/r/software.rss',
                       'http://www.reddit.com/r/startups.rss',
                       'http://www.reddit.com/r/tech.rss',
                       'http://news.ycombinator.com/rss',
                       'http://bits.blogs.nytimes.com/feed/',
                       'http://feeds.gawker.com/valleywag/full',
                       'http://daringfireball.net/index.xml',
                       'http://feeds2.feedburner.com/thenextweb',
                       'http://feeds.arstechnica.com/arstechnica/index/',
                       'http://feeds.feedburner.com/Techcrunch',
                       'http://www.theverge.com/rss/full.xml',
                        'http://dvd.netflix.com/Top100RSS'];
        
        for (var i=0; i<rssArray.length; i++){
          getRSS(rssArray[i]);
        }
    */
  });
   
}
/*
function getRSS(feedURL){
    var FeedParser = Meteor.require('feedparser'), request = Meteor.require('request');
        var req = request(feedURL), feedparser = new FeedParser();

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
            if (item.title.indexOf("The") > -1){
              console.log(feedURL + " - " + item.title + ": " + item.link);
            }
          }
        });
  }
*/