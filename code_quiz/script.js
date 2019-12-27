//Global Variables//
var startQuizBtn = document.querySelector("#start-quiz");
var countDown = document.querySelector("#count-down");
var question = document.querySelector(".ques");
var answerBtn = document.querySelectorAll(".op");
var answer1 = document.querySelector("#ques1");
var answer2 = document.querySelector("#ques2");
var answer3 = document.querySelector("#ques3");
var answer4 = document.querySelector("#ques4");
var finalResult = document.querySelector(".result");
var totalScore = document.querySelector(".quiz-title");
var player = document.querySelector(".high-score");
var postScore = document.querySelector(".post");
var setScore = document.querySelector(".card");
var roster = document.querySelector(".users");
var restart = document.querySelector(".start-over");
var clearScores = document.querySelector(".clear");
var initials = document.querySelector(".initials").value;

//Setting attributes to hide elements from the DOM until ready for them to show up//
player.setAttribute("class", "remove");
restart.setAttribute("class", "remove");
clearScores.setAttribute("class", "remove");
roster.setAttribute("class", "remove");

//Global variables with starting values//
var questionNumber = 0;
var timer = 76;
var score = "";
var items = [];

var items = {
     name: initials,
     score: score
}
 if (localStorage.getItem("name")) {
     var items = JSON.parse(localStorage.getItem("name")); 
 }
else {
    items = []
}




//Starting the quiz with the "Start Quiz" button//
startQuizBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var quizQues = questions[questionNumber].title;
    var listItem = questions[questionNumber].choices[0];
    var listItem2 = questions[questionNumber].choices[1];
    var listItem3 = questions[questionNumber].choices[2];
    var listItem4 = questions[questionNumber].choices[3];

    question.innerHTML = quizQues;
    answer1.innerHTML = listItem;
    answer2.innerHTML = listItem2;
    answer3.innerHTML = listItem3;
    answer4.innerHTML = listItem4;

    answer1.setAttribute("class", "op");
    answer2.setAttribute("class", "op");
    answer3.setAttribute("class", "op");
    answer4.setAttribute("class", "op");
    startQuizBtn.setAttribute("class", "remove");

    //Countdown timer counts down by 1 second and stops at 0//
    var timerInterval = setInterval(function () {
        timer--
        countDown.innerHTML = "Timer: " + timer;
        if (timer === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

     //Setting the style of the multiple choice buttons//
     answer1.setAttribute("style", "display: block; background-color: rgb(77, 1, 77); color: white; border-radius: 12px; margin-left: 320px; width: 30%;");
     answer2.setAttribute("style", "display: block; background-color: rgb(77, 1, 77); color: white; border-radius: 12px; margin-left: 320px; width: 30%;");
     answer3.setAttribute("style", "display: block; background-color: rgb(77, 1, 77); color: white; border-radius: 12px; margin-left: 320px; width: 30%;");
     answer4.setAttribute("style", "display: block; background-color: rgb(77, 1, 77); color: white; border-radius: 12px; margin-left: 320px; margin-bottom: 20px; width: 30%;");
});




//When each answer is clicked it checks if it is "correct" or "Wrong" and goes to the updatePage function//
answerBtn[0].addEventListener("click", function () {
    console.log(this.textContent);
    if (this.textContent === questions[questionNumber].answer) {
        updatePage(true)
    }

    else {
        updatePage(false)
    }
});

answerBtn[1].addEventListener("click", function () {
    if (this.textContent === questions[questionNumber].answer) {
        updatePage(true)
    }
    else {
        updatePage(false)
    }
});

answerBtn[2].addEventListener("click", function () {
    console.log(this.textContent);
    if (this.textContent === questions[questionNumber].answer) {
        updatePage(true)
    }
    else {
        updatePage(false)
    }
});

answerBtn[3].addEventListener("click", function () {
    console.log(this.textContent);
    if (this.textContent === questions[questionNumber].answer) {
        updatePage(true)
    }
    else {
        updatePage(false)
    }
});




/*updatePage function evaluates result of the users answers and either continues to the next question
  or calls the donePage function if all the questions have been answered*/
function updatePage(answer) {
    if (answer) {
        finalResult.innerHTML = "Correct!";
    }
    else {
        finalResult.innerHTML = "Wrong!";
        timer = timer - 10;
    }
    questionNumber++;

    if(questionNumber > 4) {
        donePage()
    }
  
    else {
        console.log(questions[questionNumber]);
        var quizQues = questions[questionNumber].title;
        var listItem = questions[questionNumber].choices[0];
        var listItem2 = questions[questionNumber].choices[1];
        var listItem3 = questions[questionNumber].choices[2];
        var listItem4 = questions[questionNumber].choices[3];

        question.innerHTML = quizQues;
        answer1.innerHTML = listItem;
        answer2.innerHTML = listItem2;
        answer3.innerHTML = listItem3;
        answer4.innerHTML = listItem4;
    }
}




/*The donePage records the user's score and allows them to type in their initials and submit their score
   to the highscores page*/
function donePage() {
    if (timer === 0) {
        score = 0;
    }
    else {
        score = timer;
    }

    var verbiage = ("Your score is: " + score);
    totalScore.innerHTML = verbiage;

    /*Hiding the result from last question, timer countdown, and questions and showing the form to type
       the users initials */
    player.setAttribute("class", "high-score");
    finalResult.setAttribute("class", "remove");
    countDown.setAttribute("class", "remove");
    question.setAttribute("class", "remove");
    
    //Adding verbiage to tell the user to enter their initials. This is also overwritting the answer buttons//
    setScore.innerHTML = "Enter your initials";  
}





//Once the "submit" button is pressed the scores are set to local storage and posted on the page//
postScore.addEventListener("click", function(event) {
    event.preventDefault();

    setScore.innerHTML = "";
    totalScore.innerHTML = "High Scores";
    player.setAttribute("class", "remove");
    restart.setAttribute("class", "start-over");
    clearScores.setAttribute("class", "clear");
    roster.setAttribute("class", "users");

    var initials = document.querySelector(".initials").value;
    localStorage.setItem("name", initials + " : " + score);

    var name = {
        name: initials,
        score: score
    }

    items.push(name);
    console.log(name);
    
    localStorage.setItem("name", JSON.stringify(items));
    console.log(items);
    
  
    items.forEach(myFunction);
});




// items.sort(function(a, b) {
//     console.log(b.score - a.score);
//     });




//Adding the highscores to the roster (manipulating the DOM)//
function myFunction(name) {
    var liTag = document.createElement("li");
    liTag.innerHTML = name.name + " : " + name.score;
    console.log(liTag);

    roster.appendChild(liTag);
}


   //Clearing local storage and high score values//
    clearScores.addEventListener("click", function(event) {
        event.preventDefault();
        window.localStorage.clear();
        roster.innerHTML = "";
  });

  




