/*
Author: Andrzej Kocielski, G00376291@gmit.ie
Description: Web Application Development, GMIT 2020, Week 7 Excercises - using the DOM
Title: Exercise 5 - Guessing game
*/

function startGame() {
  number = Math.ceil(Math.random() * 100);
  alert(number);
  for (var i = 1; i <= 3; i++) {
    var guess = prompt("This is your " + i + " attempt:");
    if (guess == number) {
      document.getElementById("picture").src = "wongame.png";
      document.getElementById("message").innerHTML = "Correct! The answer is " + number + ".";
      break;
    };
    document.getElementById("message").innerHTML = "You run out of attemtpts! The correct answer was " + number + ".";
    document.getElementById("picture").src = "lostgame.png";
  };
}