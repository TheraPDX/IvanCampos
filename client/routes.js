  Meteor.startup(function () {
    // code to run on server at startup
    Router.map( function () {
      this.route('home', {path: '/'});
      this.route('sports');
      this.route('about');
      this.route('finance');
      this.route('news');
  	  this.route('famous');
  	  this.route('code');
  	  this.route('projects');
      this.route('transportation');
		});
  });
