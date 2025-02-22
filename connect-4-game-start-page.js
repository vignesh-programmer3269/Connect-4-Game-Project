let rows = 6;
let columns = 7;

let playerRed = "R";
let playerGreen = "G";
let currentPlayer;

let gameOver = false;
let board;
let currentColumn;

const startPage = document.getElementById("start-page");
const chooseSection = document.getElementById("choose-section");

const chooseRed = document.getElementById("choose-red");
const chooseGreen = document.getElementById("choose-green");

const greenCoins = document.getElementById("green-coins");
const redCoins = document.getElementById("red-coins");

const gameSection = document.getElementById("game-section");

const redWon = document.getElementById("red-won");
const redLoss = document.getElementById("red-loss");
const greenWon = document.getElementById("green-won");
const greenLoss = document.getElementById("green-loss");
const playAgainGreen = document.getElementById("play-again-green-btn");
const palyAgainRed = document.getElementById("play-again-red-btn");

let startBtn = document.getElementById("start-game-btn");
startBtn.addEventListener("click", () => {
  startPage.style.display = "none";
  chooseColor();
});

chooseGreen.addEventListener("click", () => {
  currentPlayer = playerGreen;
  chooseSection.style.display = "none";
  setGame();
});
chooseRed.addEventListener("click", () => {
  currentPlayer = playerRed;
  chooseSection.style.display = "none";
  setGame();
});

function chooseColor() {
  chooseSection.style.display = "flex";
}

function setGame() {
  gameSection.style.display = "inline";

  currentColumn = [5, 5, 5, 5, 5, 5, 5];

  board = [];
  const boardEl = document.getElementById("board");

  boardEl.textContent = "";
  redCoins.textContent = "";
  greenCoins.textContent = "";

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      //JS
      row.push(" ");

      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = r + "-" + c;
      tile.addEventListener("click", setPiece);
      boardEl.appendChild(tile);
    }
    board.push(row);
  }

  for (let piece = 0; piece < 21; piece++) {
    const redPiece = document.createElement("div");
    const greenPiece = document.createElement("div");

    redPiece.classList.add("tile", "red-coins");
    redCoins.appendChild(redPiece);

    greenPiece.classList.add("tile", "green-coins");
    greenCoins.appendChild(greenPiece);
  }

  currentPlayerText();
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coord = this.id.split("-"); //id='0-0' --> [0,0]
  let r = parseInt(coord[0]);
  let c = parseInt(coord[1]);

  r = currentColumn[c];

  if (r < 0) {
    return;
  }

  board[r][c] = currentPlayer;
  let tile = document.getElementById(r + "-" + c);

  if (currentPlayer == playerRed) {
    const redPiecesContainer = document.getElementById("red-coins");
    redPiecesContainer.removeChild(redPiecesContainer.children[0]);

    tile.classList.add("red-piece");
    currentPlayer = playerGreen;
  } else {
    const greenPiecesContainer = document.getElementById("green-coins");
    greenPiecesContainer.removeChild(greenPiecesContainer.children[0]);

    tile.classList.add("green-piece");
    currentPlayer = playerRed;
  }

  r -= 1; // Updating the ro heigh for the column
  currentColumn[c] = r; // Updating the array

  currentPlayerText();
  checkWinner();
}

function currentPlayerText() {
  const currentPlayEl = document.getElementById("current-play");
  currentPlayEl.textContent =
    currentPlayer == playerRed
      ? "Red 🔴! It's your turn. Get your place."
      : "Green 🟢! It's your turn. Get your place.";
}

function checkWinner() {
  //Horizontally
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r][c + 1] &&
        board[r][c + 1] == board[r][c + 2] &&
        board[r][c + 2] == board[r][c + 3]
      ) {
        setWinner(r, c);
        return;
      }
    }
  }

  //Vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r + 1][c] &&
        board[r + 1][c] == board[r + 2][c] &&
        board[r + 2][c] == board[r + 3][c]
      ) {
        setWinner(r, c);
        return;
      }
    }
  }

  //anti diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r + 1][c + 1] &&
        board[r + 1][c + 1] == board[r + 2][c + 2] &&
        board[r + 2][c + 2] == board[r + 3][c + 3]
      ) {
        setWinner(r, c);
        return;
      }
    }
  }

  //diagonally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r - 1][c + 1] &&
        board[r - 1][c + 1] == board[r - 2][c + 2] &&
        board[r - 2][c + 2] == board[r - 3][c + 3]
      ) {
        setWinner(r, c);
        return;
      }
    }
  }
}

function setWinner(r, c) {
  const currentPlayEl = document.getElementById("current-play");
  currentPlayEl.textContent = "";

  redCoins.style.display = "none";
  greenCoins.style.display = "none";

  if (board[r][c] == playerRed) {
    redWon.style.display = "flex";
    greenLoss.style.display = "flex";
    playAgainGreen.style.display = "inline";
  } else {
    greenWon.style.display = "flex";
    redLoss.style.display = "flex";
    palyAgainRed.style.display = "inline";
  }

  gameOver = true;
}

palyAgainRed.addEventListener("click", () => {
  gameOver = false;
  resetGame();
});
playAgainGreen.addEventListener("click", () => {
  gameOver = false;
  resetGame();
});

function resetGame() {
  gameSection.style.display = "none";
  redWon.style.display = "none";
  redLoss.style.display = "none";
  greenWon.style.display = "none";
  greenLoss.style.display = "none";
  playAgainGreen.style.display = "none";
  palyAgainRed.style.display = "none";

  redCoins.style.display = "flex";
  greenCoins.style.display = "flex";
  chooseColor();
}
