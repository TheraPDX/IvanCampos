  Meteor.startup(function () {

  });

  Template.stocks.helpers({
    stocks: function () {
      return Stocks.find({},{sort: {change_pct: 1}});
    }
  });

  Meteor.subscribe('stocks');

  UI.registerHelper("isPositive", function(change) {
    if (change.indexOf("+") == -1){
      return false;
    } else {
      return true;
    }
  });
