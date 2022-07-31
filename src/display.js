import "normalize.css";
import "./style.css";

const Display = (() => {
  const body = document.querySelector("body");

  function makeGrid() {
    const grid = document.createElement("div");
    grid.classList = "grid";
    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement("div");
      cell.classList = "cell";
      cell.dataset.row = Math.floor(i / 10);
      cell.dataset.column = i % 10;
      grid.appendChild(cell);
    }
    return grid;
  }

  function colorShip(grid, gameboard) {
    gameboard.ships.forEach()
  }

  function makeFooter() {
    const footer = document.createElement("div")
    footer.classList = "footer"
    footer.innerText = "Copyright © arsymedes 2022"

    return footer
  }

  function prepareScreen() {

  }

  function gameScreen() {
    const title = document.createElement("h1");
    const grids = document.createElement("div")

    title.innerText = "BATTLESHIP";
    grids.classList = "grids"

    grids.appendChild(makeGrid())
    grids.appendChild(makeGrid())
    body.appendChild(title);
    body.appendChild(grids)
    body.appendChild(makeFooter())
  }

  return {
    gameScreen,
    prepareScreen,
  };
})();

const Populate = (() => {

})()

export { Display, Populate };
