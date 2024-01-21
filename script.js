document.addEventListener('DOMContentLoaded', function () {
    let expression = "";
    let display = document.querySelector('.display div');

    // Function to update the display
    function updateDisplay() {
        display.textContent = expression || "0";
    }

    // Function to handle number button click
    function handleNumberClick(number) {
        expression += number;
        updateDisplay();
    }

    // Function to handle operator button click
    function handleOperatorClick(operator) {
        if (operator === '%' && expression !== "") {
            // If the operator is '%', calculate the percentage
            expression = (eval(expression) / 100).toString();
        } else if (expression !== "" && !isNaN(expression[expression.length - 1])) {
            expression += operator;
        }
        updateDisplay();
    }

    // Function to handle equal button click
    function handleEqualClick() {
        try {
            expression = eval(expression).toString();
            updateDisplay();
        } catch (error) {
            expression = "Error";
            updateDisplay();
        }
    }

    // Function to handle clear button click
    function handleClearClick() {
        expression = "";
        updateDisplay();
    }

    // Function to handle backspace button click
    function handleBackspaceClick() {
        expression = expression.slice(0, -1);
        updateDisplay();
    }

    // Function to handle decimal point button click
    function handleDecimalClick() {
        // Check if the last character is not already a decimal point
        if (!/[.]/.test(expression[expression.length - 1])) {
            expression += ".";
        }
        updateDisplay();
    }

    // Function to handle keyboard inputs
    function handleKeyboardInput(event) {
        const key = event.key;

        if (/[0-9]/.test(key)) {
            handleNumberClick(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleOperatorClick(key);
        } else if (key === '%') {
            handleOperatorClick('%');
        } else if (key === 'Enter') {
            handleEqualClick();
        } else if (key === 'Backspace') {
            handleBackspaceClick();
        } else if (key === '.') {
            handleDecimalClick();
        }
    }

    // Event listeners for button clicks
    document.querySelectorAll('.num').forEach((num) => {
        num.addEventListener('click', (e) => handleNumberClick(e.target.innerHTML));
    });

    document.querySelectorAll('.op').forEach((op) => {
        op.addEventListener('click', (e) => handleOperatorClick(e.target.id));
    });

    document.querySelectorAll('.equal').forEach((equal) => {
        equal.addEventListener('click', handleEqualClick);
    });

    document.querySelectorAll('.clear').forEach((clear) => {
        clear.addEventListener('click', handleClearClick);
    });

    document.querySelectorAll('.del').forEach((del) => {
        del.addEventListener('click', handleBackspaceClick);
    });

    document.querySelectorAll('.decimal').forEach((decimal) => {
        decimal.addEventListener('click', handleDecimalClick);
    });

    // Event listener for keyboard inputs
    document.addEventListener('keydown', handleKeyboardInput);
});

