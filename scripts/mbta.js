if (Meteor.isClient) {
   
  Meteor.startup(function () {
	
  });
  
  Template.mbta.helpers({
    mbta: function () {
      return Mbta.find({});
    }
  });
  
  Meteor.subscribe('mbta');
  
  UI.registerHelper("formatTime", function(datetime) {
    return new moment(datetime,'X').format('h:mm A');
  });
  
  UI.registerHelper("fromNow", function(datetime) {
    return new moment(datetime,'X').fromNow();
  });

}

Mbta = new Meteor.Collection('mbta');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    Meteor.call('getWellington');
 });
  
  Meteor.methods({
      'getWellington':function(){
		  //console.log("Get Wellington");
      Mbta.remove({});
		  var jsonURL = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key='+mbta_api_key+'&stop=place-welln&format=json';
		  var respJson = jsonCall(jsonURL);
      
	          Mbta.insert({
	            southboundtrips:respJson.mode[0].route[0].direction[0].trip,
	            northboundtrips:respJson.mode[0].route[0].direction[1].trip,
	            alerts:respJson.alert_headers
	          });
 
      }
  });
  
  Meteor.publish('mbta', function() {
      return Mbta.find();
  });
  
  function jsonCall(jsonURL){
    var result = Meteor.http.get(jsonURL, {timeout:3000});
  			if(result.statusCode==200) {
  				var respJson = JSON.parse(result.content);
          return respJson;
  			} else {
          console.log("ERROR: " + jsonURL);
        }
  }
  
}