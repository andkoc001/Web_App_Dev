/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 12 - d3
*/
// ////////////////////


// Getting data in form of an array, assigned to variable 'data';
// source: https://stackoverflow.com/a/21668952
var data = [
  { letter: "A", frequency: .08167 },
  { letter: "B", frequency: .01492 },
  { letter: "C", frequency: .02780 },
  { letter: "D", frequency: .04253 },
  { letter: "E", frequency: .12702 },
  { letter: "F", frequency: .02288 },
  { letter: "G", frequency: .02022 },
  { letter: "H", frequency: .06094 },
  { letter: "I", frequency: .06973 },
  { letter: "J", frequency: .00153 },
  { letter: "K", frequency: .00747 },
  { letter: "L", frequency: .04025 },
  { letter: "M", frequency: .02517 },
  { letter: "N", frequency: .06749 },
  { letter: "O", frequency: .07507 },
  { letter: "P", frequency: .01929 },
  { letter: "Q", frequency: .00098 },
  { letter: "R", frequency: .05987 },
  { letter: "S", frequency: .06333 },
  { letter: "T", frequency: .09056 },
  { letter: "U", frequency: .02758 },
  { letter: "V", frequency: .01037 },
  { letter: "W", frequency: .02465 },
  { letter: "X", frequency: .00150 },
  { letter: "Y", frequency: .01971 },
  { letter: "Z", frequency: .00074 }
];

