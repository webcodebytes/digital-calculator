"use strict";

// DOM elements
const input = document.getElementById("input"),
  number = document.querySelectorAll(".numbers div"),
  operator = document.querySelectorAll(".operators div"),
  result = document.getElementById("result"),
  clear = document.getElementById("clear");

// Flag to track if the result is currently displayed
let resultDisplayed = false;

// Event listeners for number buttons
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    const currentString = input.innerHTML,
      lastChar = currentString[currentString.length - 1];

    // Check conditions for appending to input
    if (
      resultDisplayed === false ||
      (resultDisplayed === true && /[0-9]/.test(lastChar))
    ) {
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = e.target.innerHTML;
    }
  });
}

// Event listeners for operator buttons
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    const currentString = input.innerHTML,
      lastChar = currentString[currentString.length - 1];

    // Check conditions for appending to input based on the last character
    if (/[\+\-\×\÷]/.test(lastChar)) {
      input.innerHTML = currentString.slice(0, -1) + e.target.innerHTML;
    } else if (currentString.length !== 0) {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// Event listener for the result button
result.addEventListener("click", function () {
  const inputString = input.innerHTML,
    numbers = inputString.split(/[\+\-\×\÷]/g),
    operators = inputString.replace(/[0-9]|\./g, "").split("");

  // Loop through each operator priority and perform calculations
  ["÷", "×", "-", "+"].forEach(function (operator) {
    while (operators.includes(operator)) {
      const index = operators.indexOf(operator);
      numbers.splice(
        index,
        2,
        operate(numbers[index], numbers[index + 1], operator)
      );
      operators.splice(index, 1);
    }
  });

  // Display the final result
  input.innerHTML = numbers[0];
  resultDisplayed = true;
});

// Event listener for the clear button
clear.addEventListener("click", function () {
  // Clear the input
  input.innerHTML = "";
});

// Function to perform basic arithmetic operations
function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "÷":
      return num1 / num2;
    case "×":
      return num1 * num2;
    case "-":
      return num1 - num2;
    case "+":
      return num1 + num2;
  }
}
