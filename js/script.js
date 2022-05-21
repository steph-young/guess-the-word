const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessed = [];

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
    message.innerText ="";
    
    const guessInput = textInput.value;
    const goodGuess = validate(guessInput);

    if (goodGuess) {
        makeGuess(guessInput);
    }
    textInput.value="";
    
});

//checks player's input//

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Oops, we didn't get that. Try entering a letter from A to Z again.";
    } else if (input.length > 1) {
        message.innerText = "Please enter just one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guessInput) {
    guessInput = guessInput.toUpperCase();
    if (guessed.includes(guessInput)) {
        message.innerText = "You have already guessed that letter. Try again!";
    } else {
        guessed.push(guessInput);
        console.log(guessed);
    }
};