// importing csv file with data into d3
// d3.csv("file_name.csv")
d3.csv("frequency_data.csv")
  // check if it was loaded - in browser's console (localhost:8000)
  .then(function (data) {
    console.log(data);

    // convert ot numbers
    data.forEach(function (d) {
      d.frequency = Number(d.frequency); // or d.frequency = +d.frequency;
    })


    // Variables for chart bar values
    var myHeight = 350;
    var barWidth = 40;
    var dataCount = data.length;
    var gap = 8;
    var leftOffset = 50 + 0.5 * gap;
    var myWidth = (barWidth + gap) * dataCount;

    /*
        // declaree a scale for X axis
        // mapping categorical values from the csv file
        var xScale = d3.scaleBand()
          .domain(data.map(function (d) {
            return d.letter;
          }))
          .range([0, (myWidth + gap * (dataCount))]) // from 0 to (width of bar + gap)
    
    
        // declare a scale for Y axis
        var yScale = d3.scaleLinear()
          // source of data - what is written on the axis
          .domain([0, d3.max(data, function (d) {
            return d.frequency;
          }) + 0]) //.domain([0, 500])  // <-- a simple case
          // mapped destination - where the axis is placed
          .range([myHeight, 0]) // note the reveresed order for axes values going from bottom up
          ; // <-- note semicolon here!
    
    
        // create X axis
        var xAxis = d3.axisBottom()
          .scale(xScale);
    
        // create Y axis
        var yAxis = d3.axisLeft()
          .scale(yScale); // <-- semicolon!
    
    
        // create a svg container (still inside the curly brackets!)
        var svgContainer = d3.select("#dataViz2").append("svg")
          .attr("height", myHeight + 75)
          .attr("width", myWidth * dataCount)
          .attr("transform", "translate(0, 10)"); // offset
    
    
        // RECTANGLE BARS
    
        // generate rectangles for Bar Chart
        // associate variable from imported file - .data(data) - with all rectangles,
        var myRectangle = svgContainer.selectAll('rect').data(data);
    
    
        // enter loops - create rectangle for each instance from the data
        myRectangle.enter().append("rect")
    
          // transition state zero (initial)
          .attr("fill", "#333")
          // function will run and returns i (the index value of the array)
          // d = data, i = index
          .attr("x", function (d, i) {
            return leftOffset + (i * (myWidth / dataCount + gap)); // initial offset (left margin) + width of rectangle (40) + 2 for gap between them
          })
          .attr("y", myHeight)
          .attr("width", (myWidth / dataCount))
    
          // transition state one 
          .transition()
          .duration(1000)
          //.attr("y", 50) // this would produce bars hanging down, from baseline 50px from top
          .attr("y", function (d, i) {
            return yScale(d.frequency) // baseline 300px from top, minus (i.e. going up) the height of the rect
          })
          // without scaling      //.attr("height", function (d) {return d.frequency;}) // takes value of frequency from the imported csv; *10 to magnify the result
          // with scaling
          .attr("height", function (d) {
            return myHeight - yScale(d.frequency);
          })
          .attr("fill", "steelblue")
    
    
        // LABELS 1 - frequency
    
        // add label text for Bar Chart, using values from imported file - .data(data)
        var mylabel = svgContainer.selectAll('text').data(data);
    
        // enter loops through
        mylabel.enter().append("text")
    
          // transition state zero (initial)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "18px")
          .attr("fill", "steelblue")
          .attr("x", function (d, i) {
            return (leftOffset + 0.5 * myWidth / dataCount) + (i * (myWidth / dataCount + gap)); // width of rectangle (40) + 2 for gap between them
          })
          .attr("y", 350)
    
          // transition state one 
          .transition()
          .duration(2000)
          .delay(function (d, i) {
            return 650 + (i * 25);
          })
          .ease(d3.easeCubicInOut) // d3.easeCircleIn, d3.easeElasticOut, d3.easeLinear
          // positioning
          .attr("y", function (d) {
            return (d3.max(data, function (d) { return d.frequency; }) * (myHeight / d3.max(data, function (d) { return d.frequency; })) + 20) - d.frequency * (myHeight / d3.max(data, function (d) { return d.frequency; }))  // baseline from top + 20px into the bar, minus (i.e. going up) the height of the rect
          })// max = 580, scale = 350
          // text style
          .attr("fill", "white")
          // text content
          .text(function (d) {
            return d.frequency; // frequency from csv file + unicode degree symbol 
          });
    
    
        // LABELS 2 - letters
    
        // add label text for Bar Chart, using values from imported file - .data(data)
        //var mylabel = svgContainer.selectAll('text').data(data);
    
        // enter loops through
        mylabel.enter().append("text")
    
          // transition state zero (initial)
          .transition()
          .duration(0)
          .delay(2500)
          // positioning
          .attr("x", function (d, i) {
            return (leftOffset + 0.5 * myWidth / dataCount) + (i * (myWidth / dataCount + gap)); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
          })
          .attr("y", 0.9 * myHeight)
          // text style
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "8px")
          .attr("fill", "steelblue")
          // text content
          .text(function (d) {
            return d.letter; // letters names from the array
          })
    
          // transition state two
          .transition()
          .duration(2500)
          .delay(function (d, i) {
            return 200 + (i * 250);
          })
          .ease(d3.easeBounceOut)
          // Vertical positioning
          .attr("y", function (d) {
            return (d3.max(data, function (d) { return d.frequency; }) * (myHeight / d3.max(data, function (d) { return d.frequency; })) + 30) - d.frequency * (myHeight / d3.max(data, function (d) { return d.frequency; }))  // baseline from top + 20px into the bar, minus (i.e. going up) the height of the rect
          })
          .attr("fill", "#ccc")
    
          // transition state three
          .transition()
          .duration(4000)
          .delay(1000)
          .attr("fill", "steelblue")
          .ease(d3.easeLinear);
    
    
        // AXES rendering
    
        svgContainer.append("g") // 'g' denotes group
          .attr("transform", "translate(50," + myHeight + ")") // note that height is inside quote marks - it is a text that need to be concatinated!
          .call(xAxis)
          // apply the below to all text elements
          .selectAll("text")
          .attr("transform", "rotate(-60)")
          .attr("text-anchor", "end")
          .attr("x", "-8") // by trial and error
          .attr("y", "8");
    
        svgContainer.append("g") // 'g' denotes group
          .attr("transform", "translate(" + (leftOffset - 0.5 * gap) + ", 0)")
          .call(yAxis);
    */


    var margin = { top: 40, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) {
        return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
      })

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    d3.tsv("data.tsv", type, function (error, data) {
      x.domain(data.map(function (d) { return d.letter; }));
      y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.frequency); })
        .attr("height", function (d) { return height - y(d.frequency); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)


    });