modal = document.querySelector(".modal");
form = document.querySelector(".modal-content");
addBtn = document.querySelector(".header-right button");

addTaskBtn = document.querySelector("#task-add-btn");
cancelTaskBtn = document.querySelector("#task-cancel-btn");

modalHeading = document.querySelector(".modal-content h2");

taskTitle = document.querySelector("#task-title");
taskDescription = document.querySelector("#task-description");
taskStatus = document.querySelector("#task-status");

todoTaskList = document.querySelector(".column1 .tasks");
doingTaskList = document.querySelector(".column2 .tasks");
doneTaskList = document.querySelector(".column3 .tasks");

let dragCardId = null;
let cardId = null;

let tasks = [];

addBtn.addEventListener("click", () => {
    modal.classList.add("show");
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const status = taskStatus.value.trim();

    if (title === "" || description === "") {
        e.preventDefault();
        alert("Both fields are mandatory");
        return;
    }
    if (cardId) {
        const task = tasks.find((t) => { return t.tid === cardId });
        if (task) {
            task.title = title;
            task.description = description;
            task.status = status; //can be one of these - todo, doing, done
            task.tag = (status == "todo" ? "new" : (status == "doing") ? "In Progress" : "Completed"); //can be one of these - new, in progress, completed

            saveTasks();
            showTasks();
            taskTitle.value = "";
            taskDescription.value = "";
            taskStatus.value = "todo";
            cardId = null;
            addTaskBtn.textContent = "Add Task";
            modalHeading.textContent = "Add Task";

        } else {
            alert("Task not found");
        }
        return;
    }
    const task = {
        "tid": "tid-" + Math.floor(Math.random() * 10000000000),
        "title": title,
        "description": description,
        "status": status, //can be one of these - todo, doing, done
        "tag": (status == "todo" ? "new" : (status == "doing") ? "In Progress" : "Completed"), //can be one of these - new, in progress, completed
        "createdAt": Date.now()
    }
    tasks.push(task);

    saveTasks();
    showTasks();

    modal.classList.remove("show");

});

cancelTaskBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    taskTitle.value = "";
    taskDescription.value = "";
    taskStatus.value = "todo";
    cardId = null;
    addTaskBtn.textContent = "Add Task";
    modalHeading.textContent = "Add Task";
});

function showTasks() {
    const tasklist = JSON.parse(localStorage.getItem("tasks"));
    if (!tasklist) {
        return;
    }

    tasks = tasklist;
    todoTaskList.innerHTML = "";
    doingTaskList.innerHTML = "";
    doneTaskList.innerHTML = "";

    tasklist.forEach((task, idx) => {
        let div = document.createElement("div");
        div.setAttribute("class", `card card${idx + 1}`);
        div.setAttribute("data-tid", `${task.tid}`);
        div.setAttribute("draggable", true);

        let cardHead = document.createElement("div");
        cardHead.setAttribute("class", "card-head");

        let span = document.createElement("span");
        span.setAttribute("class", "tag");
        span.textContent = task.tag;

        let cardActions = document.createElement("div");
        cardActions.setAttribute("class", "card-actions");

        let editIcon = document.createElement("i");
        editIcon.setAttribute("class", "ri-edit-box-line");

        let deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "ri-delete-bin-6-line");

        let h3 = document.createElement("h3");
        h3.setAttribute("class", "title");
        h3.textContent = task.title;

        let p = document.createElement("p");
        p.setAttribute("class", "description");
        p.textContent = task.description

        if (task.status == "todo") {
            todoTaskList.append(div);
        }
        if (task.status == "doing") {
            doingTaskList.append(div);
        }
        if (task.status == "done") {
            doneTaskList.append(div);
        }

        div.append(cardHead, h3, p);
        cardHead.append(span, cardActions);
        cardActions.append(editIcon, deleteIcon);

        div.addEventListener("dragstart", (e) => {
            dragCardId = div.dataset.tid;
            console.log("Dragging:", dragCardId);
        });

        editIcon.addEventListener("click", () => {
            modal.classList.add("show");
            taskTitle.value = task.title;
            taskDescription.value = task.description;
            taskStatus.value = task.status;
            cardId = task.tid;
            addTaskBtn.textContent = "Update Task";
            modalHeading.textContent = "Update Task";
            console.log(cardId, task.title);

        });

        deleteIcon.addEventListener("click", () => {
            if (confirm("Are you sure, you want to delete this task?")) {
                tasks = tasks.filter((t) => { return t.tid != task.tid });
                saveTasks();
                showTasks();
            }
        })

    });

    modal.classList.remove("show");
}


showTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();
}

function setupDropZone(container, newStatus) {

    container.addEventListener("dragover", (e) => {
        console.log("dragover");
        e.preventDefault();
    })

    container.addEventListener("drop", () => {
        console.log("Dropped");
        const task = tasks.find((t) => { return t.tid === dragCardId });
        if (task) {
            task.status = newStatus;
            task.tag = (newStatus == "todo" ? "new" : (newStatus == "doing") ? "In Progress" : "Completed");
            saveTasks();
            showTasks();
        }
    })
}

setupDropZone(todoTaskList, "todo");
setupDropZone(doingTaskList, "doing");
setupDropZone(doneTaskList, "done");

