/*
Meteor.startup(function () {

  });

  Meteor.subscribe('bmi');

  function drawChart(){
    var itemCount = Bmi.find({}).count(), labelArray = [], dataArray = [];
    for (var i=itemCount-1; i>=0; i--){
      labelArray.push(i+1);
      dataArray.push(Bmi.find({}).fetch()[i].data);
    }

    var data = {
      labels : labelArray,
      datasets : [{
        fillColor : "rgba(0, 0, 0, 0.2)",
        strokeColor : "rgba(0,190,255,1)",
        pointColor : "rgba(255,255,255,1)",
        pointStrokeColor : "green",
        data : dataArray
      }]
    }

    Chart.defaults.global.responsive = true;

    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#lineChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    new Chart(ctx).Line(data);
  }


  Template.bmi.helpers({
    bmi: function () {
      return Bmi.find({});
    },
    dataReady:function(){
      return Meteor.subscribe('bmi').ready();
    }
  });

  Template.bmichart.rendered = function(){
    drawChart();
  }
*/
