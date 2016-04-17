/*
  Meteor.startup(function () {
    //Meteor.call('getAltcoinPrices');
 });

  Meteor.methods({
      'getAltcoinPrices':function(){
		  //console.log("Altcoin Called");
          Altcoin.remove({});
		  var respURL = 'http://coinmarketcap-nexuist.rhcloud.com/api/all';
		  var respJson = jsonCall(respURL);
		  Altcoin.insert({Stellar:{
			symbol:respJson.Stellar.symbol.toUpperCase(),
            position:respJson.Stellar.position,
			market_cap: respJson.Stellar.market_cap.usd,
			price: respJson.Stellar.price.usd,
			supply: respJson.Stellar.supply,
			volume: respJson.Stellar.volume.usd,
			change: respJson.Stellar.change,
			timestamp: respJson.Stellar.timestamp
          }});
		  Altcoin.insert({Ripple:{
			symbol:respJson.Ripple.symbol.toUpperCase(),
            position:respJson.Ripple.position,
			market_cap: respJson.Ripple.market_cap.usd,
			price: respJson.Ripple.price.usd,
			supply: respJson.Ripple.supply,
			volume: respJson.Ripple.volume.usd,
			change: respJson.Ripple.change,
			timestamp: respJson.Ripple.timestamp
          }});
		  Altcoin.insert({Litecoin:{
			symbol:respJson.Litecoin.symbol.toUpperCase(),
            position:respJson.Litecoin.position,
			market_cap: respJson.Litecoin.market_cap.usd,
			price: respJson.Litecoin.price.usd,
			supply: respJson.Litecoin.supply,
			volume: respJson.Litecoin.volume.usd,
			change: respJson.Litecoin.change,
			timestamp: respJson.Litecoin.timestamp
          }});
		  Altcoin.insert({Dogecoin:{
			symbol:respJson.Dogecoin.symbol.toUpperCase(),
            position:respJson.Dogecoin.position,
			market_cap: respJson.Dogecoin.market_cap.usd,
			price: respJson.Dogecoin.price.usd,
			supply: respJson.Dogecoin.supply,
			volume: respJson.Dogecoin.volume.usd,
			change: respJson.Dogecoin.change,
			timestamp: respJson.Dogecoin.timestamp
          }});
      }
  });

  Meteor.publish('altcoin', function() {
      return Altcoin.find({});
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
*/
