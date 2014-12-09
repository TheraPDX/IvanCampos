if (Meteor.isClient) {
  
  Meteor.startup(function () {
   
    // code to run on server at startup
    Router.map( function () {
	  //this.route('coalmine');
      this.route('home', {path: '/'});
      this.route('sports');
      this.route('about');
      this.route('finance');
      this.route('news');
	  this.route('famous');
	  this.route('code');
	  this.route('projects');
		});
    
  });
  
  /*
    $.ajax({
      url: "http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key="+mbta_api_key+"&stop=place-welln&format=json",
      success: function (data){
        var tripCount = data.mode[0].route[0].direction[0].trip.length; 
        var trip0 = data.mode[0].route[0].direction[0].trip[0];
        var trip_name = trip0.trip_name;
        var arr_dt = moment(trip0.sch_arr_dt, "X").format('h:mm:ss A');
        var arr_dt_text = moment(trip0.sch_arr_dt, "X").fromNow();
        var pre_dt = moment(trip0.pre_dt, "X").format('h:mm:ss A');
        var pre_dt_text = moment(trip0.pre_dt, "X").fromNow();
        var trips = data.mode[0].route[0].direction[0].trip;
        
        Session.set("routezero", data.mode[0].route[0].direction[0].trip.length);
        Session.set("stopname", data.stop_name.toUpperCase());
        Session.set("routename", data.mode[0].route[0].route_name);
        var wellington = data.mode[0].route[0].route_name + " should arrive at " + arr_dt + " (" + arr_dt_text + 
            "), but is predicted to arrive at " + pre_dt + " (" + pre_dt_text + " or "+trip0.pre_away+"ms)";
        Session.set("orange", wellington);
        
      }
    });
  */
  /*
  Meteor.setInterval(function(){
  
    var msgArray = ["Look ma, no refresh. Thanks Meteor", 
                    "Pretty D3.js charts",
                   "Font Awesome SVG icons",
                   "Neo, follow the white rabbit",
                   "How is everything going, Ivan?",
                   "The Dolphins just scored a touchdown. They now lead the Patriots, 37 to 0",
                   "Dan Marino is the greatest quarterback of ALL TIME"];
    
    var msg = new SpeechSynthesisUtterance(msgArray[Math.floor(Math.random() * msgArray.length)]);
    window.speechSynthesis.speak(msg);
   },10000);
  */
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
  });
}