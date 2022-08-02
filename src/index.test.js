/**
 * @jest-environment jsdom
 */

import { Ship, Gameboard, Player} from "./index";

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
  test("Gameboard: Is Ship", () => {
    const gameboard = Gameboard();
    expect(gameboard.isShip(0, 0)).toBe(true);
  });

  test("Gameboard: Is Ship, edge case", () => {
    const gameboard = Gameboard();
    expect(gameboard.isShip(4, 0)).toBe(true);
  });

  test("Gameboard: Is Ship, edge case 2", () => {
    const gameboard = Gameboard();
    expect(gameboard.isShip(5, 0)).toBe(false);
  });

  test("Gameboard: Is Ship, vertical", () => {
    const gameboard = Gameboard();
    expect(gameboard.isShip(4, 6)).toBe(true);
  });

  test("Gameboard: Is Ship, vertical edge case", () => {
    const gameboard = Gameboard();
    expect(gameboard.isShip(4, 7)).toBe(false);
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

  test("Gameboard: Legal Move Test, true", () => {
    const gameboard = Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.isLegal(1, 1)).toBe(true);
  });

  test("Gameboard: Legal Move Test, false", () => {
    const gameboard = Gameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.isLegal(0, 0)).toBe(false);
  });
});

describe("Player Test", () => {
  test("Player: Attack Enemy Gameboard", () => {
    const player1 = Player();
    const player2 = Player();
    const spy = jest.spyOn(player2.gameboard, "receiveAttack");
    const cell = document.createElement("div");
    cell.dataset.row = 0;
    cell.dataset.column = 0;
    player1.attack(cell, player2);
    expect(spy).toHaveBeenCalled();
  });

  test("Player: Return True on Hit Attack", () => {
    const player1 = Player();
    const player2 = Player();
    const cell = document.createElement("div");
    cell.dataset.row = 0;
    cell.dataset.column = 0;
    expect(player1.attack(cell, player2)).toBe(true);
  });

  test("Player: Return False on Missed Attack", () => {
    const player1 = Player();
    const player2 = Player();
    const cell = document.createElement("div");
    cell.dataset.row = 9;
    cell.dataset.column = 9;
    expect(player1.attack(cell, player2)).toBe(false);
  });
});
