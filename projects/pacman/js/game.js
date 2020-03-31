'use strict';
const WALL = '⛔️';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🌟'
const CHERRY = '🍒'

var cherryInterval // CR: gCherryInterval for global variables :)
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  document.querySelector('.modal').style.display = 'none'
  gBoard = buildBoard();
  gGame.score = 0;
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  // CR: we didnt learn arrow functions, lets use callback functions for now setInerval(setCherry, 15000)
  cherryInterval = setInterval(() => { setCherry() }, 15000);
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)) {
        board[i][j] = POWER_FOOD;

      }
    }
  }
  return board;
}

// Update both the model and the dom for the score
function updateScore(value) {
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  if (finishFood()) gameOver(true)


}

// clear all interval function and send the massage to the modal
function gameOver(isWin = false) {
  gGame.isOn = false;
  clearInterval(cherryInterval)
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  // CR: what happened to cherryInterval? :)
  var massage = (isWin) ? 'you are the WINNER' : 'you lost'
  modal(massage)
}


// open a window to the user to start again
function modal(massage) {
// get the element
  var elModal = document.querySelector('.modal')
//modal massage + reset button
  var strHTML = `<h2>${massage}</h2><button onclick = "init()">start again</button`
  elModal.innerHTML = strHTML;
  elModal.style.display = 'block'
}

// check all cells in the board for food
function finishFood() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === FOOD) return false
    }
  }
  gameOver(true)
}

// set cherry in the board
function setCherry() {
  var possibleCells = emptyCells()
  var randomIndex = getRandomIntInclusive(0, possibleCells.length - 1)
  //update model
  gBoard[possibleCells[randomIndex].i][possibleCells[randomIndex].j] = CHERRY
  //update dom
  renderCell(possibleCells[randomIndex], CHERRY)
}



// check for empty cells in the board and returns array of objects
// CR: emptyCells sounds like an array, lets stick to naming functions with verb at the start
// for example: getEmptyCells()
function emptyCells() {
  var emptyCells = [];
  var emptyCell = {}
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCell.i = i
        emptyCell.j = j
        emptyCells.push(emptyCell)
      }
    }
  }
  return emptyCells
}