  Meteor.startup(function () {
    Meteor.call('getNba');
 });

  Meteor.methods({
      'getNba':function(){
        //console.log("NBA Called");
          Nba.remove({});
          var jsonURL = 'http://stats.nba.com/stats/leaguedashteamstats?Season=2014-15&SeasonType=Regular+Season&LeagueID=00&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Outcome=&Location=&Month=0&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=0&VsConference=&VsDivision=&GameSegment=&Period=0&LastNGames=0&GameScope=&PlayerExperience=&PlayerPosition=&StarterBench=';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.resultSets[0].rowSet.length; i<len; i++){
            //console.log(respJson.resultSets[0].rowSet[i]);

            Nba.insert({
              team: respJson.resultSets[0].rowSet[i][1],
              wins: respJson.resultSets[0].rowSet[i][3],
              losses: respJson.resultSets[0].rowSet[i][4],
              win_pct: respJson.resultSets[0].rowSet[i][5]
            });

          }
      }
  });

  Meteor.publish('nba', function() {
    return Nba.find({},{sort: {win_pct: -1}});
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
