const choices = ['rock', 'paper', 'scissors'];
const playerScoreDiv = document.getElementById('playerScore');
const aiScoreDiv = document.getElementById('aiScore');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartGame');
const startButton = document.getElementById('startGame');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const closeModal = document.getElementsByClassName('close')[0];

let playerScore = 0;
let aiScore = 0;
const winningScore = 5; // First to reach 5 points wins

// Start Game Button Click Event
startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    document.querySelector('.scoreboard').classList.remove('hidden');
    document.querySelector('.choices').classList.remove('hidden');
    resultMessage.classList.remove('hidden');
});

document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', () => {
        if (playerScore < winningScore && aiScore < winningScore) {
            playRound(button.id);
        }
    });
});

function playRound(playerChoice) {
    const aiChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (playerChoice === aiChoice) {
        result = "It's a draw!";
    } else if (
        (playerChoice === 'rock' && aiChoice === 'scissors') ||
        (playerChoice === 'paper' && aiChoice === 'rock') ||
        (playerChoice === 'scissors' && aiChoice === 'paper')
    ) {
        result = `You win! ${capitalize(playerChoice)} beats ${aiChoice}.`;
        playerScore++;
        updateScores();
    } else {
        result = `You lose! ${capitalize(aiChoice)} beats ${playerChoice}.`;
        aiScore++;
        updateScores();
    }

    resultMessage.textContent = result;

    if (playerScore === winningScore || aiScore === winningScore) {
        endGame();
    }
}

function updateScores() {
    playerScoreDiv.textContent = `Player: ${playerScore}`;
    aiScoreDiv.textContent = `AI: ${aiScore}`;
}

function endGame() {
    if (playerScore === winningScore) {
        winMessage.textContent = `Congratulations! You won the game!`;
    } else {
        winMessage.textContent = `Sorry! The AI won the game!`;
    }

    winModal.classList.add('visible');
    restartButton.classList.remove('hidden');
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Restart Game
restartButton.addEventListener('click', () => {
    playerScore = 0;
    aiScore = 0;
    updateScores();
    resultMessage.textContent = 'Choose Rock, Paper, or Scissors to play!';
    restartButton.classList.add('hidden');
    winModal.classList.remove('visible');
});

// Close the modal
closeModal.onclick = () => {
    winModal.classList.remove('visible');
};

// Close the modal when clicking outside of it
window.onclick = (event) => {
    if (event.target === winModal) {
        winModal.classList.remove('visible');
    }
};
