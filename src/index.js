import { Display } from "./display";

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

  function isShip(xHit, yHit) {
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
    ships.forEach((ship) => {
      if (
        ship.yCor === yHit &&
        ship.align === "horizontal" &&
        ship.xCor <= xHit &&
        xHit < ship.xCor + ship.length
      ) {
        ship.hit(xHit - ship.xCor);
      } else if (
        ship.xCor === xHit &&
        ship.align === "vertical" &&
        ship.yCor <= yHit &&
        yHit < ship.yCor + ship.length
      ) {
        ship.hit(yHit - ship.yCor);
      } else {
        missedAttacks.push([xHit, yHit]);
      }
    });
  }

  function allShipSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    ships,
    isShip,
    receiveAttack,
    allShipSunk,
  };
};

const Player = () => {
  const gameboard = Gameboard();

  function attack(cell, enemy) {
    const xHit = +cell.dataset.column;
    const yHit = +cell.dataset.row;

    enemy.gameboard.receiveAttack(xHit, yHit);
    if (enemy.gameboard.isShip(xHit, yHit)) {
      cell.classList.remove("blank");
      cell.classList.add("right");
    } else {
      cell.classList.remove("blank");
      cell.classList.add("wrong");
    }
  }

  return {
    gameboard,
    attack,
  };
};

const Computer = () => {
  const prototype = Player()

  function randomCell() {
    const row = Math.floor(Math.random() * 10)
    const column = Math.floor(Math.random() * 10)
    const cell = document.querySelector(`.player2[data-row="${row}"][data-column="${column}"]`)
    return cell
  }

  return Object.assign(prototype, {randomCell})
}

const Game = (player1, player2) => {
  let player = player1;
  let enemy = player2;
  let turn = 0;

  function addTurn() {
    if (turn % 2) {
      turn += 1
      player = player2;
      enemy = player1;
    } else {
      turn += 1
      player = player1;
      enemy = player2;
    }
  }

  function gameLoop {
    document.querySelectorAll(".blank").forEach((cell) => {
      cell.addEventListener("click", game.player.attack(cell, game.enemy));
      
    });
  }

  return {
    player,
    enemy,
    addTurn,
  };
};

function start() {
  const player1 = Player()
  const player2 = Computer()
  const game = Game(player1, player2)
  Display.gameScreen();
  Display.colorShip(document.querySelector(".grid"), player1.gameboard);
}

start();

export { Ship, Gameboard, Player, Game };
