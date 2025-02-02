const words = ["hello world", "speed typing", "javascript fun", "practice coding"];
let startTime;
let wordDisplay = document.getElementById("word-display");
let textInput = document.getElementById("text-input");
let timerDisplay = document.getElementById("timer");
let wpmDisplay = document.getElementById("wpm");
let restartButton = document.getElementById("restart");

// Show a random word
function setNewWord() {
    wordDisplay.textContent = words[Math.floor(Math.random() * words.length)];
    textInput.value = "";
    startTime = null; 
}

// Start timer
textInput.addEventListener("input", () => {
    if (!startTime) {
        startTime = new Date();
        setInterval(updateTimer, 100);
    }
    checkTyping();
});

// Update timer
function updateTimer() {
    if (startTime) {
        let elapsedTime = (new Date() - startTime) / 1000;
        timerDisplay.textContent = `Time: ${elapsedTime.toFixed(1)}s`;
    }
}

// Check typing
function checkTyping() {
    if (textInput.value === wordDisplay.textContent) {
        let elapsedTime = (new Date() - startTime) / 1000;
        let wpm = (wordDisplay.textContent.split(" ").length / (elapsedTime / 60)).toFixed(2);
        wpmDisplay.textContent = `WPM: ${wpm}`;
        setNewWord();
    }
}

// Restart game
restartButton.addEventListener("click", () => {
    setNewWord();
    timerDisplay.textContent = "Time: 0s";
    wpmDisplay.textContent = "WPM: 0";
});

setNewWord();
