class Gameboard {
  constructor() {
    this.ships = [];
    this.numOfMisses = 0;
    this.loseGame = false;
  }

  //Methods
  miss() {
    this.numOfMisses++;
  }

  placeShip(shipObject, direction, startCoordinate) {
    const coordinates = this.getShipCoordinates(shipObject.length, direction, startCoordinate)
    const shipPlacement = { shipObject, direction, coordinates };
    this.ships.push(shipPlacement);
    return shipPlacement;
  }

  receiveAttack(coordinates) {
    let hit = false;
    this.ships.forEach((ship) => {
      //Convert to string because JS cannot compare objects
      if (
        ship.coordinates.some(
          (coord) => coord[0] === coordinates[0] && coord[1] === coordinates[1]
        )
      ) {
        ship.shipObject.hit();
        hit = true;
      }
    });

    if (!hit) {
      this.miss();
    }

    return hit;
  }

  getShipCoordinates(length, direction, startCoordinate){
    const shipCoordinates = []
    let xCor = startCoordinate[0];
    let yCor = startCoordinate[1];

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        let newX = startCoordinate[0] + i;

        // If out of bounds move backwards
        if (newX > 9) {
          newX = startCoordinate[0] - (i - (9 - startCoordinate[0]));
        }

        shipCoordinates.push([newX, yCor]);
      } else if (direction === "vertical") {
        let newY = startCoordinate[1] + i;

        // If out of bounds move backwards
        if (newY > 9) {
          newY = startCoordinate[1] - (i - (9 - startCoordinate[1]));
        }

        shipCoordinates.push([xCor, newY]);
      }
    }
    return shipCoordinates
  }

  checkSunk(ship) {
    return ship.shipObject.isSunk();
  }

  checkEndGame() {
    this.loseGame = this.ships.every((ship) => ship.shipObject.isSunk());
    return this.loseGame;
  }
}

// module.exports = Gameboard;
export default Gameboard;
