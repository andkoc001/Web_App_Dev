/*
Author: Andrzej Kocielski
Description: Hangman Game - based on Pasja Informatyki tutorial: https://youtu.be/9FVtiJHFCSU
*/

var riddle = "Shortcut to muschrooms";
riddle = riddle.toUpperCase();

var length = riddle.length; // without brackets - it is a parameter, not a function

var riddleHidden = "";

for (i = 0; i < length; i++) {
  if (riddle.charAt(i) == " ") riddleHidden = riddleHidden + " ";
  else riddleHidden = riddleHidden + "-";
}

function showRiddle() {
  document.getElementById("gameBoard").innerHTML = riddleHidden;
}

window.onload = beginning; // no brackets after the function name, because it is not the function call, just alias to the function

function beginning() {

  var divContent = "";

  for (i = 0; i <= 26; i++) {
    divContent = divContent + '<div class = "letter">A</div>';
    if ((i + 1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>';
  }

  document.getElementById("alphabet").innerHTML = divContent;

  showRiddle();
}