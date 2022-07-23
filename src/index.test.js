import { Ship, Gameboard } from "./index"

test('Ship: Length', () => {
  const ship = Ship(5)
  expect(ship.length).toBe(5)
});

test('Ship: Ship is not sunk', () => {
  const ship = Ship(5)
  ship.hit(2)
  ship.hit(3)
  expect(ship.isSunk()).toBe(false)
});

test('Ship: Ship is sunk', () => {
  const ship = Ship(3)
  ship.hit(0)
  ship.hit(2)
  ship.hit(1)
  expect(ship.isSunk()).toBe(true)
});