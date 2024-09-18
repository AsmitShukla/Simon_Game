var level = 0;
gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;

  userClickedPattern = [];

  $("h1").text("level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var button = $("." + randomChosenColour);

  button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  console.log(gamePattern);
}

//when user clicks any button, select it.
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  var addHere = $(this);
  animatePress(addHere);

  var a = checkAnswer(userClickedPattern.length - 1);
  if (a == 0) {
    level = 0;
    gamePattern = [];

    $("h1").text("Game Over");
    var gameOver = new Audio("./sounds/wrong.mp3");
    gameOver.play();

    displayWrong();
    setTimeout(restartOver, 1000);
  }
  if (gamePattern.length == userClickedPattern.length) {
    setTimeout(nextSequence, 1000);
  }
});

function restartOver() {
  $("h1").text("Press A Key to Start");
  $(document).one("keydown", function (params) {
    nextSequence();
  });
}

function displayWrong() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
}

function checkAnswer(ind) {
  if (gamePattern[ind] === userClickedPattern[ind]) return 1;
  else return 0;
}

function playSound(randomChosenColour) {
  switch (randomChosenColour) {
    case "blue":
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
  }
}

function animatePress(currentColor) {
  currentColor.addClass("pressed");
  setTimeout(function () {
    currentColor.removeClass("pressed");
  }, 100);
}

$(document).one("keydown", function (params) {
  //start the game when any key is pressed.
  nextSequence();
});
