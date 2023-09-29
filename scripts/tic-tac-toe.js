// 1 == X   (computer)
// 2 == O   (human)
const computer = 1;
const human = 2;

//let turn = Math.random()>0.5 ? computer : human; 

let turn = human;

const matrix=[
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked",
    "unClicked"];

LockDisplay();

function minMax(board, depth, isMaximizingPlayer) {
  // Base case: Check if the game is over (e.g., win, tie, or depth limit reached)
  const result = checkGameResult(board);
  if (result !== null) {
    return result; // Return the score
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "unClicked") {
          board[i][j] = computer; // Make a move for the computer
          const score = minMax(board, depth + 1, false);
          board[i][j] = "unClicked"; // Undo the move
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "unClicked") {
          board[i][j] = human; // Make a move for the human player
          const score = minMax(board, depth + 1, true);
          board[i][j] = "unClicked"; // Undo the move
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function minMax(){

}

function computerMove(){

 // Get a reference to the overlay element
const overlay = document.getElementById('overlay');

overlay.style.pointerEvents = 'auto'; // Enable pointer events to block interactions


  let chose = false;
  let num = Math.round(Math.random()*8); 
  while(!chose){
    if(matrix[num]==="unClicked")
      chose=true;
    else
      num = Math.round(Math.random()*8);  
  }
  setTimeout(function(){
       num++;

    //  num = minMax();
      Click(num);
      // To disable the overlay (make it transparent and non-blocking)
    overlay.style.backgroundColor = 'transparent';
    overlay.style.pointerEvents = 'none';
  },1000);      
 



}

function Click(param){
  const index = param-1;
  if (index >= 0 && index < 9 && matrix[index] === "unClicked") {
    if (turn === 1) { // computer
      matrix[index] = "clicked1";
    } else if (turn === 2) { // human
      matrix[index] = "clicked2";
    }
    turn = 3 - turn; // Toggle the turn between 1 and 2
    UpdateDisplay();

  }
}

function isTie() {// check if Tie
  let Tie = true;
  for (let i=0; i<9; i++)
    if(matrix[i]==="unClicked" || matrix[i]==="ended"){
      Tie = false;
      break;
    }
  if(Tie){
    document.querySelector('.display-turns-js').innerHTML = "Tie!";
  }
  return Tie;
}


function UpdateDisplay(){
  document.querySelector('.display-turns-js').innerHTML = (turn === human) ? "Human turn" : "Computer Turn";
  {
    for(let i=0;i<9;i++){
    if(matrix[i]==="unClicked"){
      document.querySelector('.div'+(i+1)).
      innerHTML='';
    }
    else if(matrix[i]==="clicked1"){ // computer
      document.querySelector('.div'+(i+1)).
      innerHTML="<img src='images\\X.png' width=\"300px\" height=\"300px\">";
      console.log(i + " clicked1");
    } // human
    else if(matrix[i]==="clicked2"){
      document.querySelector('.div'+(i+1)).innerHTML="<img src='images\\O.png'>";
      console.log(i + " clicked2");
    }
  }
}
  
  textElem = document.querySelector('.display-turns-js');
  
  {
  // check if player O won (1)
  if(matrix[0]==="clicked1" && matrix[1]==="clicked1" && matrix[2]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal1-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  else if(matrix[3]==="clicked1" && matrix[4]==="clicked1" && matrix[5]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal2-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  else if(matrix[6]==="clicked1" && matrix[7]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal3-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }

  else if(matrix[0]==="clicked1" && matrix[3]==="clicked1" && matrix[6]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical1-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  else if(matrix[1]==="clicked1" && matrix[4]==="clicked1" && matrix[7]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical2-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  else if(matrix[2]==="clicked1" && matrix[5]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical3-win');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }

  else if(matrix[0]==="clicked1" && matrix[4]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  else if(matrix[2]==="clicked1" && matrix[4]==="clicked1" && matrix[6]==="clicked1"){
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    textElem.innerHTML = "Computer Won!"
    LockDisplay();
  }
  }
  {
  // check if player X won (2) (human)
  if(matrix[0]==="clicked2" && matrix[1]==="clicked2" && matrix[2]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal1-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }
  else if(matrix[3]==="clicked2" && matrix[4]==="clicked2" && matrix[5]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal2-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }
  else if(matrix[6]==="clicked2" && matrix[7]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal3-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }

  else if(matrix[0]==="clicked2" && matrix[3]==="clicked2" && matrix[6]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical1-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }
  else if(matrix[1]==="clicked2" && matrix[4]==="clicked2" && matrix[7]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical2-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }
  else if(matrix[2]==="clicked2" && matrix[5]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical3-win');
    textElem.innerHTML = "Human Won!"
    LockDisplay();
  }

  else if(matrix[0]==="clicked2" && matrix[4]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    textElem.innerHTML = "Human Won!";    LockDisplay();
  }
  else if(matrix[2]==="clicked2" && matrix[4]==="clicked2" && matrix[6]==="clicked2"){
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    textElem.innerHTML = "Human Won!";    LockDisplay();
  }
  }
  const Tie = isTie();
  console.log("Is tie? " + Tie);
  console.log(turn);
  if(turn === computer && !Tie && matrix[0]!=="ended"){
    console.log("in if");
    computerMove(); 
  }
}



function Start(whoStart){
  turn = whoStart;
  console.log("Start");
  for (let i=0; i<9; i++)
    matrix[i]="unClicked";
  document.querySelector('.grid-container').classList.remove('horizontal1-win');
  document.querySelector('.grid-container').classList.remove('horizontal2-win');
  document.querySelector('.grid-container').classList.remove('horizontal3-win');

  document.querySelector('.grid-container').classList.remove('vertical1-win');
  document.querySelector('.grid-container').classList.remove('vertical2-win');
  document.querySelector('.grid-container').classList.remove('vertical3-win');

  document.querySelector('.grid-container').classList.remove('diagonal-win-lr');
  document.querySelector('.grid-container').classList.remove('diagonal-win-rl');


  UpdateDisplay();

}

function LockDisplay(){
  for (let i=0; i<9; i++)
    matrix[i]="ended";
}