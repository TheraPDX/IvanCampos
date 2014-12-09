if (Meteor.isClient) {

  Meteor.startup(function () {

  });

  Template.activity.helpers({
    activity: function () {
      return Activity.find({});
    }
  });

  UI.registerHelper("convertToHours", function(minutes) {
    return (minutes/60).toFixed(2);
  });

  Meteor.subscribe('activity');

}

Activity = new Meteor.Collection('activity');

if (Meteor.isServer){

    Meteor.startup(function () {
       Meteor.call('getActivity');
    });

	Meteor.methods({
	getActivity: function () {
	   Activity.remove({});
       var serviceEmail = google_serviceEmail;

       var spreadsheetNames = ['FitbitSummary']; //,'Weight Logs','Daily Activity Summary'
       for (var i=0; i<spreadsheetNames.length; i++) {
            var result = Meteor.call("spreadsheet/fetch2", spreadsheetNames[i], 1, {email: serviceEmail});
             var activity = [];
             var totalRows = result.info.totalRows;
             for (var j=totalRows; j>totalRows-3; j--){
               //if (j > 92){
                 for (var k=1; k<13; k++){
                   //console.log(result.rows[1][k]+": "+result.rows[j][k]);
                   activity.push(result.rows[j][k]);
                 }
                 //console.log(activity);
                 Activity.insert({
                   data: activity
                 });
                 while(activity.length > 0) {
                   activity.pop();
                 }
              //}
             }

       }
	}
    });

  Meteor.publish('activity', function() {
    return Activity.find({});
  });
}
