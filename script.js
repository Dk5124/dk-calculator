function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculateResult() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}

function backspace() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
function calculateResult() {
  try {
    let expression = document.getElementById("display").value;

    // Replace all '%' with '/100' for percentage logic
    expression = expression.replace(/%/g, '/100');

    const result = eval(expression);
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}
document.addEventListener('keydown', function(event) {
  const key = event.key;
  const display = document.getElementById("display");

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    display.value += key;
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Tab") {
    event.preventDefault(); 
    toggleDarkMode();      
  }
});
function calculateResult() {
  try {
    let expression = document.getElementById("display").value;
    expression = expression.replace(/%/g, "/100");
    const result = eval(expression);
    document.getElementById("display").value = result;

    addToHistory(expression, result);
  } catch {
    document.getElementById("display").value = "Error";
  }
}
function addToHistory(expression, result) {
  const historyList = document.getElementById("historyList");
  const listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${result}`;
  historyList.prepend(listItem); // Add newest on top
}
function clearHistory() {
  document.getElementById("historyList").innerHTML = "";
}
function addToHistory(expression, result) {
  const historyList = document.getElementById("historyList");
  const listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${result}`;
  historyList.prepend(listItem);

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.unshift(`${expression} = ${result}`);
  localStorage.setItem("calcHistory", JSON.stringify(history));
}
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  const historyList = document.getElementById("historyList");

  history.forEach(entry => {
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyList.appendChild(listItem);
  });
}

// Call it immediately
window.onload = function () {
  loadHistory();
};
function clearHistory() {
  document.getElementById("historyList").innerHTML = "";
  localStorage.removeItem("calcHistory");
}
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");

  // Save current mode
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Show notification
  if (isDark) {
    showNotification("🌙 Dark Mode Enabled");
  } else {
    showNotification("☀️ Light Mode Disabled");
  }
}
window.onload = function () {
  loadHistory();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
};
let recognition;
function startVoiceInput() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    let speech = event.results[0][0].transcript.toLowerCase();

    // Convert words to math symbols
    speech = speech
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/times|into|multiply/g, "*")
      .replace(/divided by|divide/g, "/")
      .replace(/percent|percentage/g, "%")
      .replace(/point/g, ".")
      .replace(/is equal to/g, "=")
      .replace(/point/g, ".")
      .replace(/clear|delete/g, "c");

    document.getElementById("display").value = speech;
    calculateResult();
  };

  recognition.onerror = function () {
    showNotification("🎤 Voice input failed");
  };
}

function calculateResult() {
  try {
    let expression = document.getElementById("display").value;
    expression = expression.replace(/%/g, "/100");
    const result = eval(expression);
    document.getElementById("display").value = result;

    addToHistory(expression, result);
    
    // Read the result aloud
    speakResult(result);
  } catch {
    document.getElementById("display").value = "Error";
    speakResult("Error");
  }
}
function speakResult(result) {
  const utterance = new SpeechSynthesisUtterance(result.toString());
  utterance.lang = 'en-US'; // You can change to other languages like 'en-GB', 'fr-FR', etc.
  window.speechSynthesis.speak(utterance);
}
function toggleHistory() {
  const historySection = document.getElementById("historySection");
  const toggleBtn = document.querySelector(".toggle-history-btn");

  const isVisible = historySection.style.display === "block";

  historySection.style.display = isVisible ? "none" : "block";
  toggleBtn.textContent = isVisible ? "Show History" : "Close History";
}


