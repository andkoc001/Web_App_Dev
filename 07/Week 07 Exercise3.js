/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020, Week 7 Excercises - using the DOM
Title: Exercise 3 - Calculator
*/

function read() {
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("readings").innerHTML = "Number 1: " + num1 + "</br>" + "Number 2: " + num2;
  return num1, num2;
}

function add() {
  // read(); //does not work
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  document.getElementById("result").innerHTML = "ANSWER: " + num1 + " plus " + num2 + " = " + (num1 + num2);
}

function div() {
  // read(); //does not work
  var num1 = Number(document.getElementById("box1").value);
  var num2 = Number(document.getElementById("box2").value);
  if (num2 != "0") {
    document.getElementById("result").innerHTML = "ANSWER: " + num1 + " divided by " + num2 + " = " + (num1 / num2);
  }
  else {
    document.getElementById("result").innerHTML = "Zero division error"
  }
}