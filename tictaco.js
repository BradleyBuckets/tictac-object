// player 1 is always x
// player 2 is always o
//
let draw = 8;
let addMark = (e) => {
  // add mark to the grid
  gridMark(e.target.classList[1]);
  if (player1Turn) e.target.classList.add("x");
  else e.target.classList.add("o");
  // check to see if there is a tie
  if (draw === 0) tieGame();
  else {
    draw--;
  }
  // check for a win
  if (player1Turn) checkWin("x");
  else checkWin("o");
  // change turn
  changeTurn();
};
// grab board
let board = document.querySelector(".board");
// make grid in board
const makeBoard = () => {
  let row = 0;
  let column = 0;
  // make 9 cells
  for (let i = 0; i < 9; i++) {
    // make the cell
    let cell = document.createElement("div");
    // give it an click action
    cell.addEventListener("click", addMark, { once: true });
    // give it a class of cell
    cell.classList.add("cell");
    // give it a class to map to the array
    cell.classList.add(`${[row, column]}`);
    // change the row and column each iteration
    column++;
    if (column === 3) {
      column = 0;
      row++;
    }
    // add cell to board
    board.appendChild(cell);
  }
};

makeBoard();
// while is it player 1's turn, click a square an make it an x
let player1Turn = true;
// change turn after play
let changeTurn = () => {
  player1Turn = !player1Turn;
};

// while is it player 2's turn, click a square an make it an o
// after each players choice, check to see if that player has won
// store the game board as data
let grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// pass the coordinates as a class (1,1) and map it to the grid
const gridMark = (string) => {
  // break apart the string
  let coordinate = [...string];
  let row = coordinate[0];
  let column = coordinate[2];
  // map the coordinates to the grid
  if (player1Turn) grid[row][column] = "x";
  else grid[row][column] = "o";
};

// check to see if a player has won
let checkWin = (mark) => {
  // rows
  if (grid[0].toString() === [mark, mark, mark].toString()) displayWin(mark);
  if (grid[1].toString() === [mark, mark, mark].toString()) displayWin(mark);
  if (grid[2].toString() === [mark, mark, mark].toString()) displayWin(mark);
  // columns
  if (grid[0][0] === mark && grid[1][0] === mark && grid[2][0] === mark)
    displayWin(mark);
  if (grid[0][1] === mark && grid[1][1] === mark && grid[2][1] === mark)
    displayWin(mark);
  if (grid[0][2] === mark && grid[1][2] === mark && grid[2][2] === mark)
    displayWin(mark);
  // diagonals
  if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark)
    displayWin(mark);
  if (grid[0][2] === mark && grid[1][1] === mark && grid[2][0] === mark)
    displayWin(mark);
};

// display the winning message page with winning message
let displayWin = (mark) => {
  document.querySelector(".winning").style.display = "block";
  document.querySelector(".message").innerHTML = `${mark}'s win!`;
};

// display the winning message page with tie message
let tieGame = () => {
  document.querySelector(".winning").style.display = "block";
  document.querySelector(".message").innerHTML = `It's a tie!`;
};

// click reset button to play again
let reset = () => {
  // reset grid
  grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  // reset draw
  draw = 8;
  // clear board
  clearBoard();
  // re make board
  makeBoard();
  // change it back to player 1 turn
  changeTurn();
  // hide the win screen
  document.querySelector(".winning").style.display = "none";
};

let clearBoard = () => {
  // change node list into array and then remove all the elements
  [...document.querySelectorAll(".cell")].forEach((cell) => cell.remove());
};

// give the reset button function
document.getElementById("reset").addEventListener("click", reset);
