/*
Web Application Development - Project, GMIT 2020
Author: Andrzej Kocielski, G00376291@gmit.ie
Lecturer: dr. Michael Duignan
*/
// ////////////////////


// ////////////////////
// Input validation

// -----------------
// Login to server

// Adopted from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_login_form_modal
// Open the modal (login box)
var modal = document.getElementById('login_pop');

// -----------------
// The following is a JavaScript verification function 
// Adopted from: https://www.daniweb.com/programming/web-development/code/330933/a-simple-html-login-page-using-javascript
// Disabled (not in use) because of its limits; the built-in HTML5 form verification is used instead
function check(form) {
  // the following code checkes whether the entered password is matching 
  if (form.u_name.value == "User" && form.psw.value == "GMIT") {
    window.open("start.html") // opens the target page while password matches
  }
}


// -----------------
// 'HTML Forms' webpage validation
// Disabled (not in use) because of its limits; the built-in HTML5 form verification is used instead

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

// While typing inside form fields (in focus) with class .highlight1, text colour changes
function focusIn() {
  var x, i; // x - the typed text; i - index of the typed string (array)
  // All characters typed in the input field are iterativly converted to light blue colour
  x = document.querySelectorAll(".highlight1");
  for (i = 0; i < x.length; i++) {
    x[i].style.color = "#3ad"; // the style of the i-th element of the test string is changed to light blue
  }
}

// When focus from the input fields of .highlight1 class is out, the colour changes to dark blue
function focusOut() {
  var x, i;
  x = document.querySelectorAll(".highlight1");
  for (i = 0; i < x.length; i++) {
    x[i].style.color = "#05a";
  }
}




// -----------------
// Style change

// The below function, when activated, changes the background and text colours of the element of ID #domStyle1
function changeColours() {
  document.getElementById("domStyle1").style.backgroundColor = "#124"
  document.getElementById("domStyle1").style.color = "#fd7"
}

// This function, when activated, changes the text style of the the first (index=0) <p> instance of the element of ID #domStyle1
function changeTextStyle() {
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.fontStyle = "italic";
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.textTransform = "uppercase";
}

// When activated, the function overwrites the current style features with the below ones (hard-coded for simplicty)
function resetStyle() {
  document.getElementById("domStyle1").style.backgroundColor = "#234"
  document.getElementById("domStyle1").style.color = "#eee"
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.fontStyle = "normal"
  document.getElementById("domStyle1").getElementsByTagName('p')[0].style.textTransform = "none";
}


// -----------------
// Content change

// This function, when activated, changes the text of the element of ID #sampleText
function changeText() {
  document.getElementById("sampleText").innerHTML = "This is DOM manipulation"
}

// When activated, this function evokes an image (substitutes path to the image) the text of the element of ID #picture, and defines the size of it
function addImage() {
  document.getElementById("picture").src = "img/Harreck_Blue_Car.svg";
  document.getElementById("picture").style.height = "100px";
}


// When activated, the function overwrites the current content with the below ones (hard-coded for simplicty)
function resetContent() {
  document.getElementById("sampleText").innerHTML = "Sample text."
  document.getElementById("picture").src = "";
  document.getElementById("picture").style.height = "0";
}


// -----------------
// Animation

//This funtion, on activation, will apply a motion (define in the CSS file) to element ID #pinpong
function ping() {
  x = document.getElementById("pingpong")
  x.style.animationTimingFunction = "ease-out";
  x.style.animation = "mymove1 1s 1"; // mymove1 is motion is defined in the CSS file
  x.style.left = "830px"; // final position when the movement is over
}

//This funtion, on activation, will apply a motion (define in the CSS file) to element ID #pinpong
function pong() {
  x = document.getElementById("pingpong")
  x.style.animationTimingFunction = "ease-out";
  x.style.animation = "mymove2 1s 1"; // mymove2 is motion is defined in the CSS file
  x.style.left = "0px"; // final position when the movement is over
}


// -----------------
// User interface - Calculator - for simplicity only addition and division is implemented

// The function reads user input numbers and associate them with variables num1 and num2 respectively
function read() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("readings").innerHTML = "Number 1: " + num1 + "</br>" + "Number 2: " + num2;
  return num1, num2;
}

// This function returns the sum of the two variables 
function add() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("result").innerHTML = "ANSWER: " + num1 + " plus " + num2 + " = " + (num1 + num2);
}

// Thus function returns the result of division of the two variables
function div() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  // division by zero check
  if (num2 != "0") {
    document.getElementById("result").innerHTML = "ANSWER: " + num1 + " divided by " + num2 + " = " + (num1 / num2);
  }
  else {
    document.getElementById("result").innerHTML = "Zero division error"
  }
}



// ////////////////////
// Scroll up to top of page functionality
// Adopted from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

// Get signal from the button
var mybutton = document.getElementById("toTop");

// The button appears when the user scrolls down 50px from the top of the document
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