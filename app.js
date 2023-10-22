// Select DOM
const todoInput = document.querySelector(".Todo_Inputs");
const todoButton = document.querySelector(".Todo_Buttons");
const todoList = document.querySelector(".Todo_List");
const filterOption = document.querySelector(".Todo_Filter");

// Event Listeners
document.addEventListener("DOMContentLoaded", initializeApp);
todoButton.addEventListener("click", handleTodoAdd);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", handleFilterChange);

// Initialize the application
function initializeApp() {
  getTodosFromLocalStorage();
}

// Function to create a new todo element
function createTodoElement(todoText) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoText;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

// Function to handle todo addition
function handleTodoAdd(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    createTodoElement(todoText);
    saveTodoToLocalStorage(todoText);
    todoInput.value = "";
  }
}

// Function to handle todo completion or deletion
function handleTodoClick(event) {
  const target = event.target;
  if (target.classList.contains("complete-btn")) {
    const todoElement = target.parentElement;
    todoElement.classList.toggle("completed");
    updateTodoStatusInLocalStorage(todoElement);
  } else if (target.classList.contains("trash-btn")) {
    const todoElement = target.parentElement;
    todoElement.classList.add("fall");
    todoElement.addEventListener("transitionend", function () {
      todoElement.remove();
      deleteTodoFromLocalStorage(todoElement);
    });
  }
}

// Function to handle filter change
function handleFilterChange(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
        break;
      case "pending":
        todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

// Function to save todo to local storage
function saveTodoToLocalStorage(todoText) {
  let todos = getTodosFromLocalStorage();
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get todos from local storage
function getTodosFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// Function to update todo status in local storage
function updateTodoStatusInLocalStorage(todoElement) {
  const todos = getTodosFromLocalStorage();
  const todoText = todoElement.querySelector(".todo-item").innerText;
  const todoIndex = todos.indexOf(todoText);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1, todoElement.classList.contains("completed"));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Function to delete todo from local storage
function deleteTodoFromLocalStorage(todoElement) {
  const todos = getTodosFromLocalStorage();
  const todoText = todoElement.querySelector(".todo-item").innerText;
  const todoIndex = todos.indexOf(todoText);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
