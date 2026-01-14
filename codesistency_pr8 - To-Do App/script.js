const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todoList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value);
});
taskInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addTodo(taskInput.value);
});

clearCompletedBtn.addEventListener("click", clearCompleted);

function addTodo(text) {
    if(text.trim()=="") return;
    const todo = {
        id: Date.now(),
        text,
        completed: false
    }
    todos.push(todo);
    saveTodos();
    renderTodos();
    taskInput.value = "";
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    updateItemsCount();
}

function updateItemsCount () {
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    itemsLeft.textContent = `${uncompletedTodos.length} item${
    uncompletedTodos.length !==1 ? "s":""
    } left`;
}

function checkEmptyState () {
    // returns an array of uncompleted tasks.
    const filteredTodos = filterTodos(currentFilter);
    if (filteredTodos.length === 0) emptyState.classList.remove("hidden");
    else emptyState.classList.add("hidden");
}
function filterTodos(filter) {
    // receives which filter {all, active, completed} string is set
    // then returns a filtered array depending on the filter value
    switch(filter) {
        case "active":
            return todos.filter(todo => !todo.completed);
        case "completed":
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}
function renderTodos() {
    // This function will be called whenever there are changes in the todolist
    // 
    todoList.innerHTML = "";
    const filteredTodos = filterTodos(currentFilter);
    console.log(filteredTodos)
    filteredTodos.forEach(todo => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if(todo.completed) todoItem.classList.add("completed");

        const checkboxContainer = document.createElement("label");
        checkboxContainer.classList.add("checkbox-container");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkmark);

        const todoText = document.createElement("span");
        todoText.classList.add("todo-item-text");
        todoText.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `<i class="las la-times"></i>`;
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        todoItem.appendChild(checkboxContainer, deleteBtn);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);

        todoList.appendChild(todoItem);
    });

    checkEmptyState();
}
function toggleTodo(id){
    todos = todos.map(todo => {
        if(todo.id == id) {
            // returns all the existing properties of the todo object inside the todos array
            // then add this particular toggled todo then switch its todo.completed value.
            return {...todo, completed: !todo.completed};
        }
        return todo;
    })
    saveTodos();
    renderTodos();

}
function deleteTodo(id){
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}
function clearCompleted () {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}
function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if(storedTodos) todos = JSON.parse(storedTodos);
    renderTodos();
}
function setDate() {
    const options = {weekday: "long", month:"short", day:"numeric"};
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString("en-US", options);
}

window.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    updateItemsCount();
    setDate();
});

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        console.log(filter)
        setActiveFilter(filter.getAttribute("data-filter"));
    })
});

function setActiveFilter(filter) {
    currentFilter = filter;
    filters.forEach(item => {
        if(item.getAttribute("data-filter") === filter) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    renderTodos();
}