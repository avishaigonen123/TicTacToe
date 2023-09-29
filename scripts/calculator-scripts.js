function UpdateDisplay(){
  document.querySelector('.display-calcs-js').innerHTML = calculation;
  if(calculation==="Infinity")
    console.log("ERROR!!");
}

function UpdateCalculation(key){
  if(key === "="){
    calculation = eval(calculation);
    localStorage.setItem('Calc', calculation);

  if(calculation===Infinity)
    document.querySelector('body').style.background ="url('/images/kaboom.jpg')";
  UpdateDisplay();
  }
  else{
    calculation += key;
    localStorage.setItem('Calc', calculation);
    console.log(calculation);
    UpdateDisplay();
  }
}

function ClearClac(){
  calculation='';
  localStorage.setItem('Calc', calculation);
  console.log(calculation);
  UpdateDisplay();
  document.querySelector('body').style.backgroundImage ="url('/images/monkey-image.jpg')";
}
let calculation = localStorage.getItem('Calc')|| '';
if(calculation)
  UpdateDisplay();



