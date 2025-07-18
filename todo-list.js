document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input");
    const list = document.getElementById("list");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((item) => {addtodo(item.text, item.completed)});
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
            addtodo(input.value.trim());
            input.value = "";
        }
    });

    function addtodo(text, completed=false) {
        const li = document.createElement("li");
        li.textContent = text;
        if (completed) {
            li.classList.add("completed");
        }
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            savetodo();
        });
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            li.remove();
            savetodo();
        });
        list.appendChild(li);
        savetodo();
    }

    function savetodo() {
        const todos = [];
        list.querySelectorAll("li").forEach((item) => {
            todos.push({
                text: item.textContent,
                completed: item.classList.contains("completed")
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});