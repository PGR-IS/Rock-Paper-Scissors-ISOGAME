let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let autoPlaying = false;

updateScoreElement();

/*
if (!score) {
score = {
    wins: 0,
    losses: 0,
    ties: 0
};
}
*/

function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = '';

if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose';
    } else if (computerMove === 'paper') {
    result = 'You win';
    } else if (computerMove === 'scissors') {
    result = 'Tie';
    }

} else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
    result = 'You win';
    } else if (computerMove === 'paper') {
    result = 'Tie';
    } else if (computerMove === 'scissors') {
    result = 'You lose';
    }
    
} else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
    result = 'Tie';
    } else if (computerMove === 'paper') {
    result = 'You lose';
    } else if (computerMove === 'scissors') {
    result = 'You win';
    }
}

if (result === 'You win') {
    score.wins += 1;
} else if (result === 'You lose') {
    score.losses += 1;
} else if (result === 'Tie') {
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You <img class="move" src="images/${playerMove}-emoji.png"> - <img class="move" src="images/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElement() {
document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
}

return computerMove;
}

let intervalId;

function autoPlay(){
    const autoPlayLabel = document.getElementById("auto-play");
    if(autoPlaying === false){
        autoPlaying = true;
        autoPlayLabel.innerText = "Stop auto-play";
        intervalId = setInterval(() => {
            playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
    }else if(autoPlaying === true){
        autoPlayLabel.innerText = "auto-play";
        autoPlaying = false;
        clearInterval(intervalId);
    }
}

document.getElementById("auto-play")
    .addEventListener("click", (event) => {
        autoPlay();
    });