document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const vsHumanButton = document.getElementById('vsHuman');
    const vsComputerButton = document.getElementById('vsComputer');

    let gameState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = false;
    let vsComputer = false;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // Initialize the game board
    function initializeBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(e) {
        if (!gameActive) return;
        
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, clickedCellIndex);
        checkResult();
        
        if (vsComputer && gameActive && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }

    // Update cell and game state
    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? '#4CAF50' : '#2196F3';
    }

    // Check game result
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Computer's move
    function computerMove() {
        if (!gameActive) return;
        
        // Simple AI: choose random empty cell
        let emptyCells = gameState.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
            updateCell(cell, randomIndex);
            checkResult();
        }
    }

    // Reset game
    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = false;
        currentPlayer = 'X';
        status.textContent = 'Select game mode to start';
        initializeBoard();
    }

    // Start game vs human
    function startHumanGame() {
        vsComputer = false;
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        initializeBoard();
    }

    // Start game vs computer
    function startComputerGame() {
        vsComputer = true;
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        initializeBoard();
    }

    // Event listeners
    resetButton.addEventListener('click', resetGame);
    vsHumanButton.addEventListener('click', startHumanGame);
    vsComputerButton.addEventListener('click', startComputerGame);

    // Initialize
    initializeBoard();
});
