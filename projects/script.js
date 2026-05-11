const button = document.getElementById("btn");
const message = document.getElementById("message");
const title = document.getElementById("title");

// Greeting feature
button.addEventListener("click", function () {
    message.textContent = "Hello! Welcome to your developer journey 🚀";
    message.style.color = "green";
    title.textContent = "You are now interacting with the DOM!";
});


// Counter feature
let count = 0;

const countDisplay = document.getElementById("count");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

increaseBtn.addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;
});

decreaseBtn.addEventListener("click", function () {
    count--;
    countDisplay.textContent = count;
});
// DARK MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// Live Text Preview
const textInput = document.getElementById("textInput");
const preview = document.getElementById("preview");

textInput.addEventListener("input", function () {
    preview.textContent = textInput.value;
});