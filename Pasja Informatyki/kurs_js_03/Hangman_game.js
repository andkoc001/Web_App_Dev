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

var letterArray = new Array(26);

letterArray[0] = "A";
letterArray[1] = "B";
letterArray[2] = "C";
letterArray[3] = "D";
letterArray[4] = "E";
letterArray[5] = "F";
letterArray[6] = "G";
letterArray[7] = "H";
letterArray[8] = "I";
letterArray[9] = "J";
letterArray[10] = "K";
letterArray[11] = "L";
letterArray[12] = "M";
letterArray[13] = "N";
letterArray[14] = "O";
letterArray[15] = "P";
letterArray[16] = "Q";
letterArray[17] = "R";
letterArray[18] = "S";
letterArray[19] = "T";
letterArray[20] = "U";
letterArray[21] = "V";
letterArray[22] = "W";
letterArray[23] = "X";
letterArray[24] = "Y";
letterArray[25] = "Z";


function beginning() {

  var divContent = "";


  for (i = 0; i <= 25; i++) {
    var element = "lett" + i;
    divContent = divContent + '<div class = "letter" onclick="check(' + i + ')" id="' + element + '">' + letterArray[i] + '</div>';
    if ((i + 1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>';
  }

  document.getElementById("alphabet").innerHTML = divContent;

  showRiddle();
}

function check(num) {
  alert(num);
}