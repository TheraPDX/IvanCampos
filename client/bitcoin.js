  Meteor.startup(function () {

  });

  Template.btc.helpers({
    bitcoin: function () {
      return Bitcoin.find({});
    }
  });

  Meteor.subscribe('bitcoin');
