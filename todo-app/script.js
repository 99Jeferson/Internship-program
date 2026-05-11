const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


// ADD TASK
addBtn.addEventListener("click", function () {

    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // CREATE TASK ITEM
    const li = document.createElement("li");

    // TASK TEXT
    const span = document.createElement("span");
    span.textContent = taskText;

    // COMPLETE TASK
    span.addEventListener("click", function () {
        span.classList.toggle("completed");
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    // APPEND ITEMS
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // CLEAR INPUT
    taskInput.value = "";
});