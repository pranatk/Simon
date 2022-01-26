var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern = [];
var level=0;
var started=false;


$(document).on("tap",function(){
  if(started==false){
  started=true;
  nextSequence();

}
});
$("button").on("tap",function(event){
  console.log(event.touches.target);
  var buttonClicked= event.target.id;
  userClickedPattern.push(buttonClicked);

  playSound(buttonClicked);
  animatePress(buttonClicked);
  checkAnswer(userClickedPattern.length);
});

function checkAnswer(currLevel){
  if(userClickedPattern[currLevel-1]==gamePattern[currLevel-1]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
      nextSequence();
    },1000);
    }


  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },25);
    playSound("wrong");
    $("h1").text("Game over. Press any key to restart.");
    startOver();
  }

}
function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("."+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}
function playSound(color){
  var audio= new Audio("sounds/"+color+".mp3");
  audio.play();
}
function animatePress(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },250);
}
