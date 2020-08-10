var buttons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("h1").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenButton = $(this).attr("id");
  userClickedPattern.push(userChosenButton);
  playSound(userChosenButton);
  animatePress(userChosenButton);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout (function() {
      nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("You made it to Level " + level + "! Click here to try again.");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 9);
  var randomChosenButton = buttons[randomNumber];
  gamePattern.push(randomChosenButton);
  $("#" + randomChosenButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenButton);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentButton) {
  $("#" + currentButton).addClass("pressed");
  setTimeout(function() {
    $("#" + currentButton).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
