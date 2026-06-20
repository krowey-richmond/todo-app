const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodosFromLocalStorage();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length === 0) {
    alert("Please enter a todo item.");
    return;
  }

  const todoObject = {
    text: todoText,
    completed: false,
  };

  allTodos.push(todoObject);
  alert("Todo added successfully!");
  saveTodosToLocalStorage();
  updateTodoList();

  todoInput.value = "";
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, index) => {
    todoItem = createTodoItem(todo, index);
    todoListUL.appendChild(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoLI = document.createElement("li");
  const todoId = `todo-${todoIndex}`;
  todoLI.className = "todo";
  todoLI.innerHTML = `
   <input type="checkbox" id="${todoId}" />
          <label class="custom-checkbox" for="${todoId}"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="transparent"
            >
              <path
                d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
              /></svg
          ></label>
          <label for="${todoId}" class="todo-text">
            ${todo.text}
          </label>
          <button class="delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--secondary-color)"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v52₀-52₀Z"
              />
            </svg>
          </button>
`;

  const deleteBtn = todoLI.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    deleteTodo(todoIndex);
  });

  const checkbox = todoLI.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", function () {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodosToLocalStorage();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodo(todoIndex) {
  allTodos.splice(todoIndex, 1);
  alert("Todo deleted successfully!");
  saveTodosToLocalStorage();
  updateTodoList();
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

updateTodoList();
