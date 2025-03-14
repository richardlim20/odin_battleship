import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
// const Ship = require('./ship');
// const Gameboard = require('./gameboard');
class Player {
  constructor(typeCPU) {
    this.typeCPU = typeCPU;
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

  placeRandomShips = (shipType) => {
    let ships = this.gameboard.ships;
    const occupiedCorArr = [];
    ships.forEach((ship) => {
      occupiedCorArr.push(ship.coordinates);
    });

    //Occupied coordinates array
    const occupiedCoordinates = occupiedCorArr.flat()

    //Generate coordinates and directions
    const generatedCor = this.generateCoordinate();
    const generatedDirection = this.generateDirection();
    const shipCoordinates = this.gameboard.getShipCoordinates(shipType.length, generatedDirection, generatedCor);

    //Checks if new ship coordinates and placed coordinates matches
    const isMatched = shipCoordinates.some(shipCor =>
      occupiedCoordinates.some(occupiedCor => 
        shipCor[0] === occupiedCor[0] && shipCor[1] === occupiedCor[1]
      )
    );

    //Runs function again if coordinate match
    if (isMatched){
      this.placeRandomShips(shipType);
    }

    //If not places ship
    else {
      this.gameboard.placeShip(
        shipType,
        generatedDirection,
        generatedCor
      );
    }
  };

  generateDirection = () => {
    const genNum = Math.random();
    if (genNum > 0.5) {
      return this.DIRECTIONS.HORIZONTAL;
    } else {
      return this.DIRECTIONS.VERTICAL;
    }
  };

  generateCoordinate = () => {
    const xValue = Math.floor(Math.random() * 10);
    const yValue = Math.floor(Math.random() * 10);
    return [xValue, yValue];
  };

  DIRECTIONS = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
  };
}

// module.exports = Player;
export default Player;
