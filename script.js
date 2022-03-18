
let OPERAND1 = '';
let OPERAND2 = '';
let OPERATOR = '';

const buttonContainer = document.querySelector('.buttonContainer');
buttonContainer.addEventListener('click', buttonClicked);

const prevOperation = document.querySelector('.prevOperations');
const currOperation = document.querySelector('.currOperations');


function buttonClicked(e) {
    
    const operands = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '±'];
    if (operands.includes(e.target.id)) {
        if (OPERATOR == '') OPERAND1 = updateOperand(OPERAND1, e.target.id)
        else OPERAND2 = updateOperand(OPERAND2, e.target.id)
    }

    const operators = ['÷', '×', '-', '+', '='];
    if (operators.includes(e.target.id)) {   
        if (OPERAND1 != '' && OPERAND1 != 'INVALID' && OPERAND2 == '' && e.target.id != '=') OPERATOR = e.target.id
        if (OPERAND2 != '') {
            [OPERAND1, OPERAND2, OPERATOR] = operate(e);        
        }
    }

    if(e.target.id == 'clear') clear();
    if(e.target.id == 'delete') deletion();
    
    updateCurrOperation();
};


function updateCurrOperation() {
    currOperation.textContent = OPERAND1 + ' ' + OPERATOR + ' ' + OPERAND2;
}


function updatePrevOperation() {
    prevOperation.textContent = currOperation.textContent;
}


function updateOperand(operand, value) {
    if (operand == 'INVALID') return operand
    
    if (value == '.') {
        if (operand.includes('.')) return operand
        if (operand == '') return '0.'
        else return operand += value
    }

    else if (value == '±') {
        if (operand == '' || operand == '0' || operand == '0.') return operand
        if (operand.includes('-')) return operand.substring(1)
        else return operand = '-' + operand
    } 

    else if (value == '0' && operand == '0') return operand
    else if (value == '0' && operand == '')  return '0'
    else if (value != '0' && operand == '0') return value
    else return operand += value
}


function clear() {
    [OPERAND1, OPERAND2, OPERATOR] = ['', '', ''];
    currOperation.textContent = '';
    prevOperation.textContent = '';
}


function deletion() {
    if (OPERAND1 == 'INVALID') return
    if (OPERATOR == '') OPERAND1 = String(OPERAND1).slice(0, -1);
    if (OPERAND2 == '') OPERATOR = String(OPERATOR).slice(0, -1);
    else OPERAND2 = String(OPERAND2).slice(0, -1);
}


function operate(e) {
    if (OPERAND1 == '' || OPERAND1 == 'INVALID' || OPERAND2 == '') {
        OPERAND1 = 'INVALID';
    }

    a = Number(OPERAND1);
    b = Number(OPERAND2);

    updatePrevOperation();
    if (OPERATOR == '×') OPERAND1 = a * b;
    if (OPERATOR == '-') OPERAND1 = a - b;
    if (OPERATOR == '+') OPERAND1 = a + b;
    if (OPERATOR == '÷') {
        if (b == 0) OPERAND1 = 'INVALID';
        else OPERAND1 = a / b;
    }

    OPERAND2 = '';
    OPERATOR = (e.target.id == '=') ? '' : e.target.id;
    return [OPERAND1, OPERAND2, OPERATOR]
}