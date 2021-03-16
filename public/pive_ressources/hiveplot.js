
























//Created with pive 0.3.3 - the python interactive visualization environment.
//Visit https://github.com/daboth/pive for more information.

var width = 900;
var height = 500;	
var labelsize = 18;
//var innerRadius	= ;
//var outerRadius = ;
//var viewport = ;

//var datakeys = ;
var div_hook = 'chart';

var url = 'hiveplot.json';
//var threshold = '';
//var filter;

/*if ((width / viewport) < threshold){
	filter = parseInt(threshold * (viewport / width));
};*/


var colors = ['#FF2C00', '#00B945', '#BF4930', '#238B49', '#A61D00', '#00782D', '#FF6140', '#37DC74', '#FF8B73', '#63DC90'];
var tickrotation = -45;

var hashtag = '#';
var hash_div_hook = hashtag.concat(div_hook);








var root_div = document.getElementById(div_hook);


var css_line = '#chart .line { stroke: black; fill: none; stroke-width: 2.5px}\n',
    css_tooltip = '#chart .tooltip {color: white; line-height: 1; padding: 12px; font-weight: italic; font-family: arial; border-radius: 5px;}\n';
    css_axis_path = '#chart .axis path { fill: none; stroke: black; shape-rendering: crispEdges;}\n',
    css_axis_line = '#chart .axis line { stroke: black; shape-rendering: optimizeSpeed;}\n',
    css_path_area = '#chart .path area { fill: blue; }\n';
    css_axis_text = '#chart .axis text {font-family: sans-serif; font-size: 16px }\n',
    css_xlabel_text = '#chart .xlabel {font-family: helvetica; font-size: 18px }\n',
    css_ylabel_text = '#chart .ylabel {font-family: helvetica; font-size: 18px }\n',
    css_x_axis_line = '#chart .x.axis line { stroke: grey; stroke-opacity: 0.25; stroke-width: 2.5px}\n',
    css_y_axis_line = '#chart .y.axis line { stroke: grey; stroke-opacity: 0.25; stroke-width: 2.5px}',
    css_axis = '.axis { stroke: #000; stroke-width:1.5px; }',
    css_node = '.node { stroke:#000; }',
    css_link = '.link { fill: none; stroke-width: 1.5px; , stroke-opacity: 0.8; }',
    css_link_turnedOn = '.link .turnedOn { stroke-width: 3px; }',
    css_link_turnedOff = '.link .turnedOff { stroke-opacity: 0.3, stroke-width: 1px; }',
    css_node_turnedOn = '.node .turnedON { stroke: red; stroke-width: 3px; }';


var css = css_line.concat(css_tooltip).concat(css_axis_path).concat(css_axis_line).concat(css_path_area).concat(css_axis_text)
          .concat(css_xlabel_text).concat(css_ylabel_text).concat(css_x_axis_line).concat(css_y_axis_line).concat(css_axis)
          .concat(css_node).concat(css_link).concat(css_link_turnedOn)
          .concat(css_link_turnedOff).concat(css_node_turnedOn);


var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
root_div.appendChild(style);





