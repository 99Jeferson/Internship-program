// Greeting Feature
const greetBtn = document.getElementById("greetBtn");
const message = document.getElementById("message");

greetBtn.addEventListener("click", function () {
    message.textContent = "Welcome to my web development journey!";
});


// Counter App
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const countDisplay = document.getElementById("count");

let count = 0;

increaseBtn.addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;
});

decreaseBtn.addEventListener("click", function () {
    if (count > 0) {
        count--;
        countDisplay.textContent = count;
    }
});


// Dark Mode
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