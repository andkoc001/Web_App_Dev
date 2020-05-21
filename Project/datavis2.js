/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
*/
// ////////////////////


// Getting data in form of csv files



// -------------------
// draw chart function - car sales in Ireland
// -------------------


function drawChartSales2() {
  // clear the chart
  eraseChart2()


  // importing csv file with data into d3
  d3.csv("data/new_cars_Ireland.csv")
    // check if it was loaded - in browser's console (localhost:8000)
    .then(function (data) {
      console.log(data);

      // convert strings to numbers
      data.forEach(function (d) {
        d.Sales = Number(d.Sales); // or d.Sales = +d.Sales;
      })


      // Variables for chart bar values
      var myHeight = 450;
      var myWidth = Number(document.getElementById("chartWidth").value); // user selctable
      var dataCount = data.length;
      var gap = 5;
      var barThickness = ((myWidth / dataCount) - gap);
      var leftOffset = 50 + 0.5 * gap; // vertical axis positioning
      var chartColour = document.getElementById("colourPicker").value; // user choice
      var speedFactor = Number(document.getElementById("speed").value); // user selectable


      // --- --- ---
      // mapping categorical values from the csv file

      // declaree a scale for X axis; 
      var xScale = d3.scaleBand()
        .domain(data.map(function (d) {
          return d.Year;
        }))
        .range([0, myWidth + (gap * dataCount)]) // from 0 to (all widths of bars + gaps)


      // declare a scale for Y axis
      var yScale = d3.scaleLinear()
        // source of data - what is written on the axis
        .domain([0, d3.max(data, function (d) {
          return d.Sales;
        })])
        // mapped destination - where the axis is placed
        .range([myHeight, 0]) // note the reveresed order for axes values going from bottom up
        ; // <-- note semicolon here!


      // create X axis
      var xAxis = d3.axisBottom()
        .scale(xScale);

      // create Y axis
      var yAxis = d3.axisLeft()
        .scale(yScale); // <-- semicolon!


      // --- --- ---
      // create a svg container (still inside the curly brackets!)
      var svgContainer = d3.select("#dataVis2").append("svg")
        .attr("height", myHeight + 60) // addition for axes and labels
        .attr("width", (myWidth + 200))
        .attr("transform", "translate(0, 20)"); // offset


      // --- --- ---
      // RECTANGLE BARS

      // generate rectangles for Bar Chart
      // associate variable from imported file - .data(data) - with all rectangles,
      var myRectangle = svgContainer.selectAll('rect').data(data);

      // enter loops - create rectangle for each instance from the data
      myRectangle.enter().append("rect")

        // transition state zero (initial)
        .attr("fill", "#334")
        // function will run and returns i (the index value of the array)
        // d = data, i = index
        .attr("x", function (d, i) {
          return leftOffset + 0.5 * gap + (i * (myWidth / dataCount + gap)); // initial offset (left margin) + width of rectangle (40) + 2 for gap between them
        }) // iteratively create new bars for subsequent years
        .attr("y", myHeight)
        .attr("width", barThickness)

        // transition state one 
        .transition()
        .duration(2000 * speedFactor)
        //.attr("y", 50) // this would produce bars hanging down, from baseline 50px from top
        .attr("y", function (d, i) {
          return yScale(d.Sales) // baseline 300px from top, minus (i.e. going up) the height of the rect
        })
        // without scaling - commented out:    //.attr("height", function (d) {return d.Sales;}) // takes value of Sales from the imported csv; *10 to magnify the result
        // with scaling
        .attr("height", function (d) {
          return myHeight - yScale(d.Sales);
        })
        .attr("fill", chartColour);


      // --- --- ---
      // LABELS 1 - sales

      // add label text for Bar Chart, using values from imported file - .data(data)
      var mylabel = svgContainer.selectAll('text').data(data);

      // enter loops through
      mylabel.enter().append("text")

        // transition state zero (initial)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "1px")
        .attr("fill", chartColour)
        .attr("x", function (d, i) {
          return (leftOffset + 0.5 * gap + 0.5 * barThickness) + (i * (myWidth / dataCount + gap) - 1); // width of rectangle (40) + 2 for gap between them
        }) // iteratively change the horizontal position, the formula developed by trial and error
        .attr("y", 450)

        // transition state one 
        .transition()
        .duration(3000)
        .delay(function (d, i) {
          return 1400 * speedFactor + (0 * 450); // at the same time
        })
        .attr("font-size", "16px")
        .ease(d3.easeCubicInOut) // other, for example, d3.easeCircleIn, d3.easeElasticOut, d3.easeLinear
        // positioning
        .attr("y", function (d) {
          return (d3.max(data, function (d) { return d.Sales; }) * (myHeight / d3.max(data, function (d) { return d.Sales; })) + 20) - d.Sales * (myHeight / d3.max(data, function (d) { return d.Sales; }))  // baseline from top + 20px into the bar, minus (i.e. going up) the height of the rect
        })// max = 580, scale = 350
        // text style
        .attr("fill", "#fd7")
        // text content
        .text(function (d) {
          return d.Sales; // Sales from csv file + unicode degree symbol 
        })

        // transition state one 
        .transition()
        .duration(4000)
        .delay(function (d, i) {
          return 200 + (4000 * speedFactor - (0 * 500));
        })
        .attr("font-size", "10px")
        .attr(d3.easeExpOut); // animation effect


      // --- --- ---
      // LABELS 2 - time periods

      // add label text for Bar Chart, using values from imported file - .data(data)
      //var mylabel = svgContainer.selectAll('text').data(data);

      // enter loops through
      mylabel.enter().append("text")

        // transition state zero (initial)
        .transition()
        .duration(10 * speedFactor)
        .delay(2000)
        // positioning
        .attr("x", function (d, i) {
          return (leftOffset + 0.5 * myWidth / dataCount) + (i * (myWidth / dataCount + gap)); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
        })
        .attr("y", 0.94 * myHeight)
        // text style
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", chartColour)
        // text content
        .text(function (d) {
          return d.Year; // time period from csv file
        })

        // transition state two
        .transition()
        .duration(4000 * speedFactor)
        .delay(function (d, i) {
          return 500 * speedFactor + (200 * speedFactor + (i * 100));
        })
        .ease(d3.easeBounceOut) // animation effect
        // Vertical positioning
        .attr("y", function (d) {
          return (d3.max(data, function (d) { return d.Sales; }) * (myHeight / d3.max(data, function (d) { return d.Sales; })) + 30) - d.Sales * (myHeight / d3.max(data, function (d) { return d.Sales; }))  // baseline from top + 20px into the bar, minus (i.e. going up) the height of the rect
        })
        .attr("fill", "#fd7")

        // transition state three
        .transition()
        .duration(2000)
        .delay(2000 + (1000 * 0.5 * speedFactor))
        .attr("fill", chartColour)
        .attr("font-size", "0px")
        .remove()
        .ease(d3.easeLinear); // animation effect


      // --- --- ---
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


    });

} // end of drawChart function


