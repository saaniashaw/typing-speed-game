// Select the dark mode toggle button
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Check if dark mode was previously enabled
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

// Select the difficulty dropdown and game controls
const difficultySelect = document.getElementById("difficulty");
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer-display");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

// Word list for different difficulties
const words = {
    easy: ["cat", "dog", "sun", "run", "jump", "ball", "happy", "apple", "moon", "fish", "star", "bird"],
    medium: ["pencil", "bottle", "guitar", "elephant", "rainbow", "sunlight", "mountain", "flower", "computer", "music"],
    hard: ["encyclopedia", "unbelievable", "extraordinary", "hypothetical", "misunderstanding", "philosophical", "technological", "metamorphosis"]
};

// Set default difficulty
let currentDifficulty = "medium";
let time = 10;
let score = 0;
let timer;
let currentWord;

// Start button event
startButton.addEventListener("click", startGame);

// Function to update game stats (score, time)
function updateGame() {
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${time}`;
}

// Function to start the game
function startGame() {
    score = 0;
    time = 10;
    updateGame();
    wordInput.value = '';
    nextWord();
    wordInput.disabled = false;
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
}

// Countdown timer function
function countdown() {
    time--;
    updateGame();

    // Update the progress bar with remaining time
    const progressPercentage = (time / 10) * 100;  // Assuming the game time is 10 seconds
    progressBar.value = progressPercentage;

    if (time <= 0) {
        clearInterval(timer);
        alert(`Game Over! Final score: ${score}`);
        resetGame();
    }
}

// Function to get a random word based on selected difficulty
function nextWord() {
    const wordList = words[currentDifficulty];
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordDisplay.textContent = currentWord;
}

// Event listener for input (check if the word matches)
wordInput.addEventListener("input", () => {
    if (wordInput.value === currentWord) {
        score++;
        wordInput.value = ''; // Clear input field
        nextWord(); // Show next word
    }
});

// Change difficulty when the user selects a new option
difficultySelect.addEventListener("change", () => {
    currentDifficulty = difficultySelect.value;
    resetGame();
});

// Reset the game after time is up or difficulty change
function resetGame() {
    wordInput.value = '';
    wordInput.disabled = true;
    score = 0;
    time = 10;
    updateGame();
    progressBar.value = 0;  // Reset progress bar to 0
}
