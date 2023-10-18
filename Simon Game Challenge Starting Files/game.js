
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;


$(document).keydown(function () {
    if (!gameStart) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
})


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);

    animatePress("." + randomChosenColor);
};


//user click behavior record
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress("." + userChosenColor);

    checkAnswer(userClickedPattern.length - 1)
})


//play sound when button clicked
function playSound(colorName) {
    var sound = new Audio("sounds/" + colorName + ".mp3");
    sound.play();
}


//animate button
function animatePress(currentColor) {
    $(currentColor).addClass("pressed");

    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

