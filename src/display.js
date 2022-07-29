import "normalize.css";
import "./style.css";

const display = (() => {
  const body = document.querySelector("body");
  function start() {
    const html = /* html */ `
      <h1>BATTLESHIP</h1>
    `;

    body.innerHTML = html;
  }

  return {
    start,
  };
})();

export default display;
