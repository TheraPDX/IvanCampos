if (Meteor.isClient) {
   
  Meteor.startup(function () {
    
  });
  
  Template.btc.helpers({
    bitcoin: function () {
      return Bitcoin.find({});
    }
  });
  
  Meteor.subscribe('bitcoin');

}

Bitcoin = new Meteor.Collection('bitcoin');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    Meteor.call('getBtcPrice');
 });
  
  Meteor.methods({
      'getBtcPrice':function(){
		  //console.log("BTC Called");
          Bitcoin.remove({});
		  var jsonURL = 'https://blockchain.info/ticker';
		  var respJson = jsonCall(jsonURL);
          Bitcoin.insert({
            symbol:respJson.USD["symbol"],
            price:respJson.USD["15m"],
            as_of:moment().format("h:mm A")
          });
      }
  });
  
  Meteor.publish('bitcoin', function() {
      return Bitcoin.find();
  });
  
  function jsonCall(jsonURL){
    var result = Meteor.http.get(jsonURL, {timeout:30000});
  			if(result.statusCode==200) {
  				var respJson = JSON.parse(result.content);
          //console.log("Bitcoin Price is: $" + JSON.stringify(respJson.USD["15m"]));
  				return respJson;
  			} else {
          console.log("ERROR: " + jsonURL);
        }
  }
  
}