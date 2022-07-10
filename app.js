const calculatorDisplay = document.querySelector('h1')
const inputBtn = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')


let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false


function sendNumberValue (number){
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else{
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent =displayValue ==='0' ? number :displayValue + number
    }
}

function addDecimal(){
    if(awaitingNextValue) return
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`

    }
}

const calculator = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator){
    const currantValue = Number(calculatorDisplay.textContent)
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    } 
    if(!firstValue) {
        firstValue = currantValue
    } else{
        console.log(firstValue, operatorValue, currantValue)
        const calculation = calculator[operatorValue](firstValue, currantValue)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation
    }
    awaitingNextValue = true
    operatorValue = operator
}

// Add Event Listeners for number, operators, decimal buttons

inputBtn.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    }
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

// Reset all values Value

function resetAll(){
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = '0'
}

// Event Listener

clearBtn.addEventListener('click', resetAll)