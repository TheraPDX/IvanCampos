  Meteor.startup(function () {

  });

  Template.stocktwits.helpers({
    stocktwits: function () {
      return Stocktwits.find({},{limit: 16});
    }
  });

  Meteor.subscribe('stocktwits');
