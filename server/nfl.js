    Meteor.startup(function () {
    Meteor.call('getNfl');
 });

  Meteor.methods({
      'getNfl':function(){
        //console.log("NFL Called");
          Nfl.remove({});
          var jsonURL = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';
          var respJson = jsonCall(jsonURL);
          for (var i=0, len=respJson.gms.length; i<len; i++){
            //console.log(respJson.gms[i].h + " vs. " + respJson.gms[i].v);

            Nfl.insert({
              day: respJson.gms[i].d,
              time: respJson.gms[i].t,
              visitor: respJson.gms[i].v,
              vname: respJson.gms[i].vnn,
              vscore: respJson.gms[i].vs,
              home: respJson.gms[i].h,
              hname: respJson.gms[i].hnn,
              hscore: respJson.gms[i].hs,
              quarter: respJson.gms[i].q
            });

          }
      }
  });

  Meteor.publish('nfl', function() {
    return Nfl.find({});
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
