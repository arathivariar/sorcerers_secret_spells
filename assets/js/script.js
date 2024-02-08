/* Declaring the constants and variables */
const questionCount = document.querySelector(".number-of-question");
const gameContainer = document.getElementById("container");
const magicEffect = document.querySelectorAll(".magic-effect");
const nextButton = document.getElementById("next-question-button");
const playerScore = document.getElementById("player-score");
const quizContainer = document.getElementById("quiz-container");
const tryAgain = document.getElementById("try-again-button");
const scoreContainer = document.querySelector(".score-container");
const timeLeft = document.querySelector(".time-left");
const beginButton = document.getElementById("begin-button");
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
