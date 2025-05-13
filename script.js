let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("board");

function setMode(mode) {
    vsComputer = mode === "computer";
    resetGame();
}

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.addEventListener("click", () => handleMove(index));
        cell.textContent = board[index];
        boardElement.appendChild(cell);
    });
}

function handleMove(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    createBoard();
    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    } else if (!board.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (vsComputer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyIndices = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleMove(randomIndex);
}

function checkWin() {
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = "";
    createBoard();
}

window.onload = createBoard;


   
