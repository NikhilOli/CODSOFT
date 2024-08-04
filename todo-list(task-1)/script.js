const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const btn = document.getElementById("add-btn");

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        makeTodo();
        input.value = "";
    }
    });

    const makeTodo = () => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    
    const todoText = document.createElement("span");
        todoText.className = "todo-text";
        todoText.textContent = input.value;

    const editBtn = document.createElement("i");
    editBtn.className = "edit-btn fa-regular fa-pen-to-square";
    editBtn.addEventListener("click", () => editTodo(todoText, editBtn));

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "delete-btn fa-solid fa-trash";
    deleteBtn.addEventListener("click", () => {
        todoDiv.remove()
    })

    todoDiv.appendChild(todoText)
    todoDiv.appendChild(editBtn)
    todoDiv.appendChild(deleteBtn)
    todoList.appendChild(todoDiv);
    saveTodo();
    };
    btn.addEventListener("click", (e) => {
    e.preventDefault();
    makeTodo();
    input.value = "";
    });

    const saveTodo = () => {
    localStorage.setItem("todos", todoList.innerHTML);
    };

    const editTodo = (todoText, editBtn) => {
        const newText = prompt("Edit your task", todoText.textContent);
        if (newText && newText.trim() !== "") {
            todoText.textContent = newText;
            saveTodo();
        }
    };

    document.getElementById('todo-list').style.scrollBehavior = 'smooth';
    document.addEventListener("DOMContentLoaded", function () {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            todoList.innerHTML = savedTodos;
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const todoText = e.target.previousElementSibling;
                    editTodo(todoText, btn);
                });
            });
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentElement.remove();
                    saveTodo();
                });
            });
        }
    });
