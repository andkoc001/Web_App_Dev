/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020
Title: Exercise 12 - d3
*/
// ////////////////////


// importing csv file with data into d3
// d3.csv("file_name.csv")
d3.csv("sales_data.csv")
  // check if it was loaded - in browser's console (localhost:8000)
  .then(function (data) {
    console.log(data);

    // convert ot numbers
    data.forEach(function (d) {
      d.Sales = Number(d.Sales); // or d.Sales = +d.Sales;
    })


    // create a scale for Y axis
    var yScale = d3.scaleLinear()
      // source of data - what is written on the axis
      .domain([0, d3.max(data, function (d) {
        return d.Sales;
      }) + 0]) //.domain([0, 500])  // <-- a simple case
      // mapped destination - where the axis is placed
      .range([350, 0]) // note the reveresed order for axes values going from bottom up
      ; // <-- note semicolon here!


    // create Y axis
    var yAxis = d3.axisLeft()
      .scale(yScale); // <-- semicolon!



    // create a svg container (still inside the curly brackets!)
    var svgContainer = d3.select("#myDiv").append("svg")
      .attr("height", 400)
      .attr("width", 600)
      .attr("transform", "translate(0, 10)");


    // RECTANGLE BARS

    // generate rectangles for Bar Chart
    // associate variable from imported file - .data(data) - with all rectangles,
    var myRectangle = svgContainer.selectAll('rect').data(data);


    // enter loops - create rectangle for each instance from the data
    myRectangle.enter().append("rect")

      // transition state zero (initial)
      .attr("fill", "#333")
      .attr("x", function (d, i) {
        return 50 + (i * 42); // initial offset (left margin) + width of rectangle (40) + 2 for gap between them
      })
      .attr("y", 350)
      .attr("width", 40)


      // transition state one 
      .transition()
      .duration(1000)


      // function will run and returns i (the index value of the array)
      // d = data, i = index
      .attr("x", function (d, i) {
        return 50 + (i * 42); // initial offset + width of rectangle (40) + 2 for gap between them
      })

      //.attr("y", 50) // this would produce bars hanging down, from baseline 50px from top
      .attr("y", function (d, i) {
        return yScale(d.Sales) // baseline 300px from top, minus (i.e. going up) the height of the rect
      })

      .attr("width", 40)

      // without scaling
      //.attr("height", function (d) {return d.Sales;}) // takes value of Sales from the imported csv; *10 to magnify the result

      // with scaling
      .attr("height", function (d) {
        return 350 - yScale(d.Sales);
      })


      .attr("fill", "steelblue")


    // LABELS 1 - sales

    // add label text for Bar Chart, using values from imported file - .data(data)
    var mylabel = svgContainer.selectAll('text').data(data);

    // enter loops through
    mylabel.enter().append("text")

      // transition state zero (initial)
      .attr("fill", "steelblue")
      .attr("x", function (d, i) {
        return 70 + (i * 42); // width of rectangle (40) + 2 for gap between them
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
      .attr("x", function (d, i) {
        return 70 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
      })
      .attr("y", function (d) {
        return (580 * (350 / 580) + 20) - d.Sales * (350 / 580)  // baseline from top + 20px into the bar, minus (i.e. going up) the height of the rect
      }) // max = 580, scale = 350

      // text style
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("fill", "white")

      // text content
      .text(function (d) {
        return d.Sales; // Sales from csv file + unicode degree symbol 
      });


    // LABELS 2 - months

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
        return 60 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
      })
      .attr("y", 365)

      // text style
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "8px")
      .attr("fill", "#333")

      // text content
      .text(function (d) {
        return d.Month; // months names from csv file
      })


      // transition state two
      .transition()
      .duration(2000)
      .delay(function (d, i) {
        return 400 + (i * 250);
      })
      .ease(d3.easeBounceOut)

      // horizontal positioning
      .attr("x", function (d, i) {
        return 70 + (i * 42); // (50+20) to centre text in the middle of the bar; width of rectangle (40) + 2 for gap between them
      })

      // centre the text (around the horizontal positioning)
      .attr("fill", "#aaa");


    // AXES

    svgContainer.append("g") // 'g' denotes group
      .attr("transform", "translate(46, 0)")
      .call(yAxis);


  });