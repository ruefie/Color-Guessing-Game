let numSquares = 6; // Number of squares to show based on difficulty
let colors = []; // Array to store generated colors
let pickedColor; // Correct color to guess

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const color = document.querySelector("#color");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
      reset();
    });
  });
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.background; // Get the color of the clicked square
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor); // Change all squares to correct color
        // h1.style.background = clickedColor; // Change h1 header background
        colorDisplay.style.background = clickedColor; // Change the span's background
      } else {
        this.style.background = "#232323"; // Hide the incorrect square
        messageDisplay.textContent = "Try Again";
      }
    });
  });
}


function reset() {
  colors = generateRandomColors(numSquares); // Generate new colors
  pickedColor = pickColor(); // Pick a new target color
  colorDisplay.textContent = pickedColor; // Display the target color in the span
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";

  squares.forEach((square, index) => {
    if (colors[index]) {
      square.style.display = "block"; // Show the square
      square.style.background = colors[index]; // Set its color
    } else {
      square.style.display = "none"; // Hide extra squares in easy mode
    }
  });

  // h1.style.background = "steelblue"; // Reset header color
  colorDisplay.style.background = "steelblue"; // Reset span background to match h1
}


// Event listener for the reset button
resetButton.addEventListener("click", reset);

function changeColors(color) {
  squares.forEach((square) => {
    square.style.background = color; // Change all squares to the correct color
  });
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor()); // Add a random color to the array
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
