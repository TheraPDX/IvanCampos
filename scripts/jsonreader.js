if (Meteor.isClient) {
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    /*
        var jsonArray = ['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL,ATVI,BABA,BAC,GOOG,GOOGL,TSLA,YHOO%22)%0A%09%09&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                        'https://api.stocktwits.com/api/2/trending/symbols.json',
                        'https://blockchain.info/ticker',
                        'http://www.nfl.com/liveupdate/scores/scores.json',
                        'http://www.nfl.com/liveupdate/scorestrip/ss.json',
                        'https://hn.algolia.com/api/v1/search?query=future&tags=story',
                        'https://itunes.apple.com/search?term=kanye&limit=200&media=music&entity=album',
                        'http://stats.nba.com/stats/leaguedashteamstats?Season=2014-15&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench='];
        
        for (var i=0; i<jsonArray.length; i++){
          getJSON(jsonArray[i]);
        }
        */
  });
  
}

function getJSON(jsonURL){
  var respJson = jsonCall(jsonURL);
   if (jsonURL.indexOf("blockchain") > -1){      
      //console.log("Bitcoin Price is: $" + JSON.stringify(respJson.USD["15m"]));
   } else if (jsonURL.indexOf("stocktwits") > -1) {
     console.log("Initial Stocktwits Trend: " + respJson.symbols[0].title + " ("+respJson.symbols[0].symbol+")");
   } else if(jsonURL.indexOf("scores.json") > -1) {
     console.log(JSON.stringify(respJson["2014111300"].stadium));
   } else if(jsonURL.indexOf("ss.json") > -1) {
     console.log(JSON.stringify(respJson.gms[0].hnn));
   } else if(jsonURL.indexOf("hn") > -1) {
     console.log(JSON.stringify(respJson.hits[0].title));
   } else if(jsonURL.indexOf("yql") > -1) {
     for (var i=0; i<respJson.query.results.quote.length; i++){
       var currentQuote = respJson.query.results.quote[i];
       /*
       console.log(JSON.stringify(currentQuote.Symbol));
       console.log(JSON.stringify(currentQuote.Name));
       console.log(JSON.stringify(currentQuote.AskRealtime));
       console.log(JSON.stringify(currentQuote.Change));                 
       console.log(JSON.stringify(currentQuote.PercentChange));
       console.log(JSON.stringify(currentQuote.FiftydayMovingAverage));
console.log(JSON.stringify(respJson.query.results.quote[i].ChangeFromFiftydayMovingAverage));
console.log(JSON.stringify(respJson.query.results.quote[i].ShortRatio));
console.log(JSON.stringify(respJson.query.results.quote[i].OneyrTargetPrice));
       console.log(JSON.stringify(respJson.query.results.quote[i].Volume));   
       console.log(JSON.stringify(respJson.query.results.quote[i].YearHigh));
       console.log(JSON.stringify(respJson.query.results.quote[i].YearLow));
       */
     }
   } else if(jsonURL.indexOf("itunes") > -1) {
     console.log(JSON.stringify(respJson.results[0].artistName));
   } else if(jsonURL.indexOf("nba") > -1) {
     console.log(JSON.stringify(respJson.resultSets[0].rowSet[5][1] + " (" + respJson.resultSets[0].rowSet[5][3] + "-" + respJson.resultSets[0].rowSet[5][4]+")"));
   } else {
     console.log("NOT MAPPED :: " + jsonURL);
   }
}

function jsonCall(jsonURL){
  var result = Meteor.http.get(jsonURL, {timeout:3000});
			if(result.statusCode==200) {
				var respJson = JSON.parse(result.content);
        //console.log("Bitcoin Price is: $" + JSON.stringify(respJson.USD["15m"]));
				return respJson;
			} else {
        console.log("ERROR: " + jsonURL);
      }
}