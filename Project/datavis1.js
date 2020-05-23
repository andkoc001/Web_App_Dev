/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
*/
// ////////////////////


// Getting data in form of the 'plantes' array below.


// plantes distance, diameter, density, gravity, moons relative to Earth (Earth = 1)
// data extracted from: https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html
var planets = [
  { planet: "Mercury", distance: "0.387", diameter: "0.383", density: "0.984", gravity: "0.378", moons: "0" },
  { planet: "Venus", distance: "0.723", diameter: "0.949", density: "0.951", gravity: "0.907", moons: "0" },
  { planet: "Earth", distance: "1", diameter: "1", density: "1", gravity: "1", moons: "1" },
  { planet: "Mars", distance: "1.52", diameter: "0.532", density: "0.713", gravity: "0.377", moons: "2" },
  { planet: "Jupyter", distance: "5.2", diameter: "11.21", density: "0.240", gravity: "2.36", moons: "79" },
  { planet: "Saturn", distance: "9.58", diameter: "9.45", density: "0.125", gravity: "0.916", moons: "82" },
  { planet: "Uranus", distance: "19.2", diameter: "4.01", density: "0.230", gravity: "0.889", moons: "27" },
  { planet: "Neptune", distance: "30.05", diameter: "3.88", density: "0.297", gravity: "1.12", moons: "14" }
];




// -------------------
// choice of visualisation
// -------------------

// The function reads the value associated with the element ID #planetProperty, and calls corresponding function
function drawChart() {
  var choice = Number(document.getElementById("planetProperty").value);

  if (choice == 1) { drawChartDia(); }
  else if (choice == 2) { drawChartDens(); }
  else if (choice == 3) { drawChartGrav(); }
}




// -------------------
// draw chart function - diameter
// -------------------


function drawChartDia2() {

  // clear the chart by calling the below function
  eraseChart2()

  // create a new svg container (canvas) with hard coded width and height
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);

  var sizeFactor = 10; // the chart elements will be increased in size for better visual effect

  // --- --- ---
  // draw plantes diameter in form of circles
  var circles = svgContainer.selectAll("circle")
    .data(planets);

  circles.enter().append("circle")

    // transition state zero (initial)
    .attr("cx", 200) // horizontally centred
    .attr("cy", -200) // outside the canvas, above
    .attr("r", function (d) {
      return d.diameter * 1;
    })
    .attr("fill", function (d, i) { return "#" + (1 + i) + "" + (1 + i) + "f" }) // each iteration changes the red and green element of the #RGB parameter

    .transition()
    .duration(1500) // in miliseconds
    // iterativelly move the subsequent plantes from the array down to their verical locations  
    .attr("cy", function (d, i) { return 150 + (i * 250); })
    // for better impression, the size is magnified by sizeFactor
    .attr("r", function (d) {
      return d.diameter * sizeFactor;
    })
    // the transition on each iteration has incrementally different duration
    .delay(function (d, i) {
      return 750 - (i * 150);
    })
    .duration(2000)
    .ease(d3.easeBack); // animation effect


  // --- --- ---
  // draw Sun

  var sun = svgContainer.append("ellipse") // ellipse is used here, to differentiate from circle elements, but both axes are equal, maening it is indeed a circle

    // transition state zero (initial)
    .attr("rx", 1) // initially tiny
    .attr("ry", 1)
    .attr("cx", 200) // horizontally centred
    .attr("cy", -1040) // centre is innitially outside the canvas, for animation effect
    .attr("fill", "#fd7")
    .attr("stroke", "#f80")
    .attr("stroke-width", 2)

    // transition state one 
    .transition()
    .attr("rx", 109 * sizeFactor) // Sun diameter is approx. 109 times larger than Earth's
    .attr("ry", 109 * sizeFactor)
    .delay(1000)
    .duration(2000);


  // --- --- ---  
  // draw labels
  var circles = svgContainer.selectAll("text")
    .data(planets); // reads the names and radius values from the array 'plantes'


  // label 'Sun'  
  circles.enter().append("text")
    // transition state zero (initial)
    .text("Sun")
    .attr("x", 186)  // centre the word
    .attr("y", -30) // initially out of the view
    .style("fill", "#334")

    // transition state one 
    .transition()
    .delay(2650)
    .ease(d3.easeCircleOut) // animation effect
    .attr("y", 30);

  // labels - planets names  
  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", -100)
    .attr("y", function (d, i) { return 155 + (i * 250); })
    .text(function (d, i) { return d.planet })

    // transition state one 
    .transition()
    .attr("x", 20)
    .delay(500)
    .duration(1500);


  // labels - radiuses  
  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", 420)
    .attr("y", function (d, i) { return 155 + (i * 250); })
    .text(function (d, i) { return "R = " + d.diameter })

    // transition state one 
    .transition()
    .attr("x", 320)
    .delay(500)
    .duration(1500);

} // end of drawChart function




