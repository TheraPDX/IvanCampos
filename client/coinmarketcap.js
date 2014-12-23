  Meteor.startup(function () {

  });

  Template.altcoin.helpers({
    altcoin: function () {
      return Altcoin.find({});
    }
  });

  Meteor.subscribe('altcoin');
