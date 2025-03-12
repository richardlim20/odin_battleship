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
}

export default Player;