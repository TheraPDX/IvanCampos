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
