let currentPlayer = 'X';
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];
let player1Name = '';
let player2Name = '';

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const gameContainer = document.getElementById('gameContainer');
const nameInput = document.getElementById('nameInput');

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();

  if (p1 === '' || p2 === '') {
    alert("Please enter both player names.");
    return;
  }

  player1Name = p1;
  player2Name = p2;

  nameInput.style.display = "none";
  gameContainer.style.display = "block";

  gameActive = true;
  statusText.textContent = `Player ${player1Name} (X)'s turn`;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick() {
  const index = this.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === 'X' ? player1Name : player2Name;
    statusText.textContent = `🎉 ${winner} wins!`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const nextPlayer = currentPlayer === 'X' ? player1Name : player2Name;
    statusText.textContent = `Player ${nextPlayer} (${currentPlayer})'s turn`;
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${player1Name} (X)'s turn`;
  cells.forEach(cell => cell.textContent = '');
}
