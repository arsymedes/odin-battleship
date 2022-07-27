import { Ship, Gameboard } from "./index"

test('Ship: Length', () => {
  const ship = Ship(5, null, null, null)
  expect(ship.length).toBe(5)
});

test('Ship: Ship is not sunk', () => {
  const ship = Ship(5, null, null, null)
  ship.hit(2)
  ship.hit(3)
  expect(ship.isSunk()).toBe(false)
});

test('Ship: Ship is sunk', () => {
  const ship = Ship(3, null, null, null)
  ship.hit(0)
  ship.hit(2)
  ship.hit(1)
  expect(ship.isSunk()).toBe(true)
});

test('Gameboard: Attack Received', () => {
  expect(Gameboard.checkAttack(0, 0)).toBe(true)
});

test('Gameboard: Attack Received, edge case', () => {
  expect(Gameboard.checkAttack(4, 0)).toBe(true)
});

test('Gameboard: Attack Received, edge case 2', () => {
  expect(Gameboard.checkAttack(5, 0)).toBe(false)
});

test('Gameboard: Attack Received, vertical', () => {
  expect(Gameboard.checkAttack(4, 6)).toBe(true)
});

test('Gameboard: Attack Received, vertical edge case', () => {
  expect(Gameboard.checkAttack(4, 7)).toBe(false)
});

test('Gameboard: All Ship Not Sunk', () => {
  expect(Gameboard.allShipSunk()).toBe(false)
});

test('Gameboard: All Ship Sunk', () => {
  Gameboard.receiveAttack(0, 0)
  Gameboard.receiveAttack(1, 0)
  Gameboard.receiveAttack(2, 0)
  Gameboard.receiveAttack(3, 0)
  Gameboard.receiveAttack(4, 0)
  Gameboard.receiveAttack(3, 2)
  Gameboard.receiveAttack(4, 2)
  Gameboard.receiveAttack(5, 2)
  Gameboard.receiveAttack(4, 5)
  Gameboard.receiveAttack(4, 6)
  expect(Gameboard.allShipSunk()).toBe(true)
});