import Player from "./player.js";

const gamesContainer = document.getElementById("games-container");
const playerBoard = document.createElement("div");
playerBoard.classList.add("gameboard");
playerBoard.dataset.board = "player-board";
const opponentBoard = document.createElement("div");
opponentBoard.classList.add("gameboard");
opponentBoard.dataset.board = "opponent-board";
const column = document.createElement("div");
column.classList.add("column");
const playerContainer = document.getElementById("player-container");
const opponnentContainer = document.getElementById("opponent-container");
gamesContainer.appendChild(playerContainer);
gamesContainer.appendChild(opponnentContainer);
const gamesEnd = document.getElementById("game-end");
const restartGameBtn = document.getElementById("restart-button");

//DOM Functions
const createBoards = () => {
  appendBoards();
  createRows(playerBoard, "player");
  createRows(opponentBoard, "opponent");
  createColumns(player, "player");
  createColumns(opponent, "opponent");
};

const createRows = (board, boardName) => {
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add(boardName);
    board.appendChild(row.cloneNode(true));
  }
};

const createColumns = (playerType, boardName) => {
  const rows = document.querySelectorAll(`.${boardName}`);
  const boardState = playerType.generateBoardState();
  let index = 0;

  rows.forEach((row) => {
    for (let i = 0; i < 10; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.dataset.coordinate = JSON.stringify(boardState[index].coordinate);

      if (boardState[index].isShip && boardName !== "opponent") {
        column.textContent = "ship";
      }
      if (boardName === "player") {
        column.classList.add("player-cell");
      }
      if (boardName === "opponent") {
        column.classList.add("opponent-cell");
      }

      row.appendChild(column);
      index++;
    }
  });
};

const appendBoards = () => {
  playerContainer.innerHTML = "";
  playerContainer.textContent = "Player Board";
  opponnentContainer.innerHTML = "";
  opponnentContainer.textContent = "Opponent Board";
  playerContainer.appendChild(playerBoard);
  opponnentContainer.appendChild(opponentBoard);
};

//Shows hit or miss if cell contains ship
const showHit = (gameboard, cell, cor) => {
  const isHit = gameboard.receiveAttack(cor);
  cell.textContent = isHit ? "hit" : "miss";
  gameboard.checkEndGame();
};

const placeShips = (playerType) => {
  playerType.placeRandomShips(playerType.ships.carrier);
  playerType.placeRandomShips(playerType.ships.battleship);
  playerType.placeRandomShips(playerType.ships.cruiser);
  playerType.placeRandomShips(playerType.ships.submarine);
  playerType.placeRandomShips(playerType.ships.destroyer);
};


//Game Functions
restartGameBtn.addEventListener("click", () => {
  restartGame();
});

const startGame = () => {
  createBoards();
  runGame();
};

const restartGame = () => {
  gamesEnd.textContent = "";

  //Player object
  player = new Player(false);
  playerGameboard = player.gameboard;
  placeShips(player);

  //Opponent Object
  opponent = new Player(true);
  opponentGameboard = opponent.gameboard;
  placeShips(opponent);

  // Clear gameboard containers
  playerBoard.innerHTML = "";
  opponentBoard.innerHTML = "";

  // Restart the game
  startGame();
};

const runGame = () => {
  //Event listener for attacking opponent
  const attackCPU = () => {
    const cells = document.querySelectorAll(".opponent-cell");

    const handleCellClick = (e) => {
      const coordinates = JSON.parse(e.target.dataset.coordinate);
      showHit(opponentGameboard, e.target, coordinates);
      e.target.removeEventListener("click", handleCellClick);

      if (opponentGameboard.loseGame || playerGameboard.loseGame) {
        // Remove the event listener if the game is over
        cells.forEach((cell) => {
          cell.removeEventListener("click", handleCellClick);
        });
        if (playerGameboard.loseGame) {
          gamesEnd.textContent = "CPU Wins";
        } else if (opponentGameboard.loseGame) {
          gamesEnd.textContent = "Player Wins";
        }
      } else {
        attackPlayer();
      }
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  };

  const attackedCoordinates = [];
  const attackPlayer = () => {
    const cells = document.querySelectorAll(".player-cell");
    const generatedCor = opponent.generateCoordinate();
    const existingCoordinate = attackedCoordinates.some((cor) => {
      if (JSON.stringify(cor) === JSON.stringify(generatedCor)) {
        return true;
      } else {
        return false;
      }
    });
    //If coordinate exists rerun the function
    if (existingCoordinate) {
      attackPlayer();
    } else {
      //Pushes coordinate into previously attacked coordinates
      attackedCoordinates.push(generatedCor);
      //Convert nodelist to array
      Array.from(cells).some((cell) => {
        if (cell.dataset.coordinate === JSON.stringify(generatedCor)) {
          showHit(playerGameboard, cell, generatedCor);
          //Stops iteration when match is found
          return true;
        } else {
          return false;
        }
      });
    }
  };

  attackCPU();
};

//Player object
let player = new Player(false);
let playerGameboard = player.gameboard;
placeShips(player);

//Opponent Object
let opponent = new Player(true);
let opponentGameboard = opponent.gameboard;
placeShips(opponent);

startGame();