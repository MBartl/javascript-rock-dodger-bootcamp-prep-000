const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  //dodger and rock are both 20px tall; game is 400px; 400-40=360
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    //dodger is 40px wide
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    //rock is 20px wide
    const rockRightEdge = rockLeftEdge+20;

    //3 cases of collision:
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge === true || 
      rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge === true || 
      rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge === true)
    {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;
  
  GAME.appendChild(rock);

  //maybe add difficulty here? Greater difficulty = faster rock falling?
  function step() {
    rock.style.top = `${top += 2}px`;
     
    if (checkCollision(rock)) {
      endGame();
      //give player the option to play again after the game ends:
      START.innerHTML = 'PLAY AGAIN?';
      START.style.display = 'inline';
      //if rock is 400px down, remove it:
    } else if (top >= 400) {
      rock.remove();
      //if rock is not 400px down, request animation:
    } else if (top < 400) {
      window.requestAnimationFrame(step);
    }
  }
   
  window.requestAnimationFrame(step);
  
  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  //FIX BUG: \/\/ this alert occassionally pops up multiple times per game end
  alert("YOU LOSE!");
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     moveDodgerLeft();
     e.preventDefault();
     e.stopPropagation();
   }

   if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
     e.preventDefault();
     e.stopPropagation();
   }
}

//maybe add difficulty here? Greater difficulty = slower dodger moving?
function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
  if (left > 0) {
    dodger.style.left = `${left - 4}px`;
  }
}

//maybe add difficulty here? Greater difficulty = slower dodger moving?
function moveDodgerRight() {
  var rightNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(rightNumbers, 10);
  if (left < 360) {
    dodger.style.left = `${left + 4}px`;
  }
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
