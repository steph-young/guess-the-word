const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessed = [];
let remainingGuesses = 8;

//fetches random word//

const getWord = async function () {
    const showWord = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await showWord.text();
    const wordArray = data.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    circles(word);
};

getWord();

//displays circles in place of missing letters//

const circles = function (word) {
    const letterCircle = [];
    for (const letter of word) {
        console.log(letter);
        letterCircle.push("●");
    }
    wordInProgress.innerText = letterCircle.join("");
};


//click event for Guess button//

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText ="";
    
    const guessInput = textInput.value;
    const goodGuess = validate(guessInput);

    if (goodGuess) {
        makeGuess(guessInput);
    }
    textInput.value = "";
    
});

//accepts and validates player's guesses//

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
        countGuesses(guessInput); 
        showGuessed();
        updateWordInProgress(guessed);
    }
};

//displays guessed letters//

const showGuessed = function () {
    guessedLetters.innerHTML ="";
    for (const letter of guessed) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
    }
};

const updateWordInProgress = function (guessed) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showCorrectLetter = [];
    for (const letter of wordArray) {
        if (guessed.includes(letter)) {
            showCorrectLetter.push(letter.toUpperCase());
        } else {
            showCorrectLetter.push("●");
        }
    }
    wordInProgress.innerText = showCorrectLetter.join("");
    didYouWin();
};

//counts remaining guesses//

const countGuesses = function (guessInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guessInput)) {
        message.innerText = `That letter is NOT in the word! Try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Got one! Keep going!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const didYouWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};





