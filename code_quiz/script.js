var viewScoreBtn = document.querySelector("#view-scores");
var startQuizBtn = document.querySelector("#start-quiz");
var countDown = document.querySelector("#count-down");

var timer = 76;

startQuizBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var timerInterval = setInterval(function() {
        timer--;
        countDown.innerHTML = "Timer: " + timer;
        if(timer === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
  });

