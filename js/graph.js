var graph = $('#graph');
var graphContainer = d3.select("#graph");

var margin = { top: 50, right: 50, bottom: 50, left: 50 };
var width = 500, height = 300;
var graphPosition = {x: undefined, y: undefined};

var closeBoxWidth = 30;

var barFill = ['#5ea3a3','#488b8f'];

updateGraphDim();

function updateGraphDim() {
  // Set the dimensions of the graph
  trueWidth = width + margin.left + margin.right;
  trueHeight = height + margin.top + margin.bottom;

  // resize svg graph containers
  graphContainer
    .attr("width", trueWidth)
    .attr("height", trueHeight);

  graphPosition.x = (innerWidth-trueWidth)/2;
  graphPosition.y = (innerHeight - trueHeight)/2;

  graph.style.left = graphPosition.x + 'px';
  graph.style.top =  graphPosition.y + 'px';
}

function plot(list_index) {
  var dataArr = lists[list_index];

  // clear graph
  d3.selectAll("#graph > *").remove();

  // shift graph according to margins
  var svg = graphContainer.append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // Set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // Define the line
  var valueline = d3.line()
    .x(function (d, i) {
      return x(i+1);
    })
    .y(function (d) { return y(d); });

  // Scale the range of the data
  var d_min = Math.min(...dataArr);
  var d_max = Math.max(...dataArr);
  x.domain([0.5, dataArr.length + 0.5]);
  y.domain([Math.min(d_min, 0), d_max]);

  // plot dataArr
  svg.append("g")
      .attr("fill", barFill[0])
    .selectAll("rect").data(dataArr).enter().append("rect")
      .attr("x", (d, i) => x(i+1) - width/dataArr.length/3)
      .attr("y", d => Math.min(y(d),y(0)))
      .attr("height", d => Math.abs(y(0) - y(d)))
      .attr("width", width/dataArr.length/3*2)

  // Add bar text
  svg.append("g")
    .selectAll("text").data(dataArr).enter().append("text")
      .attr("x", (d, i) => x(i+1))
      .attr("y", d => d>0 ? y(d)-3 : y(d)+13)
      .style("text-anchor", "middle")
      .text(d => d);

  // Add the X Axis
  svg.append("g")
    .style('font-size', '15px')
    .attr("transform", "translate(0," + yAxisLocation() + ")")
    .call(d3.axisBottom(x).ticks(dataArr.length));
  // Add the Y Axis
  svg.append("g")
    .style('font-size', '15px')
    .attr("transform", "translate(" + xAxisLocation() + ",0)")
    .call(d3.axisLeft(y).ticks(10).tickFormat( d => (formatValue(d))));

  // add graph title
  svg.append("text")
    .attr("x", width/2)
    .attr("y", -50)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "28px")
    .style("letter-spacing", "5px")
    .text(graphTitle(list_index));

  // add box to close
  svg.append("rect")
    .attr("x", width+margin.right-closeBoxWidth)
    .attr("y", -margin.top)
    .attr("width", closeBoxWidth)
    .attr("height", closeBoxWidth)
    .attr("fill", "#ffe79a")
    .on('mouseover', function() {
      d3.select(this).transition().duration(100).attr("fill", "#ef5a5a")
    })
    .on('mouseout', function() {
      d3.select(this).transition().duration(100).attr("fill", "#ffe79a")
    })
    .on('click', function() {
      graph.style.display = "none";
    })

  function xAxisLocation() {
    // if (x_min < 0 && dataArr.length > 0) return x(0);
    return 0;
  }

  function yAxisLocation() {
    if (d_min < 0 && d_max > 0) return y(0);
    return height;
  }

  function formatValue(d) {
    toPrecision = d3.format(".2s");
    return toPrecision(d);
  }

  function graphTitle(list_index) {
    var r = numberToLetter(list_index);
    var formula = formulaArr[list_index];
    if (formula !== undefined) {
      r += "=" + formula;
    }
    return r;
  }
}


// drag graph window
var mouseStart = {x: undefined, y: undefined};

graphContainer.call(d3.drag()
  .on("start", function() {
    mouseStart.x = d3.event.x;
    mouseStart.y = d3.event.y;
  })
  .on("drag", function() {
    graph.style.left = d3.event.x - mouseStart.x + graphPosition.x + 'px';
    graph.style.top = d3.event.y - mouseStart.y + graphPosition.y + 'px';
  })
  .on("end", function() {
    graphPosition.x = d3.event.x - mouseStart.x + graphPosition.x;
    graphPosition.y = d3.event.y - mouseStart.y + graphPosition.y;
  }));