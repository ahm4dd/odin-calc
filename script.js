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
    let numbers = expr.split(" ")
    .filter((n) => n !== "" && !(n in availableOperators))
    .map((n) => parseFloat(n));
    let operators = expr.split(" ").filter((n) => n !== "" && (n in availableOperators));
    
    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
        result = availableOperators[operators[i]](result, numbers[i + 1]);
    }
    
    return result;
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

// listen to the buttons pressed, check their class and act accordingly
// if number then we add it to the text
// we make a function to parse the number and either returns an int or a float
// also the parser should get rid of the operators
