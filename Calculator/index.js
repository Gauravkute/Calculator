const display = document.getElementById("display");
let currentInput = "";
let shouldResetDisplay = false;

function addToDisplay(input) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (display.textContent === "0" && input !== "+" && input !== "-" && input !== "*" && input !== "/") {
        currentInput = input;
    } else {
        currentInput += input;
    }

    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = "";
    display.textContent = "0";
    shouldResetDisplay = false;
}

function calculate() {
    try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');

        if (expression === "" || expression === "0") {
            return;
        }

        let result = eval(expression);

        if (!isFinite(result)) {
            display.textContent = "Error";
            currentInput = "";
            shouldResetDisplay = true;
            return;
        }

        // Format the result
        result = Math.round(result * 100000000) / 100000000; // Round to avoid floating point errors
        display.textContent = result;
        currentInput = result.toString();
        shouldResetDisplay = true;

    } catch (error) {
        display.textContent = "Error";
        currentInput = "";
        shouldResetDisplay = true;
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        addToDisplay(key);
    } else if (key === '+' || key === '-') {
        addToDisplay(key);
    } else if (key === '*') {
        addToDisplay('*');
    } else if (key === '/') {
        event.preventDefault(); 
        addToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
        }
    }
});

function makeSound() {
    try {
        new Audio("sound/button-click-sound.mp3").play();
    } catch (error) {
        console.log("Audio file does not exist");    
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', makeSound);
});