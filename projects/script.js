const button = document.getElementById("btn");
const message = document.getElementById("message");
const title = document.getElementById("title");

button.addEventListener("click", function () {
    message.textContent = "Hello! Welcome to my developer journey ";
    message.style.color = "green";

    title.textContent = "You just interacted with the DOM!";
});