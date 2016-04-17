  Meteor.startup(function () {
    Meteor.call('getTechStocks');
 });

  Meteor.methods({
      'getTechStocks':function(){
		  //console.log("Tech Stocks Called");
          TechStocks.remove({});
          var jsonURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL,AMBA,AMZN,BABA,FB,GOOG,GOOGL,MBLY,NFLX,PANW,PYPL,TSLA,TWTR,YHOO%22)%0A%09%09&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.query.results.quote.length; i<len; i++){
               var currentQuote = respJson.query.results.quote[i];
               TechStocks.insert({
                 symbol:currentQuote.Symbol,
                 name: currentQuote.Name,
                 ask: currentQuote.AskRealtime,
				 ask_static: currentQuote.Ask,
                 change: currentQuote.Change,
                 change_pct: currentQuote.PercentChange,
                 fifty_day: currentQuote.FiftydayMovingAverage,
                 fifty_day_pct: currentQuote.ChangeFromFiftydayMovingAverage,
                 shorts: currentQuote.ShortRatio,
                 target_price: currentQuote.OneyrTargetPrice,
                 volume: currentQuote.Volume,
                 high: currentQuote.YearHigh,
                 low: currentQuote.YearLow,
  				 fifty_day_ma: currentQuote.FiftydayMovingAverage,
  				 two_hundred_day_ma: currentQuote.TwoHundreddayMovingAverage,
  				 pe: currentQuote.PERatio,
  				 short: currentQuote.ShortRatio,
  				 one_yr_target: currentQuote.OneyrTargetPrice,
  				 div_yield: currentQuote.DividendYield,
  				 pct_from_1yr_low: currentQuote.PercentChangeFromYearLow,
  				 pct_from_1yr_high: currentQuote.PercebtChangeFromYearHigh,
  				 ebitda: currentQuote.EBITDA,
  				 eps: currentQuote.EarningsShare,
  				 div_date: currentQuote.DividendPayDate,
  				 year_high: currentQuote.YearHigh,
  				 year_high: currentQuote.YearLow,
  				 volume: currentQuote.Volume,
  				 avg_volume: currentQuote.AverageDailyVolume,  
				 market_capitalization: currentQuote.MarketCapitalization
               });
           }
      }
  });

  Meteor.publish('techstocks', function() {
      return TechStocks.find({},{sort: {change_pct: 1}});
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
