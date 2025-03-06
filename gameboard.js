class Gameboard {
  constructor() {
    this.ships = [];
    this.numOfMisses = 0;
    this.gameOver = false;
  }

  //Methods
  miss() {
    this.numOfMisses++;
  }

  placeShip(shipObject, direction, startCoordinate) {
    const length = shipObject.length;
    let coordinates = [];
  
    for (let i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        coordinates.push([startCoordinate[0] + i, startCoordinate[1]]);
      } else if (direction === 'vertical') {
        coordinates.push([startCoordinate[0], startCoordinate[1] + i]);
      }
    }
  
    const shipPlacement = { shipObject, direction, coordinates };
    this.ships.push(shipPlacement);
    return shipPlacement;
  }

  receiveAttack(coordinates) {
    let hit = false;
    this.ships.forEach((ship) => {
      //Convert to string because JS cannot compare objects
      if (ship.coordinates.some(coord => coord[0] === coordinates[0] && coord[1] === coordinates[1])) {
        ship.shipObject.hit();
        hit = true;
      }  
    });

    if (!hit) {
      this.miss();
    }

    this.checkEndGame()
  }

  checkSunk(ship) {
    return ship.shipObject.isSunk();
  }

  checkEndGame() {
    this.gameOver = this.ships.every(ship => ship.shipObject.isSunk());
  }
}

module.exports = Gameboard;
