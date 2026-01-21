/* =====================
   Global Variables
===================== */
let display = "0";
let operand1 = null;
let operand2 = null;
let operator = null;
let history = [];

/* =====================
   Display Functions
===================== */
function updateDisplay() {
  document.getElementById("display").textContent = display;
}

/* =====================
   Append Digit
===================== */
function appendDigit(digit) {
  // ป้องกัน leading zero
  if (display === "0" && digit === 0) return;

  if (display === "0") {
    display = String(digit);
  } else {
    display += String(digit);
  }
  updateDisplay();
}

/* =====================
   Append Decimal
===================== */
function appendDecimal() {
  if (!display.includes(".")) {
    display += ".";
    updateDisplay();
  }
}

/* =====================
   Select Operator
===================== */
function selectOperator(op) {
  if (operand1 === null) {
    operand1 = Number(display);
  } else {
    calculate();
  }
  operator = op;
  display = "";
}

/* =====================
   Calculate Result
===================== */
function calculate() {
  if (operand1 === null || operator === null) return;

  operand2 = Number(display);

  // ป้องกันหารด้วยศูนย์
  if (operator === "÷" && operand2 === 0) {
    alert("Cannot divide by zero!");
    clearAll();
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "÷":
      result = operand1 / operand2;
      break;
  }

  history.push(`${operand1} ${operator} ${operand2} = ${result}`);

  display = String(result);
  operand1 = null;
  operand2 = null;
  operator = null;

  updateDisplay();
  updateHistoryDisplay();
}

/* =====================
   Clear All
===================== */
function clearAll() {
  display = "0";
  operand1 = null;
  operand2 = null;
  operator = null;
  updateDisplay();
}

/* =====================
   History Display
===================== */
function updateHistoryDisplay() {
  const historyList = document.getElementById("history-list");

  historyList.innerHTML = [...history]
    .reverse()
    .slice(0, 10)
    .map((item) => `<p>${item}</p>`)
    .join("");
}

/* =====================
   Event Listeners
===================== */
// Numbers
for (let i = 0; i <= 9; i++) {
  document
    .getElementById(`btn-${i}`)
    .addEventListener("click", () => appendDigit(i));
}

// Operators
document
  .getElementById("btn-add")
  .addEventListener("click", () => selectOperator("+"));
document
  .getElementById("btn-subtract")
  .addEventListener("click", () => selectOperator("-"));
document
  .getElementById("btn-multiply")
  .addEventListener("click", () => selectOperator("×"));
document
  .getElementById("btn-divide")
  .addEventListener("click", () => selectOperator("÷"));

// Other controls
document.getElementById("btn-decimal").addEventListener("click", appendDecimal);
document.getElementById("btn-equals").addEventListener("click", calculate);
document.getElementById("btn-clear").addEventListener("click", clearAll);
