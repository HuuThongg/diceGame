'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew  = document.querySelector('.btn--new');
const btnRoll  = document.querySelector('.btn--roll');
const btnHold  = document.querySelector('.btn--hold');
let currentScore, switchPlayer,playing, scores;

const init = function(){
    currentScore = 0;
    switchPlayer = 0;
    playing = true;
    scores=[0,0];

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;


    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}


    init();
    const switchd = function(){
        currentScore = 0;
        document.getElementById(`current--${switchPlayer}`).textContent = 0;
        switchPlayer = switchPlayer ===1 ? 0 : 1;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    };


btnRoll.addEventListener('click',(e)=>{
    if(playing){

    diceEl.classList.remove('hidden');
    
    // 1. generating a random dice roll
    const randomVaule = Math.floor(Math.random()*6+1);
    diceEl.src = `dice-${randomVaule}.png`;
    
    // 2. display dice
    if(randomVaule !== 1){
        currentScore += randomVaule;
        document.getElementById(`current--${switchPlayer}`).textContent = currentScore;
    }
    else{
        switchd();
    }
}
    
});

btnHold.addEventListener('click',(e)=>{
    if(playing){
        scores[switchPlayer] += currentScore;
    
    document.getElementById(`score--${switchPlayer}`).textContent = scores[switchPlayer];
    
    if(scores[switchPlayer] >= 20){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${switchPlayer}`).classList.add('player--winner');
         document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    else{
        switchd();
    }
    }
});


btnNew.addEventListener('click',init);
