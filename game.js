let score0 = 0;
let score1 = 0;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const diceEl = document.getElementById("dice");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

document.getElementById("btn--roll").addEventListener("click", function () {
  if (!playing) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

document.getElementById("btn--hold").addEventListener("click", function () {
  if (!playing) return;

  switch (activePlayer) {
    case 0:
      score0 += currentScore;
      score0El.textContent = score0;
      if (score0 >= 100) {
        endGame(0);
      } else {
        switchPlayer();
      }
      break;
    case 1:
      score1 += currentScore;
      score1El.textContent = score1;
      if (score1 >= 100) {
        endGame(1);
      } else {
        switchPlayer();
      }
      break;
  }
});

document.getElementById("btn--new").addEventListener("click", init);

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function endGame(winner) {
  playing = false;
  document.querySelector(`.player--${winner}`).style.background =
    "linear-gradient(to right,rgb(23, 213, 48),rgb(6, 83, 13))";
  diceEl.style.display = "none";
}

function init() {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.style.display = "block";

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
  player1El.style.background = "transparent";
}
