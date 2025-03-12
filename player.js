import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.ships = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };
  }

  //Sets if coordinate is ship or not in a new array
  generateBoardState = () => {
    const boardState = [];

    for (let rowNum = 0; rowNum < 10; rowNum++) {
      for (let colNum = 0; colNum < 10; colNum++) {
        const coordinate = [rowNum, colNum];
        const isShip = this.gameboard.ships.some((ship) =>
          ship.coordinates.some(
            (coord) => coord[0] === rowNum && coord[1] === colNum
          )
        );

        boardState.push({
          coordinate,
          isShip,
        });
      }
    }

    return boardState;
  };
}

// module.exports = Player;
export default Player;
