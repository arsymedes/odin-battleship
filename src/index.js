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
      }
      if (
        ship.xCor === xHit &&
        ship.align === "vertical" &&
        ship.yCor <= yHit &&
        yHit < ship.yCor + ship.length
      ) {
        flag = true;
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
      return true;
    }
    cell.classList.remove("blank");
    cell.classList.add("wrong");
    return false;
  }

  return {
    gameboard,
    attack,
  };
};

const Computer = () => {
  const prototype = Player();

  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    const row = Math.floor(i / 10);
    const column = i % 10;
    squares.push([column, row]);
  }

  function randomCell() {
    const randNum = Math.floor(Math.random() * squares.length);
    const column = squares[randNum][0]
    const row = squares[randNum][1]
    squares.splice(randNum, 1)
    const cell = document.querySelector(
      `.player1 [data-row="${row}"][data-column="${column}"]`
    );
    return cell;
  }

  return Object.assign(prototype, { randomCell });
};

const Game = (player1, player2) => {
  let player = player1;
  let enemy = player2;

  function switchTurn() {
    const temp = player;
    player = enemy;
    enemy = temp;
  }

  function endCondition(winner) {
    if (enemy.gameboard.allShipSunk()) {
      Display.winScreen(winner)

      document.querySelector(".new-game").addEventListener("click", () => {
        document.querySelector(".popup-bg").remove()
        // eslint-disable-next-line no-use-before-define
        start()
      })
    }
  }

  function humanAttack() {
    const flag = player.attack(this, enemy);
    if (flag === false) switchTurn();
    this.removeEventListener("click", humanAttack);

    endCondition("Player 1")
  }

  function computerAttack() {
    const flag = player.attack(player.randomCell(), enemy);
    if (flag === false) switchTurn();

    endCondition("Computer")
  }

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    if (player === player2) computerAttack();
  }

  return {
    humanAttack,
    gameLoop,
  };
};

function start() {
  const player1 = Player();
  const player2 = Computer();
  const game = Game(player1, player2);
  Display.gameScreen();
  Display.colorShip(document.querySelector(".grid"), player1.gameboard);

  const blanks = document.querySelectorAll(".player2 .blank");
  blanks.forEach((cell) => {
    cell.addEventListener("click", game.humanAttack);
  });

  window.requestAnimationFrame(game.gameLoop);
}

start();

export { Ship, Gameboard, Player, Computer, Game };
