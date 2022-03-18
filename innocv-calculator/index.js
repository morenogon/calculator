class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    // clean values as soon as new calculator is created
    clear = () => {
        this.prevOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete = () => {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber = (number) => {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation = (operation) => {
        if (this.currentOperand === '') return;
        if (this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute = () => {
        let result;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;

            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;

            case '/':
                result = prev / current;
                break;
            default:
                return
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateScreen = () => {
        this.currentOperandText.innerText = this.currentOperand;

        if (this.operation) {
            this.previousOperandText.innerText = `${this.prevOperand} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

const numberKeys = document.querySelectorAll('[data-number]');
const operationKeys = document.querySelectorAll('[data-operation]');
const deleteKey = document.querySelector('[data-delete]');
const clearKey = document.querySelector('[data-clear]');
const equalsKey = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberKeys.forEach(numberKey => {
    numberKey.addEventListener('click', () => {
        calculator.appendNumber(numberKey.innerText);
        calculator.updateScreen();
    })
});

operationKeys.forEach(operationKeys => {
    operationKeys.addEventListener('click', () => {
        calculator.chooseOperation(operationKeys.innerText);
        calculator.updateScreen();
    })
});

equalsKey.addEventListener('click', key => {
    calculator.compute();
    calculator.updateScreen();
});

deleteKey.addEventListener('click', key => {
    calculator.delete();
    calculator.updateScreen();
});

clearKey.addEventListener('click', key => {
    calculator.clear();
    calculator.updateScreen();
})