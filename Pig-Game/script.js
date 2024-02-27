"use strict";

const Player0El = document.querySelector(".player--0");
const Player1El = document.querySelector(".player--1");
const Score0El = document.querySelector("#score--0");
const Score1El = document.getElementById("score--1");
const Current0El = document.getElementById("current--0");
const Current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const newGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  Score0El.textContent = 0;
  Score1El.textContent = 0;
  Current0El.textContent = 0;
  Current1El.textContent = 0;

  diceEl.classList.add("hidden");
  Player0El.classList.remove("player--winner");
  Player1El.classList.remove("player--winner");
  Player0El.classList.add("player--active");
  Player1El.classList.remove("player--active");
};

newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player0El.classList.toggle("player--active");
  Player1El.classList.toggle("player--active");
};

//Rolling Dice funcnality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display a dice matching to number
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // condition for not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", newGame);
