  Meteor.startup(function () {

  });

  Template.techstocks.helpers({
    techstocks: function () {
      return TechStocks.find({},{sort: {change_pct: 1}});
    }
  });

  Meteor.subscribe('techstocks');

  UI.registerHelper("isPositive", function(change) {
    if (change.indexOf("+") == -1){
      return false;
    } else {
      return true;
    }
  });
