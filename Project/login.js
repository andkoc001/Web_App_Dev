/*
Title: Web Application Development - Project, GMIT 2020
Author: Andrzej Kocielski, G00376291@gmit.ie
*/
// ----------------------------------------------------
// This code is incorporated into the wad_project.js, but also kept in this separate file, beacuse some unidentified issues with functionality.


// Adopted from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_login_form_modal
// Get the modal
var modal = document.getElementById('login_pop');

// ----------------------------------------------------
// Adopted from: https://www.daniweb.com/programming/web-development/code/330933/a-simple-html-login-page-using-javascript
// function that verifies the user's credential 
function check(form) /* function to check credentials */ {
  /* the following code checkes whether the entered password is matching */
  if (form.u_name.value == "User" && form.psw.value == "GMIT") {
    window.open("start.html") /* opens the target page while password matches */
  }
}
