const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todoList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filters");

let todos = [];
let currentFilters = "all";

addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value);
});
taskInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addTodo(taskInput.value);
});

clearCompletedBtn.addEventListener("click", clearCompleted);

function addTodo(text) {
    if(text=="") return;

    todos.push(text);
    const taskEl = document.createElement("li");
    taskEl.textContent=text;
    todoList.innerHTML = `
        <li class="todo-item">
            <label class="checkbox-container">
                <input type="checkbox" class="todo-checkbox">
                <span class="checkmark"></span>
            </label>
            <span class="todo-item-text">${text}</span>
            <button class="delete-btn"><i class="las la-times"></i></button>
        </li>
    `;
    // @5:25:45
}