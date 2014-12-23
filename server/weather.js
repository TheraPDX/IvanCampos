  Meteor.startup(function () {
    Meteor.call('getWeather');
 });

  Meteor.methods({
      'getWeather':function(){
		  //console.log("Weather Called");
          Weather.remove({});
          var jsonURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2448930%0A&format=json&diagnostics=true';
          var respJson = jsonCall(jsonURL);
	  	   Weather.insert({
			   wind: respJson.query.results.channel.wind,
			   condition: respJson.query.results.channel.item.condition,
			   forecast: respJson.query.results.channel.item.forecast
		   });
      }
  });

  Meteor.publish('weather', function() {
      return Weather.find({});
  });

  function jsonCall(jsonURL){
    var result = Meteor.http.get(jsonURL, {timeout:30000});
  			if(result.statusCode==200) {
  				var respJson = JSON.parse(result.content);
  				return respJson;
  			} else {
          console.log("ERROR: " + jsonURL);
        }
  }
