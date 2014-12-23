  Meteor.startup(function () {
    Meteor.call('getVice');
 });

  Meteor.methods({
      'getVice':function(){
		      //console.log("Vice called");
          Vice.remove({});
        getViceRSS('http://www.vice.com/rss');
      }
  });

  Meteor.publish('vice', function() {
      return Vice.find({},{sort: {pubDate: -1}, limit: 5});
  });

function getViceRSS(feedURL){
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
              Vice.insert({
                title: item.title,
                pubDate: item.pubDate
              });
              Fiber.yield();
            }).run();
          }
        });
}
