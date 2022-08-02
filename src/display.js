import "normalize.css";
import "./style.css";

const Display = (() => {
  const body = document.querySelector("body");

  function makeGrid(player) {
    const grid = document.createElement("div");
    grid.classList = `grid ${player}`;
    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement("div");
      cell.classList = "cell blank";
      cell.dataset.row = Math.floor(i / 10);
      cell.dataset.column = i % 10;
      grid.appendChild(cell);
    }
    return grid;
  }

  function colorShip(grid, gameboard) {
    grid.childNodes.forEach((cell) => {
      const xCor = +cell.dataset.column;
      const yCor = +cell.dataset.row;
      if (gameboard.isShip(xCor, yCor)) {
        cell.classList.remove("blank");
        cell.classList.add("ship");
      }
    });
  }

  function makeFooter() {
    const footer = document.createElement("div");
    footer.classList = "footer";
    footer.innerText = "Copyright © arsymedes 2022";

    return footer;
  }

  function prepareScreen() {}

  function gameScreen() {
    const title = document.createElement("h1");
    const grids = document.createElement("div");

    title.innerText = "BATTLESHIP";
    grids.classList = "grids";

    grids.appendChild(makeGrid("player1"));
    grids.appendChild(makeGrid("player2"));
    body.appendChild(title);
    body.appendChild(grids);
    body.appendChild(makeFooter());
  }

  return {
    gameScreen,
    prepareScreen,
    colorShip,
  };
})();

const Populate = (() => {})();

export { Display, Populate };
