if (Meteor.isClient) {
	
	Template.icicleChart.rendered = function(){
		
		//Width and height
		var width = 350,
		height = 380,
		radius = 102,
		w=350,
		h=380,
		x_range = d3.scale.linear().range([0, width]),
		y_range = d3.scale.linear().range([0, height]),	
		padding = 0,
		duration = 750;
				
		var color = d3.scale.ordinal()
		.range(["#E3F2FD","#BBDEFB","#90CAF9","#64B5F6","#42A5F5","#2196F3"]);
				
		//Create SVG element
		var vis = d3.select("#icicleChart")
    .attr("viewBox", "0 0 350 390")
    .attr("preserveAspectRatio", "xMinYMin meet")
		.attr("width", width)
		.attr("height", height);
			
		Deps.autorun(function(){
			var partition = d3.layout.partition()
			.value(function(d) { return d.size; });
				
			d3.json("data/icicle.json", function(json) {
					var data = partition(json);
				    var rect = vis.selectAll("rect").data(data).enter()
				     .append("svg:rect")
				     .attr("x", function(d) { return x_range(d.x); })
				     .attr("y", function(d) { return y_range(d.y); })
				     .attr("width", function(d) { return x_range(d.dx); })
				     .attr("height", function(d) { return y_range(d.dy); })
				     .attr("fill", function(d) {
						if (d.x==0 && d.y==0){
							return "#00B0FF";
						}
						else {
						return color(d.name);
						}
					})
				     .style("cursor", "pointer")
				     .on("click", click);
     
				    var fo = vis.selectAll("foreignObject").data(data).enter()
				     .append("svg:foreignObject")
				     .attr("x", function(d) { return x_range(d.x); })
				     .attr("y", function(d) { return y_range(d.y); })
				     .attr("width", function(d) { return x_range(d.dx); })
				     .attr("height", function(d) { return y_range(d.dy); })
				     .style("cursor", "pointer")
                     .style("font-weight","300")
				     .text(function(d) { return d.name + unassigned(d.size) })
					 .on("click", click);

					 function click(d) {
					         x_range.domain([d.x, d.x + d.dx]);
					         y_range.domain([d.y, 1]).range([d.y ? 20 : 0, h]);

					         rect.transition()
					             .duration(750)
					             .attr("x", function(d) { return x_range(d.x); })
					             .attr("y", function(d) { return y_range(d.y); })
					             .attr("width", function(d) { return x_range(d.x + d.dx) - x_range(d.x); })
					             .attr("height", function(d) { return y_range(d.y + d.dy) - y_range(d.y); });

					         fo.transition()
					             .duration(750)
					             .attr("x", function(d) { return x_range(d.x); })
					             .attr("y", function(d) { return y_range(d.y); })
					             .attr("width", function(d) { return x_range(d.x + d.dx) - x_range(d.x); })
					             .attr("height", function(d) { return y_range(d.y + d.dy) - y_range(d.y); });


					    }
						
						function unassigned(size){
							if (size == undefined){
								return "";
							} else {
							return " ("+size+"%)";
							}
						}


			});	
		});
	}		
	
}		