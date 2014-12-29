  Meteor.startup(function () {

  });

  Meteor.subscribe('bmi');

  function drawChart(){

    var labelArray = ["1","2","3","4","5","6","7","8","9","10"];

    var dataArray = [];
    for (var i=0, len=Bmi.find({}).count(); i<len; i++){
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
