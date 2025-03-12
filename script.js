import Player from "./player.js";

//Player object
let player = new Player();
const playerGameboard = player.gameboard;
const playerShips = player.gameboard.ships;
player.gameboard.placeShip(player.ships.carrier, "horizontal", [0, 0]);
player.gameboard.placeShip(player.ships.battleship, "vertical", [9, 5]);
player.gameboard.placeShip(player.ships.cruiser, "horizontal", [1, 2]);

//Opponent Object
let opponent = new Player();
const opponentGameboard = opponent.gameboard;
const opponentShips = opponent.gameboard.ships;
opponent.gameboard.placeShip(opponent.ships.carrier, "horizontal", [0, 0]);
opponent.gameboard.placeShip(opponent.ships.battleship, "vertical", [9, 5]);
opponent.gameboard.placeShip(opponent.ships.cruiser, "horizontal", [1, 2]);

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

const createBoards = () => {
  appendBoards();
  createRows(playerBoard, "player");
  createRows(opponentBoard, "opponent");
  createColumns(player, "player",);
  createColumns(opponent, "opponent",);
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

      //Only allows clicks if gameboard is opponent
      if (boardName === "opponent") {
        column.addEventListener("click", (e) => {
          const coordinates = JSON.parse(e.target.dataset.coordinate);
          const isHit = opponentGameboard.receiveAttack(coordinates);
          e.target.textContent = isHit ? "hit" : "miss";
        });
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

createBoards();
