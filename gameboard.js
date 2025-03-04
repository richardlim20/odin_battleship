export default class Gameboard {
  constructor() {
    this.ships = [];
    this.numOfMisses = 0;
    this.gameOver = false;
  }

  //Methods
  miss() {
    this.numOfMisses++;
  }

  placeShip(shipObject, direction, coordinates) {
    const shipPlacement = { shipObject, direction, coordinates };
    this.ships.push(shipPlacement);
    return shipPlacement;
  }

  receiveAttack(coordinates) {
    this.ships.forEach((ship) => {
      coordinates === ship.coordinates ? ship.hit() : miss();
    });
  }

  checkSunk(ship) {
    return ship.sunk;
  }

  endgame(coordinates) {
    this.receiveAttack(coordinates);
    this.gameOver = this.ships.every(checkSunk(ship));
  }
}

