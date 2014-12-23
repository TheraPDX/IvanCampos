  Meteor.startup(function () {
    Meteor.call('getStocktwits');
 });

  Meteor.methods({
      'getStocktwits':function(){
        //console.log("Stocktwits Called");
          Stocktwits.remove({});
          var jsonURL = 'https://api.stocktwits.com/api/2/trending/symbols.json';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.symbols.length; i<len; i++){
              Stocktwits.insert({
                title: respJson.symbols[i].title,
                symbol: respJson.symbols[i].symbol
              });
          }
      }
  });

  Meteor.publish('stocktwits', function() {
    return Stocktwits.find({},{limit: 16});
  });

  function jsonCall(jsonURL){
    var result = Meteor.http.get(jsonURL, {timeout:3000});
  			if(result.statusCode==200) {
  				var respJson = JSON.parse(result.content);
          //console.log("Initial Stocktwits Trend: " + respJson.symbols[0].title + " ("+respJson.symbols[0].symbol+")");
  				return respJson;
  			} else {
          console.log("ERROR: " + jsonURL);
        }
  }
