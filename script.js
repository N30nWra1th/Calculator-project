'use strict';
class Calculator {
  constructor(history, display) {
    this.history = history;
    this.display = display;
    this.clear();
  }

  clear() {
    this.historyContent = '';
    this.displayContent = '';
    this.operation = undefined;
  }

  del() {
    this.displayContent = this.displayContent.toString().slice(0, -1);
  }

  appendNr(number) {
    if (number === '.' && this.displayContent.includes('.')) return;
    this.displayContent = this.displayContent.toString() + number.toString();
  }

  exeOp(operation) {
    if (this.displayContent === '') return;
    if (this.historyContent !== '') {
      this.compute();
    }
    this.operation = operation;
    this.historyContent = this.displayContent;
    this.displayContent = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.historyContent);
    const current = parseFloat(this.displayContent);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.displayContent = computation;
    this.operation = undefined;
    this.historyContent = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('hu', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      //using strict not equal (!==) here results in the decimal numbers showing undefined if no decimal number is present
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.display.innerText = this.getDisplayNumber(this.displayContent);
    if (this.operation != null) {
      //using strict not equal (!==) here results in the historyContent being undefined unless there is a number there
      this.history.innerText = `${this.getDisplayNumber(this.historyContent)} ${
        this.operation
      }`;
    } else {
      this.history.innerText = '';
    }
  }
}
// containers and groups
const display = document.querySelector('.output');
const history = document.querySelector('.history');
const numbers = document.querySelectorAll('.numbers');
const buttons = document.querySelectorAll('.operations');

// operations, buttons
const minus = document.querySelector('#reduce');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const square = document.querySelector('#square');
const result = document.querySelector('#result');
const reset = document.querySelector('#reset');
const del = document.querySelector('#delete');

// declaring functions for operation buttons
// // creating the global variables for later use
// let sum = [];

// // once we have the result, we want to reset memory. For that we have a conditional that checks wether operations are complete or not
// let complete = false;

// // function to reset memory and display to 0
// const clear = () => {
//   display.textContent = 0;
//   sum = [];
//   complete = false;
// };

// // a function to get a visible sign of a buttonpress, bz changing the opacity. Can be applied to any buttons
// const highLight = function (el) {
//   el.style.opacity = 1;
//   setTimeout(() => (el.style.opacity = 0.7), 100);
// };

// // clear all previous operations from the display and memory, calling the previous function, and giving a bit of highlight to the buttonpress
// reset.addEventListener('click', () => {
//   clear();
//   highLight(reset);
// });

// // showing the results of the sum of operations
// result.addEventListener('click', e => {
//   highLight(result);
//   if (eval(sum.join('') === NaN)) {
//     display.textContent = 'ERROR';
//   } else {
//     display.textContent = eval(sum.join(''));
//     // console.log(eval(sum.join('')), sum);
//     complete = true;
//   }
//   console.log(complete);
// });

// // a function to push the values into an array, both numbers and operators
// const buttonPress = function (buttons) {
//   if (complete === false) {
//     // if(buttons)
//     buttons.forEach(function (e) {
//       e.addEventListener('click', () => {
//         sum.push(e.textContent);
//         display.textContent = e.textContent;
//         console.log(complete);
//         highLight(e);
//       });
//     });
//   }
//   if (complete === true) {
//     clear();
//     console.log(complete);
//     // complete = false;
//   }
// };
// // calling functions for the numbers and operations separately
// buttonPress(numbers);
// buttonPress(buttons);

// second attempt with youtube tutorial, this time using classes, instead of arrays to get and store the numbers.

const calculator = new Calculator(history, display);

numbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNr(button.innerText);
    calculator.updateDisplay();
  });
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.exeOp(button.innerText);
    calculator.updateDisplay();
  });
});

result.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

reset.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

del.addEventListener('click', button => {
  calculator.del();
  calculator.updateDisplay();
});
