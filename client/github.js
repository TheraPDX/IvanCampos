  Meteor.startup(function () {

  });

  Template.github.helpers({
    github: function () {
      return Github.find({},{sort: {stars: -1}});
    }
  });

  Meteor.subscribe('github');
