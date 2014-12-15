if (Meteor.isClient) {

  Meteor.startup(function () {

  });

  Template.automatic.helpers({
    automatic: function () {
      return Automatic.find({});
    }
  });

  UI.registerHelper("convertToHours", function(minutes) {
    return (minutes/60).toFixed(2);
  });

  Meteor.subscribe('automatic');

}

Automatic = new Meteor.Collection('automatic');

if (Meteor.isServer){

    Meteor.startup(function () {
       Meteor.call('getAutomatic');
    });

	Meteor.methods({
	getAutomatic: function () {
	   Automatic.remove({});
       var serviceEmail = google_serviceEmail;

       var spreadsheetNames = ['Toyota Prius trips']; //,'Weight Logs','Daily Automatic Summary'
       for (var i=0; i<spreadsheetNames.length; i++) {
            var result = Meteor.call("spreadsheet/fetch2", spreadsheetNames[i], 1, {email: serviceEmail});
             var automatic = [];
             var totalRows = result.info.totalRows;
             console.log("Total Rows: " + totalRows);
             for (var j=totalRows; j>totalRows-1; j--){
               for (var k=1; k<20; k++){
                   console.log(result.rows[j][k]);
                   automatic.push(result.rows[j][k]);
               }
               Automatic.insert({
                 data: automatic
                 /*
                 0{{VehicleName}}
                 1{{TripStartedAt}}
                 2{{TripEndedAt}}
                 3{{TripDistanceMiles}}
                 4{{TripDuration}}
                 5{{AverageMPG}}
                 6{{FuelCostUSD}}
                 7{{FuelVolumeGal}}
                 8{{HardBrakeCount}}
                 9{{HardAccelCount}}
                 10{{DurationOver70MPH}}
                 11{{DurationOver75MPH}}
                 12{{DurationOver80MPH}}
                 13{{TripPathImageMapURL}}
                 14{{StartLocationLon}}
                 15{{StartLocationLat}}
                 16{{StartLocationMapURL}}
                 17{{EndLocationLon}}
                 18{{EndLocationLat}}
                 19{{EndLocationMapURL}}
                 */
               });
               while(automatic.length > 0) {
                 automatic.pop();
               }
             }

       }
	}
    });

  Meteor.publish('automatic', function() {
    return Automatic.find({});
  });
}
