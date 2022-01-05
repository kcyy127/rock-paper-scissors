const hands = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
    return hands[Math.floor(Math.random() * 3)];
}

function formatText(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    playerSelection = formatText(playerSelection);

    let win = 0; // player lose default

    switch (playerSelection) {
        case 'Rock':
            if (computerSelection === 'Rock') {
                win = 2;
            } else if (computerSelection === 'Scissors') {
                win = 1;
            }
            break;
        case 'Paper':
            if (computerSelection === 'Paper') {
                win = 2;
            } else if (computerSelection === 'Rock') {
                win = 1;
            }
            break;
        case 'Scissors':
            if (computerSelection === 'Scissors') {
                win = 2;
            } else if (computerSelection === 'Paper') {
                win = 1;
            }
            break;
        default:
            throw 'Cannot read player input';
    }
    return win;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    while (playerScore < 5 && computerScore < 5) {
        const playerSelection = window.prompt("Input: ");
        const computerSelection = computerPlay();
        const res = playRound(playerSelection, computerSelection);
        if (res) {
            computerScore++;
        } else {
            playerScore++;
        }
        console.log(playerScore, computerScore);
    }
}

// game();

const buttons = document.querySelectorAll(".hand");
const scorePlayer = document.getElementById("player-score");
const scoreComputer = document.getElementById('computer-score');

let scoreP = 0, scoreC = 0;

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        this.classList.add("pressed");
        const win = playRound(this.dataset.hand, computerPlay());
        if (win) {
            scoreP++;
            updateScoreBoard();
        } else {
            scoreC++;
            updateScoreBoard();

        }

        if (scoreP >= 5) {
            alert("You Win!");
            scoreP = 0;
            scoreC = 0;
            updateScoreBoard();
        } else if (scoreC >= 5) {
            alert("You Lose!");
            scoreP = 0;
            scoreC = 0;
            updateScoreBoard();
        }
    });

    button.addEventListener('transitionend', function(e) {
        if (e.propertyName != 'transform') {
            return;
        }
        this.classList.remove("pressed");
    })
})

function updateScoreBoard() {
    scorePlayer.textContent = scoreP;
    scoreComputer.textContent = scoreC;
}