// -------------------
// draw chart function - density
// -------------------

function drawChartDens2() {

  // clear the chart
  eraseChart2()

  // create a new svg container (canvas)
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);

  // define variables 
  var sizeFactor = 100; // the chart elements will be increased in size for better visual effect
  var waterDensity = 0.1813 // relative to Eearth's density 

  // --- --- ---
  // draw plantes density in form of circles
  var circles = svgContainer.selectAll("circle")
    .data(planets); // get the data from the array 'plantes'

  // --- --- ---
  circles.enter().append("circle")

    // transition state zero (initial)
    .attr("cx", 200) // horizontal position
    .attr("cy", function (d, i) { return 140 + (i * 250); }) // vertical position - iteratively updated for each planet instance
    .attr("r", 0)
    // the fill colour depends on the density - the value from the array is converted to a hexadecimal value 
    .attr("fill", "#fff")
    .style("stroke-width", 0)

    // transition state one 
    .transition()
    .duration(4000) // in miliseconds
    // for better impression, the size is magnified by sizeFactor
    .attr("r", function (d) {
      return d.density * sizeFactor;
    })

    // the transition on each iteration has incrementally different duration
    .attr("fill", function (d, i) {
      return "#" +
        "6" + // red component of #RGB colour
        "0" + // green component of #RGB colour
        (Math.floor((Number(d.density * 15))).toString(16))  //density is converted to a hexadecimal number - red component of #RGB colour
    });


  // --- --- ---
  // draw labels - planets names and density values
  var circles = svgContainer.selectAll("text")
    .data(planets);

  // water density reference - label
  var circles = svgContainer.selectAll("text")
    .data(planets);

  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", 250)  // position the word horizontally
    .attr("y", 24) // vertical position
    .text("\u27F5 Water density")
    .style("fill", "#234")

    // transition state one 
    .transition()
    .delay(5000)
    .duration(2000)
    .style("fill", "#eee")

  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", -100)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return d.planet })

    // transition state one 
    .transition()
    .attr("x", 20)
    .delay(500)
    .duration(1500);


  circles.enter().append("text")
    .attr("x", 420)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return "d = " + d.density })
    .transition()
    .attr("x", 320)
    .delay(500)
    .duration(1500);


  // --- --- ---
  // draw circles representing plantes' density
  circles.enter().append("circle")

    // transition state zero (initial)
    .transition()
    .delay(2000)
    .duration(0)
    .attr("cx", 200)
    // iteratively position vertically the plantes representations of density 
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 0)

    // transition state one 
    .transition()
    .duration(4000)
    .attr("r", 100 * waterDensity)
    .style("fill", "none")
    .style("stroke", "#fd7")
    .style("stroke-width", 1)
    .style("stroke-dasharray", ("3, 3"));


  // --- --- ---
  // water density reference - countur legend
  circles.enter().append("line")
    // transition state zero (initial)
    .attr("x1", 181)
    .attr("y1", 20)
    .attr("x2", 218)
    .attr("y2", 20)
    .style("fill", "none")
    .style("stroke", "#234")

    // transition state one 
    .transition()
    .delay(3000)
    .duration(4000)
    .style("stroke", "#fd7");


} // end of drawChart function




// -------------------
// draw chart function - gravity
// -------------------

