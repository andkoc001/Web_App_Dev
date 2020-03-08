/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020, Week 7 Excercises - using the DOM
Title: Exercise 2 - Addition
*/

function compute() {
  num1 = Number(document.getElementById("field1").value);
  num2 = Number(document.getElementById("field2").value);
  alert("The result is: " + (num1 + num2));
}
