    Meteor.startup(function () {
       Meteor.call('getBmi');
    });

	Meteor.methods({
	getBmi: function () {
	   Bmi.remove({});
       var serviceEmail = google_serviceEmail;

       var spreadsheetNames = ['Weight Logs'];
       for (var i=0; i<spreadsheetNames.length; i++) {
            var result = Meteor.call("spreadsheet/fetch2", spreadsheetNames[i], 1, {email: serviceEmail});
             var bmi = [];
             var totalRows = result.info.totalRows;
             for (var j=totalRows; j>totalRows-10; j--){
                bmi.push(result.rows[j][4]);
                Bmi.insert({
                  data: bmi
                });

                while(bmi.length > 0) {
                   bmi.pop();
                }
             }
       }
	}
  });

  Meteor.publish('bmi', function() {
    return Bmi.find({});
  });