function drawChartGrav2() {

  // clear the chart
  eraseChart2()

  // create a new svg container (canvas)
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);


  // maximum value of the planets gravity
  var maxGrav = Number(d3.max(planets, function (d) { return d.gravity; })); // will be used for factoring the size of the circles representing the gravity

  // --- --- ---
  // draw circles representing plantes' gravity
  var circles = svgContainer.selectAll("circle")
    .data(planets); // get the data from the the array

  // --- --- ---
  circles.enter().append("circle")
    // transition state zero (initial)
    .attr("cx", 200) // horizontal position
    .attr("cy", function (d, i) { return 140 + (i * 250); }) // vertical position - iteratively updated for each planet instance
    .attr("r", 1000)
    // the fill colour depends on the gravity - the value from the array is converted to a hexadecimal value 
    .attr("fill", "#234")
    .style("stroke-width", 0)

    // transition state one 
    .transition()
    .duration(3500) // in miliseconds
    .attr("fill", "#000")
    // for better impression, the size is scaled
    .attr("r", function (d) {
      return (d.gravity * (100 / maxGrav)) // the circle of the maximum gravity will have radius 100px, and other values are scaled accordingly
    })
    .attr(d3.easeCircleIn)

    // transition state two 
    .transition()
    .duration(4000) // in miliseconds
    // for better impression, the size is magnified so that the largest value has diameter 100px
    .attr("r", function (d) {
      return (d.gravity * (100 / maxGrav))
    })

    // the transition on each iteration has incrementally different duration
    .style("stroke-width", 0)
    .attr("fill", "#000");
  // it was initially my intention to use differnt shades of gray for various gravity values (see below line), but the idea was abandoned due to poor visual effect
  /*.attr("fill", function (d, i) {
    return "#" +
    (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16)) +
    (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16)) +
    (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16))
  })*/


  // --- --- ---
  // draw labels - planets names and gravity values
  var circles = svgContainer.selectAll("text")
    .data(planets);

  // Earth's gravity reference - label
  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", 250)  // position the word horizontally
    .attr("y", -15) // initially out of the view
    .style("fill", "#234")

    // transition state one 
    .transition()
    .delay(3000)
    .attr("y", 24) // vertical position
    .text("\u27F5 Earth's gravity")

    // transition state two 
    .transition()
    .delay(1000)
    .duration(2000)
    .style("fill", "#eee")


  // draw labels
  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", -100)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return d.planet })

    // transition state one 
    .transition()
    .attr("x", 20)
    .delay(500)
    .duration(1500);


  circles.enter().append("text")
    // transition state zero (initial)
    .attr("x", 420)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return "g = " + d.gravity })

    // transition state one 
    .transition()
    .attr("x", 320)
    .delay(500)
    .duration(1500);


  // --- --- ---
  // Earth's gravity contour reference legend
  circles.enter().append("circle")
    // transition state zero (initial)
    .transition()
    .delay(3000)
    .duration(0)
    .attr("cx", 200)
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 0)
    .style("stroke", "#234")
    .style("stroke-width", 0)
    .style("stroke-dasharray", ("3, 3"))

    // transition state one 
    .transition()
    .duration(10)
    .attr("r", 100 / maxGrav)
    .style("fill", "none")

    // transition state two 
    .transition()
    .duration(2000)
    .style("fill", "none")
    .style("stroke", "#fd7")
    .style("stroke-width", 1);

  circles.enter().append("line")
    // transition state zero (initial)
    .attr("x1", 160)
    .attr("y1", -5)
    .attr("x2", 240)
    .attr("y2", -5)
    .style("fill", "none")
    .style("stroke", "#234")

    // transition state one 
    .transition()
    .delay(3000)
    .attr("x1", 160)
    .attr("y1", 20)
    .attr("x2", 240)
    .attr("y2", 20)

    // transition state two 
    .transition()
    .duration(2000)
    .style("stroke", "#fd7")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", .1)

} // end of drawChart function




// ### ### ###
// erase active chart function
function eraseChart2() {

  // remove svg container (canvas)
  var svgContainer = d3.selectAll("svg").remove();

  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 0);
}



// -------------------
// Charts display modification
// -------------------

// options selectable by user and modyfying the look or behaviour of the data visualisations through the DOM manipulation

// HTML content change for each chart
function drawChartDia() {
  // header ID #plantersH2 modification (by overwriteing)
  document.getElementById("planetsH2").innerHTML = "Planets Diameter"
  // paragraph ID #planetsP text modification (by overwritghting)
  document.getElementById("planetsP").innerHTML = "Below are visualised relative diameters (Earth = 1) of the planets in the Solar System. The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same."
  // call another function that modifies the D3JS chart properties
  drawChartDia2()
}

function drawChartDens() {
  // header ID #plantersH2 modification (by overwriteing)
  document.getElementById("planetsH2").innerHTML = "Planets Density"
  // paragraph ID #planetsP text modification (by overwritghting)
  document.getElementById("planetsP").innerHTML = "Below are visualised relative density of the planets in the Solar System (Earth = 1). The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same. The colour (shade of gray) represents the density - darker means densier. There is also Earth's density countur (being the densierst planet) shown in dashed yellow line for comparison."
  // call another function that modifies the D3JS chart properties
  drawChartDens2()
}

function drawChartGrav() {
  // header ID #plantersH2 modification (by overwriteing)
  document.getElementById("planetsH2").innerHTML = "Planets Gravity"
  // paragraph ID #planetsP text modification (by overwritghting)
  document.getElementById("planetsP").innerHTML = "Below are visualised relative gravity of the planets in the Solar System (Earth = 1). The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same. The colour (shade of gray) represents the gravity - darker means densier. There is also Earth's density countur shown in dashed yellow line for comparison."
  // call another function that modifies the D3JS chart properties
  drawChartGrav2()
}


// clear the chart
function eraseChart() {
  // header ID #plantersH2 erase (by overwriteing with empty string)
  document.getElementById("planetsH2").innerHTML = ""
  // paragraph ID #planetsP text erase (by overwritghting with empty string)
  document.getElementById("planetsP").innerHTML = ""
  // call another function that modifies the D3JS chart properties
  eraseChart2()
}