const todoDelete = async (id) => {
    console.log("click");
    const response = await fetch(`/todos/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        window.location.reload();
    }
};

const form = document.getElementById("form");
const id = document.getElementById("id");
const task = document.getElementById("task");
const completed = document.getElementById("completed");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const editTodo = {
            id: id.value,
            task: task.value,
            completed: completed.value,
        };

        const response = await fetch(`/todos/${editTodo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editTodo),
        });

        if (response.ok) {
            window.location.href = "/todos";
        }
    });
}
