import { Ship, Gameboard, Player } from "./index";

describe("Ship Test", () => {
  test("Ship: Length", () => {
    const ship = Ship(5, null, null, null);
    expect(ship.length).toBe(5);
  });

  test("Ship: hitpoints", () => {
    const ship = Ship(5, null, null, null);
    ship.hit(2);
    expect(ship.hitpoints).toEqual([0, 0, 1, 0, 0]);
  });

  test("Ship: Ship is not sunk", () => {
    const ship = Ship(5, null, null, null);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship: Ship is sunk", () => {
    const ship = Ship(3, null, null, null);
    ship.hit(0);
    ship.hit(2);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard Test", () => {
  test("Gameboard: Attack Received", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(0, 0)).toBe(true);
  });

  test("Gameboard: Attack Received, edge case", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(4, 0)).toBe(true);
  });

  test("Gameboard: Attack Received, edge case 2", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(5, 0)).toBe(false);
  });

  test("Gameboard: Attack Received, vertical", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(4, 6)).toBe(true);
  });

  test("Gameboard: Attack Received, vertical edge case", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(4, 7)).toBe(false);
  });

  test("Gameboard: All Ship Not Sunk", () => {
    const gameboard = Gameboard();
    expect(gameboard.allShipSunk()).toBe(false);
  });

  test("Gameboard: All Ship Sunk", () => {
    const gameboard = Gameboard();
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(3, 0);
    gameboard.receiveAttack(4, 0);
    gameboard.receiveAttack(3, 2);
    gameboard.receiveAttack(4, 2);
    gameboard.receiveAttack(5, 2);
    gameboard.receiveAttack(4, 5);
    gameboard.receiveAttack(4, 6);
    expect(gameboard.allShipSunk()).toBe(true);
  });
});

describe("Player Test", () => {
  test("Gameboard: Attack Received, vertical edge case", () => {
    const gameboard = Gameboard();
    expect(gameboard.checkShip(4, 7)).toBe(false);
  });
  
  test("Player: Attack Enemy Gameboard", () => {
    const player1 = Player();
    const player2 = Player();
    const spy = jest.spyOn(player2.gameboard, "receiveAttack")
    player1.attack(0, 0, player2);
    expect(spy).toHaveBeenCalled();

  });
});
