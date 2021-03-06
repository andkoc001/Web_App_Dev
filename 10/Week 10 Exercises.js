/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 10 - d3 
*/


// importing csv file into d3
// d3.csv("temperature_data.csv")
d3.csv("temperature_data.csv").then(function (data) {
  console.log(data);

  // create a svg container (inside the curly brackets!)
  let svgContainer = d3.select("#myDiv").append("svg")
    .attr("height", 800)
    .attr("width", 800);


  // generate rectangles for Bar Chart
  // create variable that selects all rectangles (many),
  // using values from imported file - .data(data)
  let myRectangle = svgContainer.selectAll('rect').data(data);

  // enter loops through
  myRectangle.enter().append("rect")
    // function will run and returns i (the index value of the array)
    // d = data, i = index
    .attr("x", function (d, i) {
      return 50 + (i * 42); // width of rectangle (40) + 2 for gap between them
    })
    //.attr("y", 50) // this would produce bars hanging down, from baseline 50px from top
    .attr("y", function (d, i) {
      return 300 - d.temp * 10 // baseline 300px from top, minus (i.e. going up) the height of the rect
    })
    .attr("width", 40)
    .attr("height", function (d) {
      return d.temp * 10; // takes value of temp (temperature) from the imported csv; *10 to magnify the result
    })
    .attr("fill", function (d) {
      if (d.temp <= 10) { return "steelblue"; } // colour depends on the value of temperature
      else if (d.temp <= 15) { return "green"; }
      else if (d.temp <= 20) { return "orange"; }
      else { return "red"; }
    })


  // add label text for Bar Chart, using values from imported file - .data(data)
  let mylabel = svgContainer.selectAll('text').data(data);

  // enter loops through
  mylabel.enter().append("text")
    // horizontal positioning
    .attr("x", function (d, i) {
      return 70 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
    })
    // vertical positioning
    .attr("y", function (d) {
      return 320 - d.temp * 10 // baseline 300px from top + 20px into the bar, minus (i.e. going up) the height of the rect
    })
    // centre the text (around the horizontal positioning)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "white")
    // text content
    .text(function (d) {
      return d.temp + "\u00B0"; // temperature from csv file + unicode degree symbol 
    });

});

/*
// to read a file and check if it was loaded - view it in browser's console (localhost:8000)
d3.csv("temperature_data.csv").then(function (data) {
  console.log(data);
});
*/
