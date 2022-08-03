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
  const shipLengths = [5, 4, 3, 3, 2];

  const ships = []; // Ship(length, align, xCor, yCor)

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

  function isSquareAvailable(ship) {
    for (let i = 0; i < ship.length; i += 1) {
      const xStart = ship.xCor;
      const yStart = ship.yCor;
      if (ship.align === "horizontal") {
        if (xStart + i > 9) return false;
        if (isShip(xStart + i, yStart)) return false;
      }
      if (ship.align === "vertical") {
        if (yStart + i > 9) return false;
        if (isShip(xStart, yStart + 1)) return false;
      }
    }
    return true;
  }

  function createShip(length, align, xCor, yCor) {
    const newShip = Ship(length, align, xCor, yCor);
    if (isSquareAvailable(newShip)) {
      ships.push(newShip);
      return true;
    }
    return false;
  }

  function allShipSunk() {
    return ships.every((ship) => ship.isSunk());
  }
  return {
    ships,
    shipLengths,
    createShip,
    isSquareAvailable,
    isShip,
    receiveAttack,
    allShipSunk,
  };
};

const Player = () => {
  const gameboard = Gameboard();
  const lengths = [...gameboard.shipLengths];
  let length = lengths.pop();
  let align = "horizontal";

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

  function placeShip(div, player1, player2) {
    const xCor = +div.dataset.column;
    const yCor = +div.dataset.row;
    if (gameboard.createShip(length, align, xCor, yCor)) {
      Display.addClass(length, align, div, "ship");
      Display.hoverDisappear();
      if (lengths === undefined || lengths.length === 0)
        // eslint-disable-next-line no-use-before-define
        start(player1, player2);
      length = lengths.pop();
    }
  }

  function switchAlign() {
    if (align === "horizontal") align = "vertical";
    else if (align === "vertical") align = "horizontal";
  }

  function getLength() {
    return length;
  }

  function getAlign() {
    return align;
  }

  return {
    gameboard,
    attack,
    placeShip,
    switchAlign,
    getLength,
    getAlign,
  };
};

const Computer = () => {
  const prototype = Player();
  const lengths = [...prototype.gameboard.shipLengths]

  const squares = [];
  for (let i = 0; i < 100; i += 1) {
    const row = Math.floor(i / 10);
    const column = i % 10;
    squares.push([column, row]);
  }

  function randomAlign() {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }

  function randomInt() {
    const int = Math.floor(Math.random() * 10);
    return int;
  }

  while (lengths.length !== 0) {
    if (
      prototype.gameboard.createShip(
        lengths.at(-1),
        randomAlign(),
        randomInt(),
        randomInt()
      )
    )
      lengths.pop();
  }

  function randomCell() {
    const randNum = Math.floor(Math.random() * squares.length);
    const column = squares[randNum][0];
    const row = squares[randNum][1];
    squares.splice(randNum, 1);
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
      Display.winScreen(winner);

      document.querySelector(".new-game").addEventListener("click", () => {
        document.querySelector(".popup-bg").remove();
        // eslint-disable-next-line no-use-before-define
        prepare();
      });
    }
  }

  function humanAttack() {
    const flag = player.attack(this, enemy);
    if (flag === false) switchTurn();
    this.removeEventListener("click", humanAttack);

    endCondition("You");
  }

  function computerAttack() {
    const flag = player.attack(player.randomCell(), enemy);
    if (flag === false) switchTurn();

    endCondition("Computer");
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

function start(player1, player2) {
  const game = Game(player1, player2);
  Display.gameScreen();
  Display.colorShip(document.querySelector(".grid"), player1.gameboard);

  const blanks = document.querySelectorAll(".player2 .blank");
  blanks.forEach((cell) => {
    cell.addEventListener("click", game.humanAttack);
  });

  window.requestAnimationFrame(game.gameLoop);
}

function prepare() {
  const player1 = Player();
  const player2 = Computer();
  Display.prepareScreen();

  document.querySelectorAll(".blank").forEach((div) => {
    div.addEventListener("mouseout", Display.hoverDisappear);
    div.addEventListener("mouseenter", () => {
      Display.addClass(player1.getLength(), player1.getAlign(), div, "hover");
    });
    div.addEventListener("click", () => {
      player1.placeShip(div, player1, player2);
    });
  });

  document
    .querySelector(".rotate")
    .addEventListener("click", player1.switchAlign);
}

prepare();

export { Ship, Gameboard, Player, Computer, Game };
