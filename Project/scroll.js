/*
Web Application Development - Project, GMIT 2020
Author: Andrzej Kocielski, G00376291@gmit.ie
Lecturer: dr. Michael Duignan
*/
// ////////////////////


// -----------------
// Go to top button; adopted from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// Get the button
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