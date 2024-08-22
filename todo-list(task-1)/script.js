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
        todoDiv.remove();
        saveTodo();
    });

    todoDiv.appendChild(todoText);
    todoDiv.appendChild(editBtn);
    todoDiv.appendChild(deleteBtn);
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
    if (editBtn.classList.contains("fa-pen-to-square")) {
        // Create an input field
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = todoText.textContent;
        inputField.className = "edit-input";

        // Replace the todoText with inputField
        todoText.replaceWith(inputField);
        
        // Change icon to save
        editBtn.className = "edit-btn fa-solid fa-save";
        
        // Change the click event to save the new text
        editBtn.removeEventListener("click", () => editTodo(todoText, editBtn));
        editBtn.addEventListener("click", () => {
            if (inputField.value.trim() !== "") {
                todoText.textContent = inputField.value;
                inputField.replaceWith(todoText);
                editBtn.className = "edit-btn fa-regular fa-pen-to-square";
                saveTodo();
            }
        });
    }
};

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
