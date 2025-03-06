const Ship = require('./ship');
const Gameboard = require('./Gameboard');

describe('Gameboard Class', () => {
  let gameboard;
  let mockShip;

  beforeEach(() => {
    gameboard = new Gameboard();
    mockShip = new Ship(3);
  });

  test('should increase numOfMisses when attack misses', () => {
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.numOfMisses).toBe(1);
  });

  test('should place a ship at a given coordinate with a direction', () => {
    const result = gameboard.placeShip(mockShip, 'horizontal', [2, 3]);

    expect(result).toEqual({
      shipObject: mockShip,
      direction: 'horizontal',
      coordinates: [[2, 3], [3 , 3], [4, 3]],
    });

    expect(gameboard.ships.length).toBe(1);
    expect(gameboard.ships[0]).toEqual(result);
  });

  test('should increase numOfHits when attack hits ship horizontally', () => {
    gameboard.placeShip(mockShip, 'horizontal', [2,3]);
    gameboard.receiveAttack([2,3]);
    gameboard.receiveAttack([4,3]);
    expect(gameboard.ships[0].shipObject.numOfHits).toBe(2);
  });

  test('should increase numOfHits when attack hits ship vertically', () => {
    gameboard.placeShip(mockShip, 'vertical', [2,3]);
    gameboard.receiveAttack([2,3]);
    gameboard.receiveAttack([2,5]);
    expect(gameboard.ships[0].shipObject.numOfHits).toBe(2);
  });

  test('should return true when a ship is sunk', () => {
    const shipPlacement = gameboard.placeShip(mockShip, 'horizontal', [2,3]);
    jest.spyOn(mockShip, 'isSunk').mockReturnValue(true);
    expect(gameboard.checkSunk(shipPlacement)).toBe(true);
  });

  test('should set gameOver to true when all ships are sunk', () => {
    gameboard.placeShip(mockShip, 'horizontal', [2, 3]);
    jest.spyOn(mockShip, 'isSunk').mockReturnValue(true);
  
    gameboard.receiveAttack([2, 3]);
  
    expect(gameboard.gameOver).toBe(true);
  });

  test('should keep gameOver false if not all ships are sunk', () => {
    gameboard.placeShip(mockShip, 'horizontal', [2, 3]);
    jest.spyOn(mockShip, 'isSunk').mockReturnValue(false);

    gameboard.receiveAttack([2, 3]);

    expect(gameboard.gameOver).toBe(false);
  });
});

