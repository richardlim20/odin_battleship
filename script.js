import Gameboard from "./gameboard.js";
class Player {
  constructor(){
    this.gameboard = new Gameboard();
    this.coordinates = [[1,2],[2,2],[3,2]];
  }

}

const gamesContainer = document.getElementById("games-container");
const playerBoard = document.createElement("div");
playerBoard.classList.add("gameboard");
playerBoard.dataset.board = "player-board"
const opponentBoard = document.createElement("div");
opponentBoard.classList.add("gameboard");
opponentBoard.dataset.board = "opponent-board"
const column = document.createElement("div");
column.classList.add("column");
const row = document.createElement("div");
row.classList.add("row");
const playerContainer = document.getElementById("player-container");
const opponnentContainer = document.getElementById("opponent-container");
gamesContainer.appendChild(playerContainer);
gamesContainer.appendChild(opponnentContainer);

const createBoards = () => {
  appendBoards();
  createRows(playerBoard);
  createRows(opponentBoard);
  createColumns();
};

const createRows = (board) => {
  for (let i = 0; i < 10; i++) {
    board.appendChild(row.cloneNode(true));
  }
};

const createColumns = () => {
  const rows = document.querySelectorAll(".row");
  let rowNum = 0;
  rows.forEach((row) => {
    row.addEventListener("click", (e) => {
      console.log(e.target)
    })
    for (let i = 0; i < 10; i++) {
      column.dataset.coordinate = [rowNum, i]
      row.appendChild(column.cloneNode(true));
    }
    rowNum++
    if (rowNum === 10){
      rowNum = 0;
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