/* declaring constants and variables */
const welcomeScreen = document.querySelector(".welcome-screen");
const gameRulesContainer = document.getElementById("game-rules-container");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const scoreContainer = document.querySelector(".score-container");
const gameRulesButton = document.getElementById("game-rules-button");
const readyButton = document.getElementById("ready-button");
const beginQuizButton = document.getElementById("begin-quiz-button");
const questionCount = document.querySelector(".number-of-question");
const timeLeft = document.querySelector(".time-left");
const nextButton = document.getElementById("next-question-button");
const yourScore = document.getElementById("your-score");
const tryAgain = document.getElementById("try-again-button");
const submitSpellButton = document.getElementById("submit-spell-button");
const submitSpellForm = document.getElementById("submit-spell-form");

let count = 11;
let countdown;
let questionNumber;
let scoreCount = 0;

/**
 * function to display the welcome screen when the window is loaded
 */
window.onload = function () {
    gameRulesContainer.classList.add("hide");
    quizContainer.classList.add("hide");
    welcomeScreen.classList.remove("hide");
};

/**
 * function to display the game rules container and its content
 */
gameRulesButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hide");
    quizContainer.classList.add("hide");
    gameRulesContainer.classList.remove("hide");
});

/**
 * function to close the game rules container and its content
 */
readyButton.addEventListener("click", function () {
    quizContainer.classList.add("hide");
    gameRulesContainer.classList.add("hide");
    welcomeScreen.classList.remove("hide");
});

/**
 * function to display the quiz container and its content
 */
beginQuizButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hide");
    gameRulesContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    initial();
});

/**
 * function to initially clear the quiz and restart
 */
function initial() {
    questionContainer.innerHTML = "";
    questionNumber = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizGenerator();
    quizDisplay(questionNumber);
}
/**
 * function to get a random question from the JSON file
*/ 
function getRandomQuestions(questions) {
    return questions.sort(() => Math.random() - 0.5).slice(0, 20);
}

const questionsArray = [];
fetch('./assets/data/questions.json')
    .then((response) => response.json())
    .then((data) => questionsArray.push(...getRandomQuestions((data))));


/**
 * function to display a timer which counts down from 10
*/
function timerDisplay() {
    countdown = setInterval(function () {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNextQuestion();
        }
    }, 1000);
}

/**
 * function to generate the quiz by building random questions using the questionsArray
 * functional code attributed to https://www.youtube.com/watch?v=WiLTsxjCmWQ
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
        div.classList.add("question-container-mid", "hide");

        questionCount.innerHTML = 1 + " of " + questionsArray.length + " questions";

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

        questionContainer.appendChild(div);
    }
}

/**
 * function to check for the correct answer and if right, increment the score
 * functional code attributed to https://www.youtube.com/watch?v=WiLTsxjCmWQ
 */
function checkAnswer(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("question-container-mid")[questionNumber];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === questionsArray[questionNumber].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach(function (element) {
            if (element.innerText === questionsArray[questionNumber].correct) {
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
 * function to display the next question, increase the questionNumber by 1 and display the final score if there are no more questions remaining. 
*  users can advance to the next question in the quiz without answering the current one, if they choose not to or don't know the answer. 
*  this intentional feature allows for flexibility in progressing through the quiz.
*/
function displayNextQuestion() {
    questionNumber += 1;

    if (questionNumber == questionsArray.length) {
        quizContainer.classList.add("hide");
        welcomeScreen.classList.add("hide");
        gameRulesContainer.classList.add("hide");
        submitSpellButton.classList.add("hide");
        scoreContainer.classList.remove("hide");
        yourScore.innerHTML = "Congratulations! Your score is " +
            scoreCount + " out of " + questionNumber;
    } else {
        questionCount.innerHTML = questionNumber + 1 + " of " + questionsArray.length + " questions";

        quizDisplay(questionNumber);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}
nextButton.addEventListener("click", displayNextQuestion);

/**
 * function to display the quiz
 */
function quizDisplay(questionNumber) {
    let quizCards = document.querySelectorAll(".question-container-mid");

    quizCards.forEach(function (card) {
        card.classList.add("hide");
    });
    quizCards[questionNumber].classList.remove("hide");
}

/**
 * function to display the form to submit a spell
 */
submitSpellButton.addEventListener("click",
function displaySubmitSpellForm() {
    welcomeScreen.classList.add("hide");
    gameRulesContainer.classList.add("hide");
    submitSpellForm.classList.remove("hide");
  });