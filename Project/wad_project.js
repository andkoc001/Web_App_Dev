/*
Web Application Development - Project, GMIT 2020
Author: Andrzej Kocielski, G00376291@gmit.ie
Lecturer: dr. Michael Duignan
*/
// ////////////////////


// -----------------
// html form validation 

// Form submit button
function submitAll() {
  document.getElementById("newCarForm").submit();
}

// Form reset button
function resetAll() {
  document.getElementById("newCarForm").reset();
}




// ////////////////////

// DOM manipulation

// While filling out form fields (is in focus) with class .highlight1, text colour changes

function focusIn() {
  var x, i;
  x = document.querySelectorAll(".highlight1");
  for (i = 0; i < x.length; i++) {
    x[i].style.color = "#3ad";
  }
}

function focusOut() {
  var x, i;
  x = document.querySelectorAll(".highlight1");
  for (i = 0; i < x.length; i++) {
    x[i].style.color = "#124";
  }
}


// -----------------

// Style change
function changeColours() {
  document.getElementById("domStyle1").style.backgroundColor = "#124"
  document.getElementById("domStyle1").style.color = "#fd7"
}

function changeTextStyle() {
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.fontStyle = "italic";
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.textTransform = "uppercase";
}

function resetStyle() {
  document.getElementById("domStyle1").style.backgroundColor = "#234"
  document.getElementById("domStyle1").style.color = "#eee"
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.fontStyle = "normal"
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.textTransform = "none";
}

// Content change
function changeText() {
  document.getElementById("sampleText").innerHTML = "This is DOM manipulation"
}

function addImage() {
  document.getElementById("picture").src = "img/Harreck_Blue_Car.svg";
  document.getElementById("picture").style.height = "100px";
}


function resetContent() {
  document.getElementById("sampleText").innerHTML = "Sample text."
  document.getElementById("picture").src = "";
  document.getElementById("picture").style.height = "0";
}

// animation
function ping() {
  x = document.getElementById("pingpong")
  x.style.animationTimingFunction = "ease-out";
  x.style.animation = "mymove1 1s 1";
  x.style.left = "830px";
}

function pong() {
  x = document.getElementById("pingpong")
  x.style.animationTimingFunction = "ease-out";
  x.style.animation = "mymove2 1s 1";
  x.style.left = "0px";
}


// User interface - Calculator

function read() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("readings").innerHTML = "Number 1: " + num1 + "</br>" + "Number 2: " + num2;
  return num1, num2;
}

function add() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("result").innerHTML = "ANSWER: " + num1 + " plus " + num2 + " = " + (num1 + num2);
}

function div() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  if (num2 != "0") {
    document.getElementById("result").innerHTML = "ANSWER: " + num1 + " divided by " + num2 + " = " + (num1 / num2);
  }
  else {
    document.getElementById("result").innerHTML = "Zero division error"
  }
}



// ////////////////////

// Go to top button; adopted from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// Get signal from the button
var mybutton = document.getElementById("toTop");

// When the user scrolls down 50px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}