/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 12 - d3
*/
// ////////////////////


// Getting data in form of an array

// The new data variable.
// source: https://stackoverflow.com/a/21668952
var alphabet = [
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

// plantes distance, diameter, density, gravity, moons relative to Earth (Earth = 1)
// data extracted from: https://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html
var planets = [
  { planet: "Mercury", distance: "0.387", diameter: "0.383", density: ".984", gravity: "0.", moons: "0" },
  { planet: "Venus", distance: "0.723", diameter: "0.949", density: "0.951", gravity: "0.907", moons: "0" },
  { planet: "Earth", distance: "1", diameter: "1", density: "1", gravity: "1", moons: "1" },
  { planet: "Mars", distance: "1.52", diameter: "0.532", density: "0.713", gravity: "0.377", moons: "2" },
  { planet: "Jupyter", distance: "5.2", diameter: "11.21", density: "0.24", gravity: "2.36", moons: "79" },
  { planet: "Saturn", distance: "9.58", diameter: "9.45", density: "0.125", gravity: "0.916", moons: "82" },
  { planet: "Uranus", distance: "19.2", diameter: "4.01", density: "0.23", gravity: "0.889", moons: "27" },
  { planet: "Neptune", distance: "30.05", diameter: "3.88", density: ".297", gravity: "1.12", moons: "14" }
];


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
    return 1200 - (i * 150);
  })
  .duration(2000);



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
  .attr("x", 20)
  .attr("y", function (d, i) { return 155 + (i * 250); })
  .text(function (d, i) { return d.planet });


circles.enter().append("text")
  .attr("x", 320)
  .attr("y", function (d, i) { return 155 + (i * 250); })
  .text(function (d, i) { return "R = " + d.diameter });
