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
    todoDiv.textContent = input.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        todoDiv.remove()
    })


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
    
    document.addEventListener("DOMContentLoaded", function () {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            todoList.innerHTML = savedTodos;
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    saveTodo();
                });
            });
        }
    });
