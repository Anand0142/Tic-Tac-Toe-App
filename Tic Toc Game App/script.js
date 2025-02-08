const cells = document.querySelectorAll('[data-cell]');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-btn');
const gameBoard = document.getElementById('game-board');

let currentPlayer = 'X';
let board = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    // Update board and UI
    if (!board[index]) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWin(currentPlayer)) {
            showResult(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell)) {
            showResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for a win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Show result screen
function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
}

// Start a new game
function startNewGame() {
    board.fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', handleClick);
    });
    resultScreen.style.display = 'none';
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameButton.addEventListener('click', startNewGame);
