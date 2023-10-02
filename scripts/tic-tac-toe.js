// 1 == X   (computer)
// 2 == O   (human)
const computer = 'x';
const human = 'o';



let board = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_']
];

let player = 'x';

class Move
{
    constructor()
    {
        let row,col;
    }
}

function computerMove() {
   // Get a reference to the overlay element
const overlay = document.getElementById('overlay');

overlay.style.pointerEvents = 'auto'; // Enable pointer events to block interactions

  const availableMoves = findAvailableMoves();
  let bestMove;
  let bestScore = -Infinity;

  for (const move of availableMoves) {
    const { row, col } = move;
    board[row][col] = computer; // Make the move
    const score = minimax(0, false);
    board[row][col] = '_'; // Undo the move

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  console.log(bestMove);
  console.log(board);

  const { row, col } = bestMove;
  console.log(bestMove);
  const param = row*3+col+1;
  setTimeout(function(){
        Click(param);
        // To disable the overlay (make it transparent and non-blocking)
      overlay.style.backgroundColor = 'transparent';
      overlay.style.pointerEvents = 'none';
    },1000);      
  
}


function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j]=== player) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }

  return false;
}

function isTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '_') {
        return false; // There's an empty cell, the game is not a tie.
      }
    }
  }
  return true; // All cells are filled, it's a tie.
}

function evaluate() {
  let score = 0;

  // Evaluate rows
  for (let row = 0; row < 3; row++) {
    score += evaluateLine(board[row][0], board[row][1], board[row][2]);
  }

  // Evaluate columns
  for (let col = 0; col < 3; col++) {
    score += evaluateLine(board[0][col], board[1][col], board[2][col]);
  }

  // Evaluate diagonals
  score += evaluateLine(board[0][0], board[1][1], board[2][2]);
  score += evaluateLine(board[0][2], board[1][1], board[2][0]);

  return score;
}

function evaluateLine(cell1, cell2, cell3) {
  const line = [cell1, cell2, cell3];
  let computerCount = 0;
  let humanCount = 0;

  for (const cell of line) {
    if (cell === computer) {
      computerCount++;
    } else if (cell === human) {
      humanCount++;
    }
  }

  // Assign scores based on the presence of computer and human marks
  if (computerCount === 2 && humanCount === 0) {
    return 10; // Computer can win with one more move
  } else if (humanCount === 2 && computerCount === 0) {
    return -10; // Human can win with one more move
  } else {
    return 0; // No immediate win or loss
  }
}


function findAvailableMoves() {
  const availableMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '_') {
        availableMoves.push({ row: i, col: j });
      }
    }
  }
  return availableMoves;
}

function minimax(depth, maximizingPlayer) {
  const scores = {
    [computer]: 1,
    [human]: -1,
    tie: 0,
  };

  const winner = checkWin(computer) ? computer : checkWin(human) ? human : isTie() ? 'tie' : null;

  if (winner !== null) {
    return scores[winner];
  }

  if (maximizingPlayer) {
    let bestScore = -Infinity;
    const availableMoves = findAvailableMoves();
    
    for (const move of availableMoves) {
      const { row, col } = move;
      board[row][col] = computer;
      const score = minimax(depth + 1, false);
      board[row][col] = '_'; // Undo the move
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const availableMoves = findAvailableMoves();
    
    for (const move of availableMoves) {
      const { row, col } = move;
      board[row][col] = human;
      const score = minimax(depth + 1, true);
      board[row][col] = '_'; // Undo the move
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

function Click(param){
  const index = param - 1;
    // Update the corresponding cell on the board array
    const row = Math.floor(index / 3);
    const col = index % 3;
  
  if (board[row][col] === "_") {
    
    // Update the corresponding cell on the board array
    board[row][col] = player; // Update the board with the player's move
    player===human?player=computer:player=human; // Toggle the turn between 1 and 2
    UpdateDisplay(player);
  }
}

function Tie() {// check if Tie
  let tie = true;
  for (let i=0; i<3; i++)
    for(let j=0;j<3;j++)  
      if(board[i][j]==="_" || board[i][j]==="ended"){
        tie = false;
      break;
    }
  if(tie){
    document.querySelector('.display-turns-js').innerHTML = "Tie!";
  }
  return tie;
}


function UpdateDisplay(player){
  document.querySelector('.display-turns-js').innerHTML = (player === human) ? "Human turn" : "Computer Turn";

  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(board[i][j]==="_"){
        document.querySelector('.div'+(i*3+j+1)).
        innerHTML='';
      }
      else if(board[i][j]===computer){ // computer
        document.querySelector('.div'+(i*3+j+1)).
        innerHTML="<img src='images\\X.png' width=\"300px\" height=\"300px\">";
      } 
      else if(board[i][j]===human){ // human
        document.querySelector('.div'+(i*3+j+1)).innerHTML="<img src='images\\O.png'>";
      }
    } 
  }
  
  textElem = document.querySelector('.display-turns-js');
  
  
  // check if player O won (1)
 // Check rows
 for (let i = 0; i < 3; i++) {
  if (board[i][0] === human && board[i][1] === human && board[i][2] === human) {
    document.querySelector('.grid-container').classList.add('horizontal'+(i+1)+'-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();  }
  else if (board[i][0] === computer && board[i][1] === computer && board[i][2] === computer) {
    document.querySelector('.grid-container').classList.add('horizontal'+(i+1)+'-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();  }
}

// Check columns
for (let j = 0; j < 3; j++) {
  if (board[0][j] === human && board[1][j] === human && board[2][j]=== human) {
    document.querySelector('.grid-container').classList.add('vertical'+(j+1)+'-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();  }
  else if (board[0][j] === computer && board[1][j] === computer && board[2][j]=== computer) {
    document.querySelector('.grid-container').classList.add('vertical'+(j+1)+'-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();  }  
  }


  // Check diagonals
  if (board[0][0] === human && board[1][1] === human && board[2][2] === human) {
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    textElem.innerHTML = "Human Won!"
  }
  else if (board[0][0] === computer && board[1][1] === computer && board[2][2] === computer) {
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    textElem.innerHTML = "Computer Won!"
  }
  else if (board[0][2] === human && board[1][1] === human && board[2][0] === human) {
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    textElem.innerHTML = "Human Won!";    LockDisplay();
  }
  else if (board[0][2] === computer && board[1][1] === computer && board[2][0] === computer) {
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    textElem.innerHTML = "Computer Won!";    LockDisplay();
  }
 
  const tie = Tie();
  if(player === computer && !tie && board[0][0]!=="ended"){
    computerMove(); 
  }
}

function Start(whoStart){
  player = whoStart;
  for (let i=0; i<3; i++)
    for(let j=0; j<3; j++)
      board[i][j] = '_';
  
  document.querySelector('.grid-container').classList.remove('horizontal1-win');
  document.querySelector('.grid-container').classList.remove('horizontal2-win');
  document.querySelector('.grid-container').classList.remove('horizontal3-win');

  document.querySelector('.grid-container').classList.remove('vertical1-win');
  document.querySelector('.grid-container').classList.remove('vertical2-win');
  document.querySelector('.grid-container').classList.remove('vertical3-win');

  document.querySelector('.grid-container').classList.remove('diagonal-win-lr');
  document.querySelector('.grid-container').classList.remove('diagonal-win-rl');


  UpdateDisplay(player);

}

function LockDisplay(){
  for (let i=0; i<3; i++)
    for (let j=0; j<3; j++)
      board[i][j] = 'ended';  
}
