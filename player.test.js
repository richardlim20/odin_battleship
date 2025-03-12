const Player = require('./player');
const Ship = require('./ship');

describe("Player - generateBoardState", () => {
  let player;

  beforeEach(() => {
    player = new Player();
    // Place a ship at [1, 2], [2, 2], [3, 2]
    player.gameboard.placeShip(new Ship(3), "horizontal", [1, 2]);
  });

  test("should generate a board state with correct ship positions", () => {
    const boardState = player.generateBoardState();

    // Board should be 10x10
    expect(boardState.length).toBe(100);

    // Check if the ship positions are correctly marked
    const shipCoordinates = [[1, 2], [2, 2], [3, 2]];
    shipCoordinates.forEach((coord) => {
      const foundShips = boardState.find(
        (element) =>
          JSON.stringify(element.coordinate) === JSON.stringify(coord) &&
          element.isShip === true
      );

      // Each ship coordinate should be marked as a ship
      expect(foundShips).toBeDefined();
    });

    // Check if an empty position is correctly marked
    const emptyCell = boardState.find(
      (element) =>
        JSON.stringify(element.coordinate) === JSON.stringify([0, 0]) &&
        element.isShip === false
    );
    // Every non-ship coordinate should exist and be marked as false
    expect(emptyCell).toBeDefined();
  });
});