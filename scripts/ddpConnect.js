/*
if (Meteor.isServer){
  Meteor.startup(function () {
      console.log("DDP Start");
      var remote = DDP.connect('http://demo2.telescopeapp.org/');
      Items = new Meteor.Collection('postsList ', remote); 

      remote.subscribe('postsList ', function() {
        var posts = Posts.find({});
        console.log("Posts: " + postsList.count);         
      });
      console.log("DDP End");
  });  
}
*/