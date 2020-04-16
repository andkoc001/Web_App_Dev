/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 12 - d3
*/

// importing csv file with data into d3
// d3.csv("file_name.csv")
d3.csv("sales_data.csv").then(function (data) {
  console.log(data);

  /*
  // to read a file and check if it was loaded - view it in browser's console (localhost:8000)
  d3.csv("sales_data.csv").then(function (data) {
    console.log(data);
  });
  */

  // create a svg container (inside the curly brackets!)
  var svgContainer = d3.select("#myDiv").append("svg")
    .attr("height", 550)
    .attr("width", 600);


  // generate rectangles for Bar Chart
  // create variable that selects all rectangles (many),
  // using values from imported file - .data(data)
  var myRectangle = svgContainer.selectAll('rect').data(data);

  // RECTANGLE BARS
  // enter loops through
  myRectangle.enter().append("rect")

    // transition state zero
    .attr("fill", "#333")
    .attr("x", function (d, i) {
      return 50 + (i * 42); // width of rectangle (40) + 2 for gap between them
    })
    .attr("y", 700)
    .attr("width", 40)


    // transition state one (initial)
    .transition()
    .duration(2000)


    // function will run and returns i (the index value of the array)
    // d = data, i = index
    .attr("x", function (d, i) {
      return 50 + (i * 42); // initial offset + width of rectangle (40) + 2 for gap between them
    })

    //.attr("y", 50) // this would produce bars hanging down, from baseline 50px from top
    .attr("y", function (d, i) {
      return 600 - d.sales * 10 // baseline 300px from top, minus (i.e. going up) the height of the rect
    })

    .attr("width", 40)
    .attr("height", function (d) {
      return d.sales * 10; // takes value of sales from the imported csv; *10 to magnify the result
    })

    .attr("fill", function (d) {
      return "steelblue"
    })


  // LABELS
  // add label text for Bar Chart, using values from imported file - .data(data)
  var mylabel = svgContainer.selectAll('text').data(data);

  // enter loops through
  mylabel.enter().append("text")


    // transition state zero
    .attr("fill", "#333")
    .attr("x", function (d, i) {
      return 70 + (i * 42); // width of rectangle (40) + 2 for gap between them
    })
    .attr("y", 620)


    // transition state one (initial)
    .transition()
    .duration(2000)
    .delay(500)
    .ease(d3.easeCubicInOut) // d3.easeCircleIn, d3.easeElasticOut, d3.easeLinear

    // horizontal positioning
    .attr("x", function (d, i) {
      return 70 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
    })
    // vertical positioning
    .attr("y", function (d) {
      return 620 - d.sales * 10 // baseline 300px from top + 20px into the bar, minus (i.e. going up) the height of the rect
    })
    // centre the text (around the horizontal positioning)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "white")
    // text content
    .text(function (d) {
      return d.sales; // sales from csv file + unicode degree symbol 
    })


    // transition state two
    .transition()
    .duration(2000)
    .delay(function (d, i) {
      return i * 200
    })
    .ease(d3.easeBounceOut)

    // horizontal positioning
    .attr("x", function (d, i) {
      return 70 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
    })
    // vertical positioning
    .attr("y", 610)
    // centre the text (around the horizontal positioning)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "8px")
    .attr("fill", "yellow")
    // text content
    .text(function (d) {
      return d.Month; // month from csv file + unicode degree symbol 
    });

});