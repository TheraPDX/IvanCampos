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
