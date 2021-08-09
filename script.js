'use strict';
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let player1Name = document.querySelector('#player1-name');
let player2Name = document.querySelector('#player2-name');
let settingName1 = document.querySelector("#name--0");
let settingName2 = document.querySelector("#name--1");

let score0El = document.getElementById("score--0");
let score1El = document.getElementById("score--1");
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnClose = document.querySelector(".close-modal");
const btnGetStarted = document.querySelector(".btn-start");

let currentScore, scores, activeplayer, playing

const initial = function() {
    currentScore = 0;
    scores = [0, 0];
    activeplayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove('player--active');
}
initial();

const switchplayer = function() {
    document.getElementById(`current--${activeplayer}`)
      .textContent = 0;
    currentScore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}


// After rolling the dice
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generate a random number
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display the dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //3. Rolled 1
        if (dice !== 1) {
            currentScore = currentScore + dice;
            document.getElementById(`current--${activeplayer}`)
              .textContent = currentScore;
        } else {
            //Switch the player
            switchplayer();
        }
    }
})

// Clicking on the hold function
btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to the active player score
        scores[activeplayer] += currentScore;
        //  scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activeplayer}`)
          .textContent = scores[activeplayer];

        //2. Check if the players score is >= 50
        if (scores[activeplayer] >= 50) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activeplayer}`)
              .classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`)
              .classList.remove("player--active");
        } else {
            switchplayer();
        }
    }
})

btnNew.addEventListener("click",
    initial);

//Close button functionality
const hideModal = () => {
    modal.classList.add("hide");
    overlay.classList.add("hide");
}

const showModal = () => {
    modal.classList.remove("hide");
    overlay.classList.remove("hide");
}

btnClose.addEventListener("click", hideModal);

btnGetStarted.addEventListener("click", function(e) {
    e.preventDefault();
    hideModal();
    settingName1.textContent = player1Name.value;
    settingName2.textContent = player2Name.value;
})