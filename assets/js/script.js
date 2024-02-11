/* Declaring the constants and variables */
const questionCount = document.querySelector(".number-of-question");
const gameContainer = document.getElementById("question-container");
const magicEffect = document.querySelectorAll(".magic-effect");
const nextButton = document.getElementById("next-question-button");
const playerScore = document.getElementById("player-score");
const quizContainer = document.getElementById("quiz-container");
const tryAgain = document.getElementById("try-again-button");
const scoreContainer = document.querySelector(".score-container");
const timeLeft = document.querySelector(".time-left");
const beginQuizButton = document.getElementById("begin-quiz-button");
const gameRulesButton = document.getElementById("game-rules-button");
const gameRulesText = document.getElementById("game-rules-text");
const submitSpellButton = document.getElementById("submit-spell-button");
const submitSpellForm= document.getElementById("submit-spell-form");
const welcomeScreen = document.querySelector(".welcome-screen");
let count = 21;
let countdown;
let questionNumber;
let scoreCount = 0;

/* adding magic effect to the buttons */
magicEffect.forEach((magicEffect) => {
    const magicLines = magicEffect.querySelectorAll("rect");
    const rx = getComputedStyle(magicEffect).borderRadius;

    magicLines.forEach((line) => {
        line.setAttribute("rx", rx);
    });
});

/**
 * function to display the welcome screen with the "Let's Begin" button when the window is loaded
 */
window.onload = function () {
    welcomeScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
};

/**
 * function to display the quiz container and the button to start the quiz
 */
beginQuizButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    initial();
});
/**
 * function to initially clear the quiz and restart
 */
function initial() {
    gameContainer.innerHTML = "";
    questionNumber = 0;
    scoreCount = 0;
    count = 21;
    clearInterval(countdown);
    timerDisplay();
    quizGenerator();
    quizDisplay(questionNumber);
}
/**
 * function to get a random question from the JSON file
 *  */ 
function getRandomQuestions(questions) {
    return questions.sort(() => Math.random() - 0.5).slice(0, 20);
}

const questionsArray = [];

fetch('./assets/questions.json')
    .then((response) => response.json())
    .then((data) => questionsArray.push(...getRandomQuestions((data))));

/**
 * function to display a timer which counts down from 15
 */
function timerDisplay() {
    countdown = setInterval(function () {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNextQuestion();
        }
    }, 1500);
}
/**
 * function to generate the quiz by building random questions using the questionsArray
 */
function quizGenerator() {
    questionsArray.sort(function () {
        return Math.random() - 0.5;
    });

    for (let i of questionsArray) {
        i.options.sort(function () {
            return Math.random() - 0, 5;
        });
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        questionCount.innerHTML = 1 + " of " + questionsArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="${checkAnswer.name}(this)">
        ${i.options[0]}</button>
        <button class="option-div" onclick="${checkAnswer.name}(this)">
        ${i.options[1]}</button>
        <button class="option-div" onclick="${checkAnswer.name}(this)">
        ${i.options[2]}</button>
        <button class="option-div" onclick="${checkAnswer.name}(this)">
        ${i.options[3]}</button>
        `;

        gameContainer.appendChild(div);
    }
}
/**
 * function to check for the correct answer and if right, increment the score
 */
function checkAnswer(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === questionsArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach(function (element) {
            if (element.innerText === questionsArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach(function (element) {
        element.disabled = true;
    });
}
/**
 * function to try the quiz again by hiding the score container and displaying the quiz container
 */
tryAgain.addEventListener("click", function () {
    initial();
    quizContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

/**
 * function to display the next question, increase the questionNumber by 1 and display the final score if there are no more questions remaining 
 */

function displayNextQuestion() {
    questionNumber += 1;

    if (questionNumber == questionsArray.length) {
        quizContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        playerScore.innerHTML = "Final Score is " +
            scoreCount + " out of " + questionNumber;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + questionsArray.length + " Question";

        quizDisplay(questionNumber);
        count = 21;
        clearInterval(countdown);
        timerDisplay();
    }
}

nextButton.addEventListener("click", displayNextQuestion);
/**
 * function to display the quiz
 */
function quizDisplay(questionCount) {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach(function (card) {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
}
/**
 * function to display the game rules as a pop up text
 */
gameRulesButton.addEventListener("click",
function displayGameRules() {
    gameRulesText.classList.toggle("show");
  })
/**
 * function to display the form to submit a spell
 */
submitSpellButton.addEventListener("click",
function displaySubmitSpellForm() {
    submitSpellForm.classList.toggle("show");
  })