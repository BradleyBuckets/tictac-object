let factoryBoard = (() => {
  let draw = 8;
  let board = document.querySelector(".board");
  let player1Turn = true;
  let addMark = (e) => {
    gridMark(e.target.classList[1]);
    if (player1Turn) e.target.classList.add("x");
    else e.target.classList.add("o");
    if (draw === 0) tieGame();
    else {
      draw--;
    }
    if (player1Turn) checkWin("x");
    else checkWin("o");
    changeTurn();
  };
  const makeBoard = () => {
    let row = 0;
    let column = 0;
    for (let i = 0; i < 9; i++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", addMark, { once: true });
      cell.classList.add("cell");
      cell.classList.add(`${[row, column]}`);
      column++;
      if (column === 3) {
        column = 0;
        row++;
      }
      board.appendChild(cell);
    }
  };
  let changeTurn = () => {
    player1Turn = !player1Turn;
  };
  let grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const gridMark = (string) => {
    let coordinate = [...string];
    let row = coordinate[0];
    let column = coordinate[2];
    if (player1Turn) grid[row][column] = "x";
    else grid[row][column] = "o";
  };
  let checkWin = (mark) => {
    if (grid[0].toString() === [mark, mark, mark].toString()) displayWin(mark);
    if (grid[1].toString() === [mark, mark, mark].toString()) displayWin(mark);
    if (grid[2].toString() === [mark, mark, mark].toString()) displayWin(mark);
    if (grid[0][0] === mark && grid[1][0] === mark && grid[2][0] === mark)
      displayWin(mark);
    if (grid[0][1] === mark && grid[1][1] === mark && grid[2][1] === mark)
      displayWin(mark);
    if (grid[0][2] === mark && grid[1][2] === mark && grid[2][2] === mark)
      displayWin(mark);
    if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark)
      displayWin(mark);
    if (grid[0][2] === mark && grid[1][1] === mark && grid[2][0] === mark)
      displayWin(mark);
  };

  let displayWin = (mark) => {
    document.querySelector(".winning").style.display = "block";
    document.querySelector(".message").innerHTML = `${mark}'s win!`;
  };

  let tieGame = () => {
    document.querySelector(".winning").style.display = "block";
    document.querySelector(".message").innerHTML = `It's a tie!`;
  };

  let reset = () => {
    grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    draw = 8;
    clearBoard();
    makeBoard();
    changeTurn();
    document.querySelector(".winning").style.display = "none";
  };

  let clearBoard = () => {
    [...document.querySelectorAll(".cell")].forEach((cell) => cell.remove());
  };

  document.getElementById("reset").addEventListener("click", reset);

  return {
    makeBoard,
  };
})();

factoryBoard.makeBoard();
