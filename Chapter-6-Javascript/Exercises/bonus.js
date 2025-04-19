// index.js

// Get elements from the DOM
const rgbDisplay = document.getElementById("rgb-display");
const optionsContainer = document.getElementById("options");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const playAgainBtn = document.getElementById("play-again");

// Game state variables
let lives = 3;
let score = 0;

// Generate a random RGB color string
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start a new round of the game
function newRound() {
  resultDisplay.textContent = "";
  optionsContainer.innerHTML = "";

  const correctColor = randomRGB();
  rgbDisplay.textContent = correctColor;

  // Generate a set of color options including the correct one
  const options = [correctColor];
  while (options.length < 3) {
    const newColor = randomRGB();
    if (!options.includes(newColor)) {
      options.push(newColor);
    }
  }

  // Shuffle the options array
  options.sort(() => Math.random() - 0.5);

  // Display color options as interactive divs
  options.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color-option");
    colorDiv.style.backgroundColor = color;

    // Handle user's guess
    colorDiv.addEventListener("click", () => {
      if (color === correctColor) {
        score++;
        resultDisplay.textContent = "Correct!";
        scoreDisplay.textContent = score;
      } else {
        lives--;
        resultDisplay.textContent = `Wrong! The correct color was ${correctColor}`;
        livesDisplay.textContent = lives;
      }

      // Check for end of game
      if (lives > 0) {
        setTimeout(newRound, 1000);
      } else {
        resultDisplay.textContent = `Game Over! Final Score: ${score}`;
        playAgainBtn.style.display = "inline-block";
      }
    });

    optionsContainer.appendChild(colorDiv);
  });
}

// Reset and start a new game
function startGame() {
  lives = 3;
  score = 0;
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  playAgainBtn.style.display = "none";
  newRound();
}

// Add event listener to play again button
playAgainBtn.addEventListener("click", startGame);

// Start the game on page load
startGame();
