var PACMAN = '&#9786;';

var gPacman;
var eatPowerInSuperCounter;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
    currCellContent: EMPTY
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {

  if (!gGame.isOn) return;

  // direction to the next cell
  var nextLocation = getNextLocation(eventKeyboard);

  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

   // target cell location 
  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  //update FOOD score
  if (nextCell === FOOD) updateScore(1);

  // update CHERRY score
  else if (nextCell === CHERRY) updateScore(10);

  // when eating POWER FOOD in super mode
  else if (nextCell === POWER_FOOD && gPacman.isSuper) {
   eatPowerInSuperCounter = 2

    // eating POWER FOOD 
  } else if (nextCell === POWER_FOOD) {
    gPacman.isSuper = true
    setTimeout(function () { gPacman.isSuper = false }, 5000)

    // GHOST in super mode
  } else if (nextCell === GHOST && gPacman.isSuper) {
    eatGhost(nextLocation)
    renderCell(gPacman.location, EMPTY);

    // GHOST in regular mode
  } else if (nextCell === GHOST) {
    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  }

  if (eatPowerInSuperCounter === 1) {
    // Update the model to reflect movement when eating POWER FOOD in super mode
    gBoard[gPacman.location.i][gPacman.location.j] = POWER_FOOD;
    // Update the DOM
    renderCell(gPacman.location, POWER_FOOD);

  } else {
    // Update the model to reflect movement
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // Update the DOM
    renderCell(gPacman.location, EMPTY);
  }
  eatPowerInSuperCounter--
  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
  finishFood()
}


// Update the pacman emoji and get location
function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = '👆🏻'
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = '👇🏻'
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = '👈🏻'
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = '👉🏻'
      break;
    default: return null;
  }
  return nextLocation;
}

// erase ghost from the ghost array
// CR: you should bring them back to life after 5 seconds
function eatGhost(nextLocation) {
  for (var i = 0; i < gGhosts.length; i++) {
    if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
      gGhosts.splice(i, 1)
    }
  }
}

