/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020, Week 9 Excercise
Title: Exercise 9 - d3 implementation
*/

// assign the SVG element 'mySVG' to a variable 'svgContainer'
// d3.select is a DOM query that look for element id 'mySVG' in the HTML document
var svgContainer = d3.select("#mySvg"); // <-- semicolon


// assign varible to handle element 'rect' and add attributes to the element
var myRectangle = svgContainer.append("rect") // <-- no semicolon!
  .attr("x", 100) // <-- no semicolon!
  .attr("y", 100)
  .attr("height", 50)
  .attr("width", 200)
  .attr("fill", "orange"); // <-- semicolon


// assign varible to handle element 'circle' and add attributes to the element
var myRectangle = svgContainer.append("circle") // <-- no semicolon!
  .attr("cx", 300) // <-- no semicolon!
  .attr("cy", 150)
  .attr("r", 50)
  .attr("fill", "blue")
  .attr("stroke", "red")
  .attr("stroke-width", "1"); // <-- semicolon


// creating <svg> elements in html document
// assign variable to a <div> element of id 'svg_area'
// this will create a <svg> element inside the <div> element
var svgContainer_1 = d3.select("#svg_area").append("svg")
  .attr("height", 150)
  .attr("width", 300); // <-- semicolon here

// adding stuff to the above variable (svgContainer_1)
var myRectangle = svgContainer_1.append("rect")
  .attr("x", 50)
  .attr("height", 50)
  .attr("width", 500)
  .attr("fill", "green");

