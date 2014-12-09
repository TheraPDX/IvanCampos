if (Meteor.isClient) {
   
  Meteor.startup(function () {
    
  });
  
  Template.stocks.helpers({
    stocks: function () {
      return Stocks.find({},{sort: {change_pct: 1}});
    }
  });
  
  Meteor.subscribe('stocks');
  
  UI.registerHelper("isPositive", function(change) {
    if (change.indexOf("+") == -1){
      return false;
    } else {
      return true;
    }
  });

}

Stocks = new Meteor.Collection('stocks');

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    Meteor.call('getStocks');
 });
  
  Meteor.methods({
      'getStocks':function(){
		  //console.log("Stocks Called");
          Stocks.remove({});
          var jsonURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL,ATVI,BABA,BAC,GOOG,GOOGL,TSLA,YHOO%22)%0A%09%09&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.query.results.quote.length; i<len; i++){
               var currentQuote = respJson.query.results.quote[i];
               Stocks.insert({
                 symbol:currentQuote.Symbol,
                 name: currentQuote.Name,
                 ask: currentQuote.AskRealtime,
                 change: currentQuote.Change,
                 change_pct: currentQuote.PercentChange,
                 fifty_day: currentQuote.FiftydayMovingAverage,
                 fifty_day_pct: currentQuote.ChangeFromFiftydayMovingAverage,
                 shorts: currentQuote.ShortRatio,
                 target_price: currentQuote.OneyrTargetPrice,
                 volume: currentQuote.Volume,
                 high: currentQuote.YearHigh,
                 low: currentQuote.YearLow
               });
           }
      }
  });
  
  Meteor.publish('stocks', function() {
      return Stocks.find({},{sort: {change_pct: 1}});
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