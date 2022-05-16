const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//displays circles in place of missing letters//

const circles = function (word) {
    const letterCircle = [];
    for (const letter of word) {
        console.log(letter);
        letterCircle.push("●");
    }
    wordInProgress.innerText = letterCircle.join("");
};

circles(word);

//click event for Guess button//

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guessInput = textInput.value;
    console.log(guessInput);
    textInput.value="";
});