d3.json(url, function(error, data){

  if (error) throw error;   // Exceptions handling
    console.log("Data has ended: " + error);

	var innerRadius = 40,
      outerRadius = 240,
      nodes = data,
      links = createLinks(data),
      types = getTypes(data), // TYPE of data for axis.
      range = types.length; // count of TYPE for count of axis.

	var angle = d3.scale.ordinal()
              .domain(d3.range(range + 1))
              .rangePoints([0, 2 * Math.PI]), // angle from axis to axis
    radius = d3.scale.linear()
              .range([innerRadius, outerRadius]), // scale of lines
    color = d3.scale.category10()
              .domain(d3.range(20))
    
  /* SVG - Body  */
	var svg = d3.select(hashtag.concat(div_hook)).append("svg")
				.attr("width", width)							
				.attr("height", height)
				.append("g")
    			.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  /* TOOLTIP - DABOTH */ 
	var tooltip = d3.select(hashtag.concat(div_hook)).append("div")
			    .attr("class", "tooltip")
			    .style("opacity", "0.0")
			    .style("top", 0 + "px");

	/* SVG - all axis, draws in right position */
	svg.selectAll(".axis")
	    .data(d3.range(range))
	  .enter().append("line")
	    .attr("class", "axis")
	    .attr("transform", function(d) { return "rotate(" + degrees(angle(d)) + ")" })
	    .attr("x1", radius.range()[0])
	    .attr("x2", radius.range()[1]);

	/* Draws all links, with their curves, styles and hovers. */
	svg.selectAll(".link")
	    .data(links)
	  .enter().append("path")
	    .attr("class", "link")
	    .attr("d", d3.hive.link()
	      .angle(function(d) { return angle(d.TYPE); })
	      .radius(function(d) { return radius(d.WEIGHT); }))
	    .style("stroke", function(d) { return color(d.source.TYPE); })
	    .on("mouseover", linkMouseover)
	    .on("mouseout", mouseout);

  /* Draws nodes wit their right position, styles and hovers. */
  svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + degrees(angle(getNumberForType(d.TYPE))) + ")"; })
      .attr("cx", function(d) { return radius(d.WEIGHT); })
      .attr("r", 5)
      .style("fill", function(d) { return color(d.TYPE); })
      .on("mouseover", nodeMouseover)
      .on("mouseout", mouseout);

	/* link-hover-stati and changes from on and off. */
	function linkMouseover(d) {
	  svg.selectAll(".link")
	    .classed("turnedOn", function(dl) {
	      return dl === d;
	    })
	    .classed("turnedOff", function(dl) {
	      return !(dl === d);
	    })
	  svg.selectAll(".node")
	    .classed("turnedOn", function(dl) {
	      return dl === d.source || dl === d.target;
	    })
	}

	/* node-hover stati and changes from on and off. */
	function nodeMouseover(d) {
	  svg.selectAll(".link")
	    .classed("turnedOn", function(dl) {
	      return dl.source === d || dl.target === d;
	    })
	    .classed("turnedOff", function(dl) {
	      return !(dl.source === d || dl.target === d)
	    });    
    var tx = d3.mouse(this)[0];
	 	var ty = d3.mouse(this)[1];
	 	var ind;
	 	
	 	for(var i = 0; i < nodes.length; i++) {
      if(nodes[i].ID == d.ID) {
      		ind = i;
        }
    }

	  showTooltip(["ID: " + d.ID, "WEIGHT: " + d.WEIGHT], [tx, ty], ind);

	  d3.select(this)
	    .classed("turnedOn", true);
	}

	/* Clears highlighted nodes or links and sets info and tooltip to default.  */
  function mouseout() {
    svg.selectAll(".turnedOn").classed("turnedOn", false);
    svg.selectAll(".turnedOff").classed("turnedOff", false);
    hideTooltip();
  }

  /* Calculates degrees of radians for drawing axes with appropriate distances. */
  function degrees(radians) {
    return radians / Math.PI * 180 - 90;
  }

  /* Searches the original node per ID and prepares a hive-conform node and target in a link object. Returns the filled link object. */ 
  function findNode(linkID) {
    var n = {};
    for(var i = 0; i < data.length; i++) {
      if(data[i].ID == linkID) {
        /* change id to type, because we have current 3 types for 3 axes. */
        n = {TYPE:getNumberForType(data[i].TYPE), WEIGHT:data[i].WEIGHT};
      }
    }
    return n;
  }

  /* Creates links in a hive-conform way. link = {source[type, weight], target[type, weight]}, returns all possible links in an array. */
  function createLinks() {
    var l = [];
    for(var i = 0; i < data.length; i++)  {
      var lA = data[i].LINKS; // linkarray, nodes can have more than 1 links
      for(var j = 0; j < lA.length; j++) {
        var lID = lA[j],
            trg = findNode(lID),
            src = findNode(data[i].ID);
        l.push({source:src, target:trg});
      }
    }
    return l;
  }

  /* Checks in JSON-data how many types are defined for creating the count of axes and returns array with the types. */
  function getTypes() {
    const s = new Set();
    for(var i = 0; i < data.length; i++) {
      s.add(data[i].TYPE);
    }
    var a = Array.from(s);
    return a;
  }

  /* Converts the types to numbers to achieve the hive-confimity.
  Currently are 5 axes the maximum for all datasets we get. Returns the number according to the type.  */
  function getNumberForType(type) { 
    var t = ['A', 'B', 'C', 'D', 'E'],
        n = t.find(elem => elem == type);
    n = t.indexOf(n) + 1;
    return n
  }


function getColorIndex(y_accessor){
		var colorindex = y_accessor;
	   	var color;

	   	while (colorindex > colors.length - 1) {
	   		colorindex = colorindex - colors.length;

	   	}
	   	
	   	color = colors[colorindex];
	   	return color;
	}  	
  
  
  function hideTooltip(){
  	tooltip.transition()
  	.duration(200)
  	.style("opacity", 0.0)
  	.style("top", 0 + "px");
  }

  function showTooltip(values, position, accessor){
    	//console.log("tooltip")
    	//var keyindex = parseInt(accessor) + 1;
    	
    	tooltip.text(values[1] + ": " + values[0])
    		   .style("left", (position[0] + "px"))
    		   .transition()
    		   .delay(600)
    		   .duration(400)
    		   .style("opacity", 1.0)
    		   .style("position", "absolute")	    		   
    		   .style("background-color", getColorIndex(accessor))
    		   .style("top", (position[1] + "px"));

    }

});