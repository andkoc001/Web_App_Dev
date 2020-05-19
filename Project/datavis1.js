/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 12 - d3
*/
// ////////////////////


// Getting data in form of an array
// The data storred in the 'plantes' array.

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
// choice function 
// -------------------

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
  eraseChart2()

  // create svg container (canvas)
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);


  // draw Sun 
  var sun = svgContainer.append("ellipse")

    // transition state zero (initial)
    .attr("rx", 1)
    .attr("ry", 1)
    .attr("cx", 200)
    .attr("cy", -1040)
    .attr("fill", "#fd7")
    .attr("stroke", "#f80")
    .attr("stroke-width", 2)

    // transition state one 
    .transition()
    .attr("rx", 1090)
    .attr("ry", 1090)
    .delay(1000)
    .duration(2000);


  // draw plantes diameter
  var circles = svgContainer.selectAll("circle")
    .data(planets);

  circles.enter().append("circle")

    // transition state zero (initial)
    .attr("cx", 200)
    .attr("cy", -200)
    .attr("r", function (d) {
      return d.diameter * 1;
    })
    .attr("fill", function (d, i) { return "#" + (1 + i) + "" + (1 + i) + "f" }) // each iteration changes the red and green element of the #RGB parameter

    // transition state one 
    .transition()
    .duration(1500) // in miliseconds
    // move the plantes down to their locations
    .attr("cy", function (d, i) { return 150 + (i * 250); })
    // for better impression, the size is magnified 10-folds
    .attr("r", function (d) {
      return d.diameter * 10;
    })
    // the transition on each iteration has incrementally different duration
    .delay(function (d, i) {
      return 750 - (i * 150);
    })
    .duration(2000)
    .ease(d3.easeBack);



  // draw labels
  var circles = svgContainer.selectAll("text")
    .data(planets);

  circles.enter().append("text")
    .text("Sun")
    .attr("x", 186)  // centre the word
    .attr("y", -30) // initially out of the view
    .style("fill", "#334")
    .transition()
    .delay(2650)
    .ease(d3.easeCircleOut)
    .attr("y", 30);


  circles.enter().append("text")
    .attr("x", -100)
    .attr("y", function (d, i) { return 155 + (i * 250); })
    .text(function (d, i) { return d.planet })
    .transition()
    .attr("x", 20)
    .delay(500)
    .duration(1500);


  circles.enter().append("text")
    .attr("x", 420)
    .attr("y", function (d, i) { return 155 + (i * 250); })
    .text(function (d, i) { return "R = " + d.diameter })
    .transition()
    .attr("x", 320)
    .delay(500)
    .duration(1500);

} // end of drawChart function




// -------------------
// draw chart function - density
// -------------------

function drawChartDens2() {
  eraseChart2()

  // create svg container (canvas)
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);


  var waterDensity = 0.1813 // relative to Eearth's density 

  // draw plantes density
  var circles = svgContainer.selectAll("circle")
    .data(planets);

  circles.enter().append("circle")

    // transition state zero (initial)
    .attr("cx", 200)
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 0)
    // the fill colour depends on the density - the value from the array is converted to a hexadecimal value 
    .attr("fill", "#fff")
    .style("stroke-width", 0)

    // transition state one 
    .transition()
    .duration(4000) // in miliseconds
    // for better impression, the size is magnified 50-folds
    .attr("r", function (d) {
      return d.density * 100;
    })

    // the transition on each iteration has incrementally different duration
    .attr("fill", function (d, i) {
      return "#" +
        "6" + // red component of #RGB colour
        "0" + // green component of #RGB colour
        (Math.floor((Number(d.density * 15))).toString(16))  //density is converted to a hexadecimal number - red component of #RGB colour
    });


  // Water density reference countur
  circles.enter().append("circle")

    .transition()
    .delay(2000)
    .duration(0)
    .attr("cx", 200)
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 0)

    .transition()
    .duration(4000)
    .attr("r", 100 * waterDensity)
    .style("fill", "none")
    .style("stroke", "#234")

    .style("stroke", "#fd7")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", 1);

  circles.enter().append("line")
    .attr("x1", 181)
    .attr("y1", 20)
    .attr("x2", 218)
    .attr("y2", 20)
    .style("fill", "none")
    .style("stroke", "#234")

    .transition()
    .delay(3000)
    .duration(4000)
    .style("stroke", "#fd7")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", .1)


  var circles = svgContainer.selectAll("text")
    .data(planets);

  circles.enter().append("text")
    .attr("x", 250)  // centre the word
    .attr("y", 24) // initially out of the view
    .text("\u27F5 Water density")
    .style("fill", "#234")

    .transition()
    .delay(5000)
    .duration(2000)
    .style("fill", "#eee")


  // draw labels
  circles.enter().append("text")
    .attr("x", -100)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return d.planet })

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

} // end of drawChart function




