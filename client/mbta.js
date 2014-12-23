  Meteor.startup(function () {

  });

  Template.wellington.helpers({
    wellington: function () {
      return Wellington.find({});
    }
  });

  Template.chinatown.helpers({
    chinatown: function () {
      return Chinatown.find({});
    }
  });

  Template.downtowncrossing.helpers({
    downtowncrossing: function () {
      return DowntownCrossing.find({});
    }
  });

  Meteor.subscribe('wellington');
  Meteor.subscribe('chinatown');
  Meteor.subscribe('downtownCrossing');

  UI.registerHelper("formatTime", function(datetime) {
    return new moment(datetime,'X').format('h:mm A');
  });

  UI.registerHelper("fromNow", function(datetime) {
    return new moment(datetime,'X').fromNow();
  });
