let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
const screenResult = document.querySelector('.js-score');

let isAutoPlaying = false;
let intervalId;


const autoPlayButton = document.querySelector('.js-auto-play-button');

autoPlayButton.addEventListener('click', () => {
    autoPlay();
});

function autoPlay() {

    if (!isAutoPlaying) {
        
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop Playing';
    }else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'Auto Play';
    }


}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r')
        playGame('rock');
    
    else if (event.key === 'p')
        playGame('paper');

    else if (event.key === 's')
        playGame('scissors');

    else if (event.key === 'a')
        autoPlay();

    else if (event.key === 'Backspace')
        resetScore();
});

function playGame(playerMove) {
    const computerMoveAux = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMoveAux === 'rock')
            result = 'You lose.';
        else if (computerMoveAux === 'paper')
            result = 'You win.';
        else if (computerMoveAux === 'scissors')
            result = 'Tie.';

    } else if (playerMove === 'paper') {
        if (computerMoveAux === 'rock')
            result = 'You win.';
        else if (computerMoveAux === 'paper')
            result = 'Tie.';
        else if (computerMoveAux === 'scissors')
            result = 'You lose.';
            
    } else {
        if (computerMoveAux === 'rock')
            result = 'Tie.';
        else if (computerMoveAux === 'paper')
            result = 'You lose.';
        else if (computerMoveAux === 'scissors') 
            result = 'You win.';
    }

    if (result === 'You win.')
        score.wins += 1;
    else if (result === 'You lose.')
        score.losses += 1;
    else 
        score.ties += 1;

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.result').innerHTML  = result;

    screenResult.innerHTML = `You <img class="move-icon" src="/img/${playerMove}-emoji.png" alt=""> - <img class="move-icon" src="/img/${computerMoveAux}-emoji.png" alt=""> Computer<br><br>

    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    }else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
    resetScore();
});

function resetScore() {

    const resetConfirmMessage = document.querySelector('.reseting-confirmation');

    resetConfirmMessage.innerHTML = `<p>Are you sure you want to reset the score?</p><button class="js-yes">Yes</button><button class="js-no">No</button>`;

    document.querySelector('.js-yes').addEventListener('click', () => {
        resetConfirmMessage.innerHTML = '';

        score.wins = 0;
        score.losses = 0;
        score.ties = 0;

        localStorage.removeItem('score');
        document.querySelector('.result').innerHTML  = '';
        screenResult.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    });

    document.querySelector('.js-no').addEventListener('click', () => {
        resetConfirmMessage.innerHTML = '';

    });
}