if (Meteor.isClient) {
var Bars = new Meteor.Collection(null);
Session.setDefault('barChartSort','none');
Session.setDefault('barChartSortModifier',undefined);

if(Bars.find({}).count() === 0){
	for(i = 0; i < Math.floor((Math.random() * 25)+1); i++)
		Bars.insert({
			value:Math.floor((Math.random() * 25)+2)
		});
}
  
Meteor.setInterval(
  function(){
    Bars.remove({});
    for(i = 0; i < Math.floor((Math.random() * 25)+1); i++)
		Bars.insert({
			value:Math.floor((Math.random() * 25)+2)
		});
    
  },
  10000
);  

Template.barChart.rendered = function(){
	//Width and height
	var w = 350;
	var h = 380;
	
  var colorEnter = d3.scale.ordinal().range(["dodgerblue"]);
  var colorTrans = d3.scale.ordinal().range(["#D8DAE7","#050D10","#18CAE6","#34608D","#0D0C1C"]);
  
	var xScale = d3.scale.ordinal()
					.rangeRoundBands([0, w], 0.05);

	var yScale = d3.scale.linear()
					.range([0, h]);
	
	//Define key function, to be used when binding data
	var key = function(d) {
		return d._id;
	};
	
	//Create SVG element
	var svg = d3.select("#barChart")
        .attr("viewBox", "0 0 350 390")
        .attr("preserveAspectRatio", "xMinYMin meet")
				.attr("width", w)
				.attr("height", h);

	Deps.autorun(function(){
		var modifier = {fields:{value:1}};
		var sortModifier = Session.get('barChartSortModifier');
		if(sortModifier && sortModifier.sort)
			modifier.sort = sortModifier.sort;
		
		var dataset = Bars.find({},modifier).fetch();

		//Update scale domains
		xScale.domain(d3.range(dataset.length));
		yScale.domain([0, d3.max(dataset, function(d) { return d.value; })]);

		//Select…
		var bars = svg.selectAll("rect")
			.data(dataset, key);
		
		//Enter…
		bars.enter()
			.append("rect")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) {
				return yScale(d.value);
			})
			.attr("fill", function(d, i) { return colorEnter(i); })
			.attr("data-id", function(d){
				return d._id;
			});

		//Update…
		bars.transition()
			// .delay(function(d, i) {
			// 	return i / dataset.length * 1000;
			// }) // this delay will make transistions sequential instead of paralle
			.duration(500)
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) {
				return yScale(d.value);
			}).attr("fill", function(d, i) { return colorTrans(i); });

		//Exit…
		bars.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.rangeBand())
			.remove();



		//Update all labels

		//Select…
		var labels = svg.selectAll("text")
			.data(dataset, key);
		
		//Enter…
		labels.enter()
			.append("text")
			.text(function(d) {
				return d.value;
			})
			.attr("text-anchor", "middle")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value) + 14;
			})						
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "white");

		//Update…
		labels.transition()
			// .delay(function(d, i) {
			// 	return i / dataset.length * 1000;
			// }) // this delay will make transistions sequential instead of paralle
			.duration(500)
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
			}).attr("y", function(d) {
				return h - yScale(d.value) + 14;
			}).text(function(d) {
				return d.value;
			});

		//Exit…
		labels.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.rangeBand())
			.remove();

	});
};
}  