// erase active chart function
function eraseChart2() {

  // remove svg container (canvas)
  var svgContainer = d3.selectAll("svg").remove();

  var svgContainer = d3.select("#dataVis2").append("svg")
    .attr("width", 400)
    .attr("height", 0);

}





// -------------------
// draw chart function - life satisfaction in EU countries
// -------------------

function drawChartSatisfaction2() {
  // clear the chart
  eraseChart2()


  // importing csv file with data into d3
  d3.csv("data/life_satisfaction.csv")
    // check if it was loaded - in browser's console (localhost:8000)
    .then(function (data) {
      console.log(data);

      // convert strings to numbers
      data.forEach(function (d) {
        d.Satisfaction = Number(d.Satisfaction);
      })


      // Variables for chart bar values
      var myWidth = Number(document.getElementById("chartWidth").value); // user selectable
      var barThickness = 12;
      var dataCount = data.length;
      var gap = 4;
      var topOffset = 12 + 0.5 * gap; // by trial and error
      var myHeight = ((barThickness + gap) * dataCount);
      var chartColour = document.getElementById("colourPicker").value; // user choice
      var speedFactor = Number(document.getElementById("speed").value); // user selectable


      // --- --- ---
      // declare scale for X axis - life satisfation
      var xScale = d3.scaleLinear()
        // source of data - what is written on the axis
        .domain([0, 10]) // in scale 0 to 10 
        // mapped destination - where the axis is placed
        .range([0, myWidth])
        ; // <-- note semicolon here!


      // declaree a scale for Y axis - countries
      // mapping categorical values from the csv file
      var yScale = d3.scaleBand()
        .domain(data.map(function (d) {
          return d.Country;
        }))
        .range([0, (myHeight)]) // from 0 to (all thickness of bar + gap defined by the myHeight variable, above)


      // create X axis
      var xAxis = d3.axisTop()
        .scale(xScale);

      // create Y axis
      var yAxis = d3.axisLeft()
        .scale(yScale); // <-- semicolon!


      // create a svg container (still inside the curly brackets!)
      var svgContainer = d3.select("#dataVis2").append("svg")
        .attr("width", myWidth + 120) // addition for axis label
        .attr("height", myHeight + 100) // addition for axis label
        .attr("transform", "translate(0, 0)"); // offset


      // --- --- ---
      // RECTANGLE BARS

      // associate variable from imported file - .data(data) - with all rectangles,
      var myRectangle = svgContainer.selectAll('rect').data(data);

      // enter loop - create rectangle for each instance from the data
      myRectangle.enter().append("rect")

        // transition state zero (initial)
        .attr("fill", "#334")
        .attr("x", 100) // offset from left, by trial and error
        .attr("y", function (d, i) {
          return ((topOffset + barThickness - 1.5 * gap) + (i * (barThickness + gap)))
        })
        .attr("width", 5)
        .attr("height", barThickness)

        // transition state one 
        .transition()
        .duration(3000 * speedFactor)

        // with scaling
        .attr("width", function (d) {
          return xScale(d.Satisfaction);
        })
        .attr("fill", chartColour)


      // --- --- ---
      // LABELS 1 - satisfaction value

      // add label text for Bar Chart, using values from imported file - .data(data)
      var mylabel = svgContainer.selectAll('text').data(data);

      // enter loops through
      mylabel.enter().append("text")

        // transition state zero (initial)
        .attr("text-anchor", "start")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", chartColour)
        .attr("x", 250)
        .attr("y", function (d, i) {
          return ((topOffset + barThickness + gap) + (i * (barThickness + gap)))
        })

        // transition state one 
        .transition()
        .duration(500)
        .delay(function (d, i) {
          return 4000 + (i * 200 * speedFactor);
        })
        .ease(d3.easeCubicInOut) // d3.easeCircleIn, d3.easeElasticOut, d3.easeLinear
        // positioning
        .attr("x", function (d) {
          return xScale(d.Satisfaction + (1050 / myWidth)); // by trial and error + y-axis offset
        })
        .attr("y", function (d, i) {
          return ((topOffset + barThickness + gap) + (i * (barThickness + gap)))
        })
        // text style
        .attr("fill", "#fd7")
        // text content
        .text(function (d) {
          return d.Satisfaction; // Sales from csv file + unicode degree symbol 
        });


      // --- --- ---
      // LABELS 2 - countries

      // add label text for Bar Chart, using values from imported file - .data(data)
      //var mylabel = svgContainer.selectAll('text').data(data);

      // enter loops through
      mylabel.enter().append("text")

        // transition state zero (initial)
        .transition()
        .delay(2000)
        .duration(0)

        // text style
        .attr("text-anchor", "start")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", chartColour)
        // text content
        .text(function (d) {
          return d.Country; // country names from csv file
        })
        // positioning
        .attr("x", 90)
        .attr("y", -100)


        // transition state one
        .transition()
        .delay(function (d, i) {
          return 2000 + (-i * 150);
        })
        .duration(4000 * speedFactor)
        .ease(d3.easeCubicInOut)
        // positioning
        .attr("y", function (d, i) {
          return ((topOffset + barThickness + gap) + (i * (barThickness + gap)))
        })
        .attr("text-anchor", "end")

        .transition()
        .delay(function (d, i) {
          return (2000 * speedFactor + (i * 150))
        })
        .duration(4000)
        .attr("fill", "#fd7");


      // --- --- ---
      // AXES rendering

      // X - axis - horizontal
      svgContainer.append("g") // 'g' denotes group
        .attr("transform", "translate(100, " + (topOffset + gap) + ")")
        .call(xAxis);

      // Y - axis - vertical
      svgContainer.append("g") // 'g' denotes group
        .attr("transform", "translate(100," + (topOffset + gap) + ")") // note that height is inside quote marks - it is a text that need to be concatinated!
        .call(yAxis)

        // apply the below to all text elements
        .selectAll("text")
        .attr("transform", "rotate(-15)")
        .attr("text-anchor", "end")
        .attr("x", "-150") // out of view
        .attr("y", "-4");

    });


} // end of drawChart function



// ### ### ###
// erase active chart function
function eraseChart2() {

  // remove svg container (canvas)
  var svgContainer = d3.selectAll("svg").remove();

  var svgContainer = d3.select("#dataVis2").append("svg")
    .attr("width", 400)
    .attr("height", 0);
}






// -------------------
// DOM manipulation
// -------------------

// HTML content change for each chart
function drawChartSales() {
  document.getElementById("variousDataH2").innerHTML = "Car sale"
  document.getElementById("variousDataP").innerHTML = "Private car sale in Ireland (source of data: CSO)."
  drawChartSales2()
}

function drawChartSatisfaction() {
  document.getElementById("variousDataH2").innerHTML = "Life Satisfaction"
  document.getElementById("variousDataP").innerHTML = "Overall life satisfaction in EU countries (source of data: Eurostat)."
  drawChartSatisfaction2()
}


// clear the chart
function eraseChart() {
  document.getElementById("variousDataH2").innerHTML = ""
  document.getElementById("variousDataP").innerHTML = ""
  eraseChart2()
}