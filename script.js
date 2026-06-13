modal = document.querySelector(".modal");
addBtn = document.querySelector(".header-right button");

addTaskBtn = document.querySelector("#task-add-btn");
cancelTaskBtn = document.querySelector("#task-cancel-btn");

taskTitle = document.querySelector("#task-title");
taskDescription = document.querySelector("#task-description");
taskStatus = document.querySelector("#task-status");

todoTaskList = document.querySelector(".column1 .tasks");
doingTaskList = document.querySelector(".column2 .tasks");
doneTaskList = document.querySelector(".column3 .tasks");

let tasks = [];

addBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const status = taskStatus.value.trim();
    task = {
        "tid": "tid-" + Math.floor(Math.random() * 10000000000),
        "title": title,
        "description": description,
        "status": status, //can be one of these - todo, doing, done
        "tag": (status == "todo" ? "new" : (status == "doing") ? "In Progress" : "Completed"), //can be one of these - new, in progress, completed
        "createdAt": Date.now()
    }
    tasks.push(task);
    taskTitle.value = "";
    taskDescription.value = "";

    let div = document.createElement("div");
    div.setAttribute("class", `card card${tasks.length + 1}`);
    div.setAttribute("data-tid", `${task.tid}`);

    let span = document.createElement("span");
    span.setAttribute("class", "tag");
    span.textContent = task.tag;

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
    div.append(span, h3, p);

    saveTasks();
    modal.classList.remove("show");

});

cancelTaskBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

function showTasks() {
    const tasklist = JSON.parse(localStorage.getItem("tasks"));
    if (!tasklist) {
        return;
    }

    tasklist.forEach((task, idx) => {
        let div = document.createElement("div");
        div.setAttribute("class", `card card${idx + 1}`);
        div.setAttribute("data-tid", `${task.tid}`);

        let span = document.createElement("span");
        span.setAttribute("class", "tag");
        span.textContent = "New";

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
        } div.append(span, h3, p);
    });
    modal.classList.remove("show");
}

showTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

