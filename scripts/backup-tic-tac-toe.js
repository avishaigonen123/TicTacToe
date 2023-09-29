// 1 == X   (computer)
// 2 == O   (human)
const computer = 1;
const human = 2;

let turn = Math.random()>0.5 ? computer : human; 


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

    document.addEventListener("DOMContentLoaded", function () {
      // Your existing JavaScript code goes here
    
      // For example, you can set the initial message here
    document.querySelector('.display-turns-js').innerHTML = (turn === human) ? "Human turn" : "Computer Turn";
      
    if(turn===computer)
      computerMove();

    });
    

function computerMove(){
  let chose = false;
  let num = Math.round(Math.random()*8);  
  while(!chose){
    if(matrix[num]==="unClicked")
      chose=true;
    else
      num = Math.round(Math.random()*8);  
  }
  console.log(num);
  setTimeout(function(){
    num++;
    Click(num);
  },20);
  
}

function Click(param){
  document.querySelector('.display-turns-js').innerHTML = (turn === human) ? "Human turn" : "Computer Turn";

  const index = param-1;
  if (index >= 0 && index < 9 && matrix[index] === "unClicked") {
    if (turn === 1) { // computer
      matrix[index] = "clicked1";
    } else if (turn === 2) { // human
      matrix[index] = "clicked2";
    }
    UpdateDisplay();
    turn = 3 - turn; // Toggle the turn between 1 and 2
  }


}
function UpdateDisplay(){
  for(let i=0;i<9;i++){
    if(matrix[i]==="unClicked")
      document.querySelector('.div'+(i+1)).innerHTML='';
    else if(matrix[i]==="clicked1")
      document.querySelector('.div'+(i+1)).innerHTML="<img src='images\\O.png'>";
    else
      document.querySelector('.div'+(i+1)).innerHTML="<img src='images\\X.png' width=\"300px\" height=\"300px\">";
  }
  
  // check if player O won (1)
  if(matrix[0]==="clicked1" && matrix[1]==="clicked1" && matrix[2]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal1-win');
    LockDisplay();
  }
  else if(matrix[3]==="clicked1" && matrix[4]==="clicked1" && matrix[5]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal2-win');
    LockDisplay();
  }
  else if(matrix[6]==="clicked1" && matrix[7]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('horizontal3-win');
    LockDisplay();
  }

  else if(matrix[0]==="clicked1" && matrix[3]==="clicked1" && matrix[6]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical1-win');
    LockDisplay();
  }
  else if(matrix[1]==="clicked1" && matrix[4]==="clicked1" && matrix[7]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical2-win');
    LockDisplay();
  }
  else if(matrix[2]==="clicked1" && matrix[5]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('vertical3-win');
    LockDisplay();
  }

  else if(matrix[0]==="clicked1" && matrix[4]==="clicked1" && matrix[8]==="clicked1"){
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    LockDisplay();
  }
  else if(matrix[2]==="clicked1" && matrix[4]==="clicked1" && matrix[6]==="clicked1"){
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    LockDisplay();
  }

  // check if player X won (2)
  if(matrix[0]==="clicked2" && matrix[1]==="clicked2" && matrix[2]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal1-win');
    LockDisplay();
  }
  else if(matrix[3]==="clicked2" && matrix[4]==="clicked2" && matrix[5]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal2-win');
    LockDisplay();
  }
  else if(matrix[6]==="clicked2" && matrix[7]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('horizontal3-win');
    LockDisplay();
  }

  else if(matrix[0]==="clicked2" && matrix[3]==="clicked2" && matrix[6]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical1-win');
    LockDisplay();
  }
  else if(matrix[1]==="clicked2" && matrix[4]==="clicked2" && matrix[7]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical2-win');
    LockDisplay();
  }
  else if(matrix[2]==="clicked2" && matrix[5]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('vertical3-win');
    LockDisplay();
  }

  else if(matrix[0]==="clicked2" && matrix[4]==="clicked2" && matrix[8]==="clicked2"){
    document.querySelector('.grid-container').classList.add('diagonal-win-lr');
    LockDisplay();
  }
  else if(matrix[2]==="clicked2" && matrix[4]==="clicked2" && matrix[6]==="clicked2"){
    document.querySelector('.grid-container').classList.add('diagonal-win-rl');
    LockDisplay();
  }

  let isTie = true;
  for (let i=0; i<9; i++)
    if(matrix[i]==="unClicked"){
      isTie = false;
      break;
    }
  if(isTie){
    document.querySelector('.display-turns-js').innerHTML = "Tie!";
  }
  if(turn === computer && !isTie){
   computerMove(); 
  }
}

function Reset(){
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
  document.querySelector('.display-turns-js').innerHTML = (turn === human) ? "Human turn" : "Computer Turn";
}

function LockDisplay(){
  for (let i=0; i<9; i++)
    matrix[i]="clicked";
  document.querySelector('.display-turns-js').innerHTML = (turn === human) ? "Human Won!" : "Computer Won!";
}