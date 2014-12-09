if (Meteor.isClient) {
	var Genetics = new Meteor.Collection(null);
	
	if(Genetics.find({}).count() === 0){
		//console.log("Loading 23andMe...");
	}
	
	Template.geneticChart.rendered = function(){
		
		//Width and height
		var width = 225,
		height = 225,
		radius = 102,
		x = d3.scale.linear().range([0, 2.5 * Math.PI]),
		y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
		padding = 0,
		duration = 750;
				
		var color = d3.scale.ordinal()
		.range(["gray","blue","yellow","orange","purple","green","gold"]);
		/*
		var div = d3.select("#geneticsChart");
		div.select("img").remove();
		*/
		//Create SVG element
		var vis = d3.select("#geneticChart")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");
		
		Deps.autorun(function(){
			
			/*
			var partition = d3.layout.partition()
			    .sort(null)
			    .value(function(d) { return 1; });

			var arc = d3.svg.arc()
			    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
			    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
			    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
			    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
				
			// Keep track of the node that is currently being displayed as the root.
			var node;
					
			d3.json("data/23andMe.json", function(error, root) {
				 var path = svg.datum(root).selectAll("path")
				 .data(partition.nodes)
				 .enter().append("path")
				 .attr("d", arc)
				 .style("fill", function(d) { 
					 return color((d.children ? d : d.parent).name); 
				 })
				 .on("click", click)
      		   	 .each(stash);
				 
				 d3.selectAll("input").on("change", function change() {
				     var value = this.value === "count"
				         ? function() { return 1; }
				         : function(d) { return d.size; };

				     path
				        .data(partition.value(value).nodes)
				       	.transition()
				        .duration(1000)
				        .attrTween("d", arcTweenData);
				 });

				 function click(d) {
				     node = d;
				     path.transition()
				       .duration(1000)
				       .attrTween("d", arcTweenZoom(d));
				 }
			});	 	
			
			d3.select(self.frameElement).style("height", height + "px");
		
			// Setup for switching data: stash the old values for transition.
			function stash(d) {
			  d.x0 = d.x;
			  d.dx0 = d.dx;
			}
			
			// When switching data: interpolate the arcs in data space.
			function arcTweenData(a, i) {
			  var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
			  function tween(t) {
			    var b = oi(t);
			    a.x0 = b.x;
			    a.dx0 = b.dx;
			    return arc(b);
			  }
			  if (i == 0) {
			   // If we are on the first arc, adjust the x domain to match the root node
			   // at the current zoom level. (We only need to do this once.)
			    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
			    return function(t) {
			      x.domain(xd(t));
			      return tween(t);
			    };
			  } else {
			    return tween;
			  }
			}
		
			// When zooming: interpolate the scales.
		
			function arcTweenZoom(d) {
			  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			      yd = d3.interpolate(y.domain(), [d.y, 1]),
			      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
			  return function(d, i) {
			    return i
			        ? function(t) { return arc(d); }
			        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
			  };
			}
			*/
			
			var partition = d3.layout.partition()
			    .sort(null)
			    .value(function(d) { return 5.8 - d.depth; });

			var arc = d3.svg.arc()
			    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
			    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
			    .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
			    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

			d3.json("data/wheel.json", function(error, json) {
			  var nodes = partition.nodes({children: json});

			  var path = vis.selectAll("path").data(nodes);
			  path.enter().append("path")
			      .attr("id", function(d, i) { return "path-" + i; })
			      .attr("d", arc)
			      .attr("fill-rule", "evenodd")
			      .style("fill", colour)
			      .on("click", click);

			  var text = vis.selectAll("text").data(nodes);
			  var textEnter = text.enter().append("text")
			      .style("fill-opacity", 1)
			      .style("fill", function(d) {
			        return d3.rgb(colour(d)) < 125 ? "#eee" : "#000";
			      })
			      .attr("text-anchor", function(d) {
			        return (d.x + d.dx / 2) > Math.PI ? "end" : "start";
			      })
			      .attr("dy", ".2em")
			      .attr("transform", function(d) {
			        var multiline = (d.name || "").split(" ").length > 1,
			            angle = (d.x + d.dx / 2) * 180 / Math.PI - 90,
			            rotate = angle + (multiline ? -.5 : 0);
			        return "rotate(" + rotate + ")translate(" + ((d.y+10)) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
			      })
			      .on("click", click);
			  textEnter.append("tspan")
			      .attr("x", 0)
			      .text(function(d) { return d.depth ? d.name.split(" ")[0] : ""; });
			  textEnter.append("tspan")
			      .attr("x", 0)
			      .attr("dy", ".2em")
			      .text(function(d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });

			  function click(d) {
			    path.transition()
			      .duration(duration)
			      .attrTween("d", arcTween(d));

			    // Somewhat of a hack as we rely on arcTween updating the scales.
			    text.style("visibility", function(e) {
			          return isParentOf(d, e) ? null : d3.select(this).style("visibility");
			        })
			      .transition()
			        .duration(duration)
			        .attrTween("text-anchor", function(d) {
			          return function() {
			            return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
			          };
			        })
			        .attrTween("transform", function(d) {
			          var multiline = (d.name || "").split(" ").length > 1;
			          return function() {
			            var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
			                rotate = angle + (multiline ? -.5 : 0);
			            return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
			          };
			        })
			        .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
			        .each("end", function(e) {
			          d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
			        });
			  }
			});

			function isParentOf(p, c) {
			  if (p === c) return true;
			  if (p.children) {
			    return p.children.some(function(d) {
			      return isParentOf(d, c);
			    });
			  }
			  return false;
			}

			function colour(d) {
			  if (d.children) {
			    // There is a maximum of two children!
			    var colours = d.children.map(colour),
			        a = d3.hsl(colours[0]),
			        b = d3.hsl(colours[1]);
			    // L*a*b* might be better here...
			    return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
			  }
			  return d.colour || "#fff";
			}

			// Interpolate the scales!
			function arcTween(d) {
			  var my = maxY(d),
			      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			      yd = d3.interpolate(y.domain(), [d.y, my]),
			      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
			  return function(d) {
			    return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
			  };
			}

			function maxY(d) {
			  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
			}
			
			
			/*
			
			
			
			*/
			
		});
		
	};
	
}