const calculator = document.querySelector('.calculator')
const screen = document.querySelector('.screen')
const display = document.querySelector('.display')
const keyboard = document.querySelector('.keyboard')
const buttons = document.querySelectorAll('.btn')
const numbersBtn = document.querySelectorAll('.number')
const allClearBtn = document.querySelector('.all-clear')
const delBtn = document.querySelector('.del')
const divideBtn = document.querySelector('.divide')
const addBtn = document.querySelector('.add')
const substractBtn = document.querySelector('.substract')
const multiplyBtn = document.querySelector('.multiply')
const percentBtn = document.querySelector('.percent')
const dotBtn = document.querySelector('.dot')
const equalBtn = document.querySelector('.equal')
const executeBtn = document.querySelectorAll('.execute')

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) return 'ERROR'
  else return a / b
}

function neg(a) {
  return a * -1
}

// console.log(add(2, 3))
// console.log(substract(2, 5))
// console.log(multiply(2, 3))
// console.log(divide(2, 0))
// console.log(percent(2, 3))

function operate(op, num1, num2) {
  switch (op) {
    case 'add':
      return add(num1, num2)
    case 'substract':
      return substract(num1, num2)
    case 'multiply':
      return multiply(num1, num2)
    case 'divide':
      return divide(num1, num2)
    default:
      return 'Not operate'
  }
}

// console.log(operate('add', 1, 2))
// console.log(operate('subtract', 2, 5))
// console.log(operate('divide', 1, 0))
// console.log(operate('multiply', 1, 2))

buttons.forEach((button) => {
  button.addEventListener('click', handleClick)
})

let number = []
let result = 0
let tempNum = ''
let calc = []

function displayResult(a) {
  display.textContent = checkLength(a.toString()) ? a : 'ERROR'
}

function clear() {
  number = []
  calc.shift()
  tempNum = ''
}

function checkLength(a) {
  return a.length < 12
}

function handleClick() {
  let button = this.classList[1]
  if (button === 'number') {
    if (checkLength(tempNum)) {
      tempNum += this.textContent
      displayResult(tempNum)
    }
  }
  if (button === 'execute') {
    if (tempNum !== '') {
      number.push(Number(tempNum))
      tempNum = ''
      calc.push(this.classList[2])
      if (number.length >= 2 && calc[0]) {
        result = Number(operate(calc[0], number[0], number[1]).toFixed(3))
        number[0] = result
        number.pop()
        calc.shift()
        displayResult(result)
      }
    }
  }
  if (button === 'equal') {
    if (tempNum !== '') {
      if (!number[0] || (number[0] && calc[0])) {
        number.push(Number(tempNum))
      } else {
        number = []
      }
      tempNum = ''
      if (number.length === 2 && calc[0]) {
        result = Number(operate(calc[0], number[0], number[1]).toFixed(3))
        number[0] = result
        displayResult(result)
        clear()
      }
    }
  }
  if (button === 'dot') {
    if (!tempNum.includes('.')) {
      tempNum += '.'
      displayResult(tempNum)
    }
  }
  if (button === 'all-clear') {
    result = 0
    clear()
    displayResult(result)
  }
  if (button === 'del') {
    if (tempNum.length !== 0) {
      tempNum = tempNum.substring(0, tempNum.length - 1)
      displayResult(tempNum)
    }
  }
  if (button === 'neg') {
    tempNum = neg(Number(tempNum))
    displayResult(tempNum)
  }
}