// -------------------
// draw chart function - gravity
// -------------------

function drawChartGrav2() {
  eraseChart2()

  // create svg container (canvas)
  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 2000);


  // draw plantes gravity
  var circles = svgContainer.selectAll("circle")
    .data(planets);

  var maxGrav = Number(d3.max(planets, function (d) { return d.gravity; }));

  circles.enter().append("circle")

    // transition state zero (initial)
    .attr("cx", 200)
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 1000)
    // the fill colour depends on the gravity - the value from the array is converted to a hexadecimal value 
    .attr("fill", "#234")
    .style("stroke-width", 0)

    // transition state one 
    .transition()
    .duration(3500) // in miliseconds
    .attr("fill", "#000")
    .attr("r", function (d) {
      return (d.gravity * (100 / maxGrav))
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
    /*.attr("fill", function (d, i) {
      return "#" +
        (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16)) +
        (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16)) +
        (Math.floor((Number((1 - (d.gravity / maxGrav)) * 15))).toString(16))
    })*/
    .attr("fill", "#000");


  // Earth's gravity contour reference legend
  circles.enter().append("circle")
    .transition()
    .delay(3000)
    .duration(0)
    .attr("cx", 200)
    .attr("cy", function (d, i) { return 140 + (i * 250); })
    .attr("r", 0)
    .style("stroke", "#234")
    .style("stroke-width", 0)
    .style("stroke-dasharray", ("3, 3"))

    .transition()
    .duration(10)
    .attr("r", 100 / maxGrav)
    .style("fill", "none")

    .transition()
    .duration(2000)
    .style("fill", "none")
    .style("stroke", "#fd7")
    .style("stroke-width", 1);

  circles.enter().append("line")
    .attr("x1", 160)
    .attr("y1", -5)
    .attr("x2", 240)
    .attr("y2", -5)
    .style("fill", "none")
    .style("stroke", "#234")

    .transition()
    .delay(3000)
    .attr("x1", 160)
    .attr("y1", 20)
    .attr("x2", 240)
    .attr("y2", 20)

    .transition()
    .duration(2000)
    .style("stroke", "#fd7")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", .1)



  var circles = svgContainer.selectAll("text")
    .data(planets);

  circles.enter().append("text")
    .attr("x", 250)  // centre the word
    .attr("y", 0) // initially out of the view
    .style("fill", "#234")

    .transition()
    .delay(3000)
    .attr("x", 250)  // centre the word
    .attr("y", 24) // initially out of the view
    .text("\u27F5 Earth's gravity")

    .transition()
    .delay(1000)
    .duration(2000)
    .style("fill", "#eee")


  // draw labels
  circles.enter().append("text")
    .attr("x", -100)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return d.planet })

    .transition()
    .attr("x", 20)
    .delay(500)
    .duration(1500);


  circles.enter().append("text")
    .attr("x", 420)
    .attr("y", function (d, i) { return 145 + (i * 250); })
    .text(function (d, i) { return "g = " + d.gravity })
    .transition()
    .attr("x", 320)
    .delay(500)
    .duration(1500);

} // end of drawChart function


// erase active chart function
function eraseChart2() {

  // remove svg container (canvas)
  var svgContainer = d3.selectAll("svg").remove();

  var svgContainer = d3.select("#dataVis1").append("svg")
    .attr("width", 400)
    .attr("height", 0);

}



// -------------------
// dom manipulation
// -------------------

// Content change
function drawChartDia() {
  document.getElementById("planetsH2").innerHTML = "Planets Diameter"
  document.getElementById("planetsP").innerHTML = "Below are visualised relative diameters (Earth = 1) of the planets in the Solar System. The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same."
  drawChartDia2()
}

function drawChartDens() {
  document.getElementById("planetsH2").innerHTML = "Planets Density"
  document.getElementById("planetsP").innerHTML = "Below are visualised relative density of the planets in the Solar System (Earth = 1). The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same. The colour (shade of gray) represents the density - darker means densier. There is also Earth's density countur (being the densierst planet) shown in dashed yellow line for comparison."
  drawChartDens2()
}

function drawChartGrav() {
  document.getElementById("planetsH2").innerHTML = "Planets Gravity"
  document.getElementById("planetsP").innerHTML = "Below are visualised relative gravity of the planets in the Solar System (Earth = 1). The planets are shown from top to bottom in order from neares to the Sun (Mercury) to the furthest (Neptune). The distance in this visualiation is neglected and, for simplicity, kept the same. The colour (shade of gray) represents the gravity - darker means densier. There is also Earth's density countur shown in dashed yellow line for comparison."
  drawChartGrav2()
}

function eraseChart() {
  document.getElementById("planetsH2").innerHTML = ""
  document.getElementById("planetsP").innerHTML = ""
  eraseChart2()
}