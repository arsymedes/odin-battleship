import display from "./display"

const Ship = (length, align, xCor, yCor) => {
  const hitpoints = Array(length).fill(0);

  function hit(position) {
    hitpoints[position] = 1;
  }

  function isSunk() {
    if (hitpoints.includes(0)) return false;
    return true;
  }

  return {
    length,
    align,
    xCor,
    yCor,
    hitpoints,
    hit,
    isSunk,
  };
};

const Gameboard = () => {
  const ships = [
    Ship(5, "horizontal", 0, 0), // Ship(length, align, xCor, yCor)
    Ship(3, "horizontal", 3, 2),
    Ship(2, "vertical", 4, 5),
  ];

  const missedAttacks = [];

  function checkAttack(xHit, yHit) {
    let flag = false;
    ships.forEach((ship) => {
      if (
        ship.yCor === yHit &&
        ship.align === "horizontal" &&
        ship.xCor <= xHit &&
        xHit < ship.xCor + ship.length
      ) {
        flag = true;
        ship.hit(xHit - ship.xCor);
      }
      if (
        ship.xCor === xHit &&
        ship.align === "vertical" &&
        ship.yCor <= yHit &&
        yHit < ship.yCor + ship.length
      ) {
        flag = true;
        ship.hit(yHit - ship.yCor);
      }
    });
    return flag;
  }

  function receiveAttack(xHit, yHit) {
    if (checkAttack(xHit, yHit) === false) {
      missedAttacks.push([xHit, yHit]);
    }
  }

  function allShipSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    checkAttack,
    receiveAttack,
    allShipSunk,
  };
};

const Player = () => {
  const gameboard = Gameboard()

  function attack(xHit, yHit, enemy) {
    enemy.gameboard.receiveAttack(xHit, yHit)
  }

  return {
    gameboard,
    attack,
  }
}

display.start()

export { Ship, Gameboard, Player };
