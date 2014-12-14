if (Meteor.isClient) {

  Meteor.startup(function () {

  });

  Template.wellington.helpers({
    wellington: function () {
      return Wellington.find({});
    }
  });

  Template.chinatown.helpers({
    chinatown: function () {
      return Chinatown.find({});
    }
  });

  Template.downtowncrossing.helpers({
    downtowncrossing: function () {
      return DowntownCrossing.find({});
    }
  });

  Meteor.subscribe('wellington');
  Meteor.subscribe('chinatown');
  Meteor.subscribe('downtownCrossing');

  UI.registerHelper("formatTime", function(datetime) {
    return new moment(datetime,'X').format('h:mm A');
  });

  UI.registerHelper("fromNow", function(datetime) {
    return new moment(datetime,'X').fromNow();
  });

}

Wellington = new Meteor.Collection('wellington');
Chinatown = new Meteor.Collection('chinatown');
DowntownCrossing = new Meteor.Collection('downtownCrossing');

if (Meteor.isServer) {

  Meteor.startup(function () {
    Meteor.call('getWellington');
    Meteor.call('getChinatown');
    Meteor.call('getDowntownCrossing');
 });

  Meteor.methods({
      'getWellington':function(){
		  Wellington.remove({});
		  var jsonURL = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key='+mbta_api_key+'&stop=place-welln&format=json';
		  var respJson = jsonCall(jsonURL);

        Wellington.insert({
	            southboundtrips:respJson.mode[0].route[0].direction[0].trip,
	            northboundtrips:respJson.mode[0].route[0].direction[1].trip,
	            alerts:respJson.alert_headers
	          });

      }
  });

  Meteor.methods({
    'getChinatown':function(){
      Chinatown.remove({});
      var jsonURL = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key='+mbta_api_key+'&stop=place-chncl&format=json';
      var respJson = jsonCall(jsonURL);

      Chinatown.insert({
        southboundtrips:respJson.mode[0].route[0].direction[0].trip,
        northboundtrips:respJson.mode[0].route[0].direction[1].trip,
        alerts:respJson.alert_headers
      });

    }
  });

  Meteor.methods({
    'getDowntownCrossing':function(){
      DowntownCrossing.remove({});
      var jsonURL = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key='+mbta_api_key+'&stop=place-dwnxg&format=json';
      var respJson = jsonCall(jsonURL);

      DowntownCrossing.insert({
        southboundtrips:respJson.mode[0].route[0].direction[0].trip,
        northboundtrips:respJson.mode[0].route[0].direction[1].trip,
        alerts:respJson.alert_headers
      });

    }
  });

  Meteor.publish('wellington', function() {
      return Wellington.find();
  });

  Meteor.publish('chinatown', function() {
    return Chinatown.find();
  });

  Meteor.publish('downtownCrossing', function() {
    return DowntownCrossing.find();
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
