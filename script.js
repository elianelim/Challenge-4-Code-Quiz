var countDownInterval;
var counter = 0;
var quizNumber = 0;
var hasAnswered = false;
var userScores = 0;
var highScore = [];

//quiz questions
var quiz = [
    {
        question: "What do we use to store groups of data in a single variable?",
        choices: ["arrays", "variables", "function", "div"],
        answer: 0,
    },
    {
        question: "What is a string?",
        choices: ["'Hello'", "true", "10.888", "865Password"],
        answer: 0,
    },

    {
        question: "What can function take?",
        choices: ["arguement", "variables", "parameters", "value"],
        answer: 2,
    },

    {
        question: "What is a boolean?",
        choices: ["0.9", "true", "10.888", "865Password"],
        answer: 1,
    }
];

//reset timer before quiz starts
updateTime();

//when user clicks on the start quiz button to start the quiz
var startQuizButton = document.getElementById("start_quiz");
startQuizButton.addEventListener("click", startQuiz);


//function to update timer
function updateTime() {
    var timeLabelEl = document.getElementById("timeLabel");
    timeLabelEl.innerText = `Time: ${counter}`;
}

//function after quiz ends
function submitScore() {
    var initialsLabel = document.getElementById("yourInitials");
    var nickName = "Anonymous";
    if (initialsLabel.value != "") {
        nickName = initialsLabel.value;
        initialsLabel.value = ""; //reset the value from the name for the next quiz, clearing the input box
    }
    //high score will be push onto the scoreboard
    highScore.push({ name: nickName, score: userScores });

    //sorting by descending order to have only top 3 highscore in array highscore
    highScore.sort((scoreA, scoreB) => {

        //decending logic 
        if (scoreA.score < scoreB.score) {
            return 1; //so means scoreB will move to the left and scoreA will move to the right, decending order

        } else if (scoreA.score > scoreB.score) {
            return -1; //scoreA move to the left, scoreB will move to the right, decending order

        } else {
            return 0;
        }

    });

    //only keeping top 3 highscores. using slice method to eliminate scores
    if (highScore.length > 3) {
        highScore = highScore.slice(0, 3);
    }

    //after slicing, score label will be displayed
    var showScoreLabel = document.getElementById("showScoreLabel");
    showScoreLabel.classList.add("hideItem");

    //retriving the game main screen to start new game
    var startScreenPanelElement = document.getElementById("startQuizPanel");
    startScreenPanelElement.classList.remove("hideItem");

    console.log(highScore);
}

//reset game data after quiz end
function startQuiz() {
    counter = quiz.length * 10;
    userScores = 0;
    quizNumber = 0;
    hasAnswered = false; //reset the game data

//clear countDown timer when quiz ends
countDownInterval = setInterval(() => {
    if (counter <= 0) {
        counter = 0;

        //if user did not answer all the question, then the quiz will end
        clearInterval(countDownInterval);

        //to hide the questions
        if (!hasAnswered) {
            var questionPanel = document.getElementById("questionPanel");
            questionPanel.classList.add("hideItem");
            //Display High Score
            showResultScreen();

        } else {
            var goNextBtn = document.getElementById("goNextBtn");
            goNextBtn.innerText = "Show Result";
        }

        updateTime();
        return; //if quiz ends before the time ends, the code below will not run
        }
        counter -= 1;
    
        updateTime(counter);
    }, 1000); 

    var startScreenPanelElement = document.getElementById("startQuizPanel");
    startScreenPanelElement.classList.add("hideItem");

    //To show question
    var questionPanel = document.getElementById("questionPanel");
    questionPanel.classList.remove("hideItem");
    updateQuestion();
     
}
function updateQuestion() {
    var question = document.getElementById("questionLabel");
    question.innerText = quiz[quizNumber].question;
    var choicesElementList = document.querySelectorAll("#choice");
    for (var i = 0; i < quiz[quizNumber].choices.length; ++i) {
        choicesElementList[i].innerText = quiz[quizNumber].choices[i];
    }
}

function answerQn(choices) {
    if (hasAnswered) {
        console.log("You have answered this question!");
        return; 
    }

    console.log("Your choice is " + choices);
    var currentQn = quiz[quizNumber];
    hasAnswered = true;
    var answerResultWrapper = document.getElementById("answerResultLabel");
    answerResultWrapper.classList.remove("hideItem");
    var resultLabel = document.getElementById("resultLabel");
    var goNextBtn = document.getElementById("goNextBtn");

    //if question is answered correctly
    if (currentQn.answer == choices) {
        goNextBtn.innerText = "Next Question";
        answerResultWrapper.classList.add("correctLabel");
        resultLabel.innerText = "CORRECT";
        userScores += 25;
    }   else {

        //when question is answered wrongly
        answerResultWrapper.classList.add("wrongLabel");
        counter -= 10;
        updateTime();
        if (counter <= 0) {
            goNextBtn.innerText = "Show Result";
        } else {
            goNextBtn.innerText = "Next Question"
        }
        resultLabel.innerText = "WRONG";
        }

     // on the last question
    if (quizNumber == quiz.length - 1) {
        userScores += counter;
        goNextBtn.innerText = "Show Result";
        clearInterval(countDownInterval);
    }
}

function goNextQuestion() {
    if (counter <= 0) {
        //when the time is up
        showResultScreen();
        return;
    }

    var answerResultWrapper = document.getElementById("answerResultLabel");

    console.log("answered quizNumber: ", quizNumber);
    quizNumber += 1;
    console.log("Going to the next question");
    console.log("next quizNumber: ", quizNumber);
    console.log("Number of quiz: ", quiz.length);
    if (quizNumber < quiz.length) {
        console.log("update question to the next question");
        answerResultWrapper.classList.add("hideItem");
        answerResultWrapper.classList.remove("correctLabel");
        answerResultWrapper.classList.remove("wrongLabel");
        hasAnswered = false; //reset to detect if next question is answered
        updateQuestion();
    }   else {
        console.log("No more next question");
        //end of quiz
        showResultScreen();
        //since questions has all been answered, we can stop the timer.
        clearInterval(countDownInterval);
    }
}

function showResultScreen() {
    var answerResultWrapper = document.getElementById("answerResultLabel");
    console.log("Show result screen");
    answerResultWrapper.classList.add("hideItem");
    answerResultWrapper.classList.remove("correctLabel");
    answerResultWrapper.classList.remove("wrongLabel");
    var questionPanel = document.getElementById("questionPanel");
    questionPanel.classList.add("hideItem");

    var showScoreLabel = document.getElementById("showScoreLabel");
    showScoreLabel.classList.remove("hideItem");

    var scoreLabel = document.getElementById("showScoreLabel");
    scoreLabel.innerText = "Your Score: " + userScores;
}

function showHighScore() {
    var highScorePanel = document.getElementById("highScoreLabel");
    highScorePanel.classList.remove("hideItem");

    var scoreListLabel = document.getElementById("scoreListLabel");
    scoreListLabel.innerHTML = ""; 

    if (highScore.length > 0) {
        var rank = 1;
        for (var scoreData of highScore) {
            scoreListLabel.innerHTML += `<div>${rank}. ${scoreData.name} - ${scoreData.score}</div>`;
            rank += 1;
        }
    }   else {
        //If there is not high score, will display
        scoreListLabel.innerText = "No Score Yet";
    }
} 

function closeHighScore() {
    var highScorePanel = document.getElementById("highScoreLabel");
    highScorePanel.classList.add("hideItem");
}