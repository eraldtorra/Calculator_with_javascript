const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = displayValue + digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) return;

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}



function handleOperator(nextOperator) {

  let parseFloatOld=null ;

  const { firstOperand, displayValue, operator } = calculator;


  let inputValue;
  
  if (calculator.operator == null){

    inputValue = parseFloat(displayValue);
  }else{

    const parts = displayValue.split(operator);

    
    inputValue = parseFloat(parts[1]);
  }

     
 


  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
    
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
    
  }


  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  calculator.displayValue = `${calculator.displayValue} ${nextOperator} `;
  

  
}
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

// back

function backButton() {

  const {displayValue, waitingForSecondOperand,operator} = calculator;

  if (operator == null){
    calculator.displayValue = '0';
  }else if(waitingForSecondOperand == true){
    calculator.displayValue = displayValue.slice(0, -3);
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    calculator.firstOperand = null;

    
}else{
  calculator.displayValue = displayValue.slice(0, -1);
  
}
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    case '=':
      handleOperator(value);
      calculator.displayValue = `${calculator.firstOperand}`;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
      calculator.firstOperand = null;
      break;

    case 'back':
      backButton();
      break;

    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
