function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function mod(num1, num2) {
    return num1 % num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function calculate(expr) {
    const tokens = expr.trim().split(" ").filter(Boolean);
    let values = [];
    let ops = [];
    
    const applyOperation = () => {
        const op = ops.pop();
        const rightOperand = values.pop();
        const leftOperand = values.pop();
        
        values.push(availableOperators[op](leftOperand, rightOperand));
    }

    for (token of tokens) {
        if (token in availableOperators) {
            while (orderOfOperations[ops[ops.length - 1]] >= orderOfOperations[token]) {
                applyOperation();
            }

            ops.push(token);
        }

        else {
            values.push(parseFloat(token));
        }
    }
    
    while (ops.length > 0) {
        applyOperation();
    }

    return values[0];
}

const orderOfOperations = {
    "*": 2,
    "/": 2,
    "%": 2,
    "+": 1,
    "-": 1
}

const availableOperators = {
    "+": add, 
    "-": subtract, 
    "*": multiply, 
    "/": divide, 
    "%": mod
};

const buttonsContainer = document.querySelector(".buttons");
const screenText = document.querySelector("#output");

let expr = "";

let isUsingOperator = false;

buttonsContainer.addEventListener("click", (e) => {
    const target = e.target;
    
    if (target.classList.contains("number")) {
        if (screenText.textContent === "0") {
            screenText.textContent = target.textContent;
        } else {
            screenText.textContent += target.textContent;
        }
        expr += target.textContent;
    }
    
    else if (target.classList.contains("operator")) {
        if (!isUsingOperator) {
            expr += " " + target.textContent + " ";
            isUsingOperator = true;
        } else {
            expr += " " + target.textContent + " ";
        }
        screenText.textContent = expr;
    }
    
    else if (target.classList.contains("clear")) {
        expr = "";
        screenText.textContent = "0";
    }
    
    else if (target.classList.contains("delete")) {
        expr = expr.slice(0, expr.length - 1);
        screenText.textContent = expr;
    }
    
    else if (target.classList.contains("equal")) {
        screenText.textContent = calculate(expr);
        expr = screenText.textContent;
    }
});