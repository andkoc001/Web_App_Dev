/*
Title: Common D3 commands
Author: Andrzej Kocielski, G00376291@gmit.ie
*/

// --------------------

// link to the d3 library must be included in the html document
<head><script src="https://d3js.org/d3.v5.min.js"></script></head>

// assign the SVG element 'mySVG' to a variable 'svgContainer'
// d3.select is a DOM query that look for element id 'mySvg' in the HTML document
var svgContainer = d3.select("#mySvg")


// elements (e.g. a rectangle) can be appended tp to the SVG container
var myRectangle = svgContainer.append("rect"); // <-- semicolon

// add attributes to an element, for example
myRectangle.attr("x", 100); // <-- semicolon
myRectangle.attr("height", 100);
myRectangle.attr("width", 50);


// the above may be achieved, using command chain
var myRectangle = svgContainer.append("rect") // <-- no semicolon!
  .attr("x", 100) // <-- no semicolon!
  .attr("y", 100)
  .attr("height", 50)
  .attr("width", 200)
  .attr("fill", "orange"); // <-- semicolon


// to amend attributes 