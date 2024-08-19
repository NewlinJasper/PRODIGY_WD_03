const gameBoard = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.includes('') === false) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

    gameBoard.forEach(cell => {
        cell.textContent = '';
    });
}

gameBoard.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
