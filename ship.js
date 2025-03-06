class Ship {
  constructor(length) {
    this.length = length;
    this.numOfHits = 0;
    this.sunk = false;
  }

  //Methods
  hit() {
    this.numOfHits++;
  }
  isSunk() {
    this.sunk = this.numOfHits >= this.length;
    return this.sunk;
  }
}

module.exports = Ship;