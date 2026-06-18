const body = document.body;

const filterBtn = document.querySelector(".header-right #filter-todo-task-btn");
const addBtn = document.querySelector(".header-right #add-todo-task-btn");
const clearAllBtn = document.querySelector(".header-right #clear-all-todo-task-btn");
const changeThemeBtn = document.querySelector(".header-right #change-theme-btn");
const pipelineBtn = document.querySelector(".header-right #pipeline-demo-btn");
const propagationeBtn = document.querySelector(".header-right #event-propagation-btn");

const searchInput = document.querySelector("#search");

const addTaskBtn = document.querySelector("#task-add-btn");
const cancelTaskBtn = document.querySelector("#task-cancel-btn");

const modal = document.querySelector(".modal");
const form = document.querySelector(".modal-content");
const modalHeading = document.querySelector(".modal-content h2");

const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const taskStatus = document.querySelector("#task-status");
const taskCategory = document.querySelector("#task-category");

const todoTaskList = document.querySelector(".column1 .tasks");
const doingTaskList = document.querySelector(".column2 .tasks");
const doneTaskList = document.querySelector(".column3 .tasks");

const totalTodoTaskList = document.querySelector(".column1 .heading .head .total");
const totalDoingTaskList = document.querySelector(".column2 .heading .head .total");
const totalDoneTaskList = document.querySelector(".column3 .heading .head .total");

const filterDialog = document.querySelector(".filter-dialog");
const filterForm = document.querySelector(".filter-content");
const filterTaskCategory = document.querySelector("#filter-task-category");
const filterModelCloseBtn = document.querySelector("#filter-modal-close-btn");


const pipelineDialog = document.querySelector(".pipeline-modal");
const pipelineContent = document.querySelector(".pipeline-modal-content");
const pipelineModelCloseBtn = document.querySelector("#pipeline-modal-close-btn");

const pipelineStep = document.querySelector(".pipeline");
const pipelineStepHeading = document.querySelector(".explanation h3");
const pipelineStepDesc = document.querySelector(".explanation p");

const propagationDialog = document.querySelector(".propagation-dialog");
const propagationContent = document.querySelector(".propagation-content");
const propagationModelCloseBtn = document.querySelector("#propagation-modal-close-btn");


const propagationDemo = document.querySelector(".propagation-dialog .propagation-content .demo");
const bubblingBtn = document.querySelector("#bubbling-btn");
const capturingBtn = document.querySelector("#capturing-btn");

const grandParent = document.querySelector(".grand-parent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

const renderPipelineArr = [
    {
        id: "step-html",
        title: "HTML",
        description: "The browser reads the HTML file, which contains the content and structure of the webpage."
    },
    {
        id: "step-tokenization",
        title: "Tokenization",
        description: "The browser breaks the HTML code into small pieces called tokens so it can understand each part."
    },
    {
        id: "step-parsing",
        title: "Parsing",
        description: "The browser analyzes the tokens and figures out how the elements are related to each other."
    },
    {
        id: "step-domtree",
        title: "DOM Tree",
        description: "A tree-like structure is created that represents all HTML elements on the page."
    },
    {
        id: "step-css",
        title: "CSS",
        description: "The browser reads the CSS file, which contains the styling rules for the webpage."
    },
    {
        id: "step-cssom",
        title: "CSSOM Tree",
        description: "The browser converts CSS rules into a tree structure that it can easily understand and apply."
    },
    {
        id: "step-dom-cssom",
        title: "DOM + CSSOM",
        description: "The browser combines the page structure (DOM) and styles (CSSOM) together."
    },
    {
        id: "step-render-tree",
        title: "Render Tree",
        description: "A render tree is created containing only the visible elements and their styles."
    },
    {
        id: "step-layout",
        title: "Layout",
        description: "The browser calculates the size and position of every visible element on the page."
    },
    {
        id: "step-paint",
        title: "Paint",
        description: "The browser draws text, colors, borders, and images onto the screen."
    },
    {
        id: "step-web-page",
        title: "Final Web Page",
        description: "The fully rendered webpage is displayed and ready for the user to interact with."
    }
];

let dragCardId = null;
let cardId = null;

let tasks = [];

//Event propagation used here too.
pipelineStep.addEventListener("click", (e) => {
    console.log("e-target", e.target);
    step = renderPipelineArr.find((item) => {
        console.log("id", e.target.dataset.id);
        return item.id === e.target.dataset.id;
    });
    console.log(step);
    if (!step) {
        pipelineStepHeading.textContent = "Simple Explanation";
        pipelineStepDesc.textContent = "When you open a website, the browser first reads HTML and CSS, then builds structure and styles, and finally shows the page on screen.";
    } else {
        pipelineStepHeading.textContent = step.title;
        pipelineStepDesc.textContent = step.description;
    }
});

propagationeBtn.addEventListener("click", () => {
    propagationDialog.classList.add("show");
});

let grandParentHandler;
let parentHandler;
let childHandler;

function setupPropagation(capturing) {
    let propFlow =document.querySelector(".prop-flow");
    propFlow.innerHTML="";
    console.log("listener", capturing);
    if (grandParentHandler) {
        console.log("listener removed");
        grandParent.removeEventListener("click", grandParentHandler, capturing);
        parent.removeEventListener("click", parentHandler, capturing);
        child.removeEventListener("click", childHandler, capturing);

        grandParent.removeEventListener("click", grandParentHandler, !capturing);
        parent.removeEventListener("click", parentHandler, !capturing);
        child.removeEventListener("click", childHandler, !capturing);
    }

    grandParentHandler = function () {
        console.log("grand parent");
        propFlow.innerHTML+="-->Grand Parent";
    };
    
    parentHandler = function () {
        console.log("parent");
        propFlow.innerHTML+="-->Parent";
    };
    
    childHandler = function () {
        console.log("child");
        propFlow.innerHTML+="-->Child";
    };

    grandParent.addEventListener("click", grandParentHandler, capturing);
    parent.addEventListener("click", parentHandler, capturing);
    child.addEventListener("click", childHandler, capturing);
}


bubblingBtn.addEventListener("click", () => {
    console.log("bubbling", "clicked");
    setupPropagation(false);
    child.click();
});
capturingBtn.addEventListener("click", () => {
    console.log("capturing", "clicked");
    setupPropagation(true);
    child.click();
});


pipelineBtn.addEventListener("click", () => {
    pipelineDialog.classList.add("show");
});

pipelineModelCloseBtn.addEventListener("click", () => {
    pipelineDialog.classList.remove("show");
});
filterModelCloseBtn.addEventListener("click", () => {
    filterDialog.classList.remove("show");
})

propagationModelCloseBtn.addEventListener("click", () => {
    propagationDialog.classList.remove("show");
})



addBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

filterBtn.addEventListener("click", () => {
    filterDialog.classList.add("show");
});

clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure, you want to clear all the tasks? This action can not be undone!")) {
        tasks = [];
        saveTasks();
        showTasks();
    }
});

changeThemeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (!document.body.hasAttribute("data-theme")) {
        document.body.dataset.theme = "dark";
    } else {
        document.body.removeAttribute("data-theme");
    }
});

searchInput.addEventListener("input", (e) => {
    performSearch();
});

function performSearch() {
    console.log("using .value", searchInput.value)
    console.log("using getAttribute", searchInput.getAttribute("value"));

    /**
     * Difference between using .value or getAttribute() 
     * getAttribute = gives Original HTML value not the live one - so here in search default value was null, so it will always return null
     * value property = It gives current live value 
     */

    const searchString = searchInput.value.trim();
    if (searchString === "") {
        showTasks(null);
        return;
    }
    filteredTasks = tasks.filter((task) => { return (task.title).toLowerCase().includes(searchInput.value.toLowerCase()) || (task.description).toLowerCase().includes(searchInput.value.toLowerCase()) });
    showTasks(filteredTasks);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const status = taskStatus.value.trim();
    const category = taskCategory.value.trim();

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
            task.category = category; //can be one of these - office, personal, learning, other
            task.status = status; //can be one of these - todo, doing, done
            task.tag = (status == "todo" ? "pending" : (status == "doing") ? "In Progress" : "Completed"); //can be one of these - pending, in progress, completed

            saveTasks();
            showTasks();
            taskTitle.value = "";
            taskDescription.value = "";
            taskStatus.value = "todo";
            taskCategory.value = "office";
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
        "category": category, //can be one of these - office, personal, learning, other
        "tag": (status == "todo" ? "pending" : (status == "doing") ? "In Progress" : "Completed"), //can be one of these - pending, in progress, completed
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
    taskCategory.value = "office";
    cardId = null;
    addTaskBtn.textContent = "Add Task";
    modalHeading.textContent = "Add Task";
});

function showTasks(list = null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    let tasklist = null;
    if (list === null) {
        tasklist = tasks;
        if (!tasklist) {
            return;
        }
    } else {
        tasklist = list;
    }

    todoTaskList.innerHTML = "";
    doingTaskList.innerHTML = "";
    doneTaskList.innerHTML = "";

    todoTasks = 0;
    doingTasks = 0;
    doneTasks = 0;

    tasklist.forEach((task, idx) => {
        createCard(task, idx);
    });

    totalTodoTaskList.textContent = `Pending ${todoTasks > 1 ? "Tasks" : "Task"} : ${todoTasks}`;
    totalDoingTaskList.textContent = `In Progress ${doingTasks > 1 ? "Tasks" : "Task"} : ${doingTasks}`;
    totalDoneTaskList.textContent = `Completed ${doneTasks > 1 ? "Tasks" : "Task"} : ${doneTasks}`;
    modal.classList.remove("show");
}

function createCard(task, idx) {
    let div = document.createElement("div");
    div.setAttribute("class", `card card${idx + 1}`);

    div.dataset.tid = task.tid;
    div.dataset.status = task.status;
    div.dataset.category = task.category;

    div.setAttribute("draggable", true);

    let cardHead = document.createElement("div");
    cardHead.setAttribute("class", "card-head");

    let tagsDiv = document.createElement("div");
    tagsDiv.setAttribute("class", "tags-div");

    let span = document.createElement("span");
    span.setAttribute("class", "tag");
    span.textContent = task.tag;

    let categorySpan = document.createElement("span");
    categorySpan.setAttribute("class", "tag category");
    categorySpan.textContent = task.category;

    let cardActions = document.createElement("div");
    cardActions.setAttribute("class", "card-actions");

    let completeIcon = document.createElement("i");
    completeIcon.setAttribute("class", "ri-check-double-line");
    completeIcon.classList.add("complete-btn");

    let editIcon = document.createElement("i");
    editIcon.setAttribute("class", "ri-edit-box-line");
    editIcon.classList.add("edit-btn");

    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "ri-delete-bin-6-line");
    deleteIcon.classList.add("delete-btn");

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "title");
    h3.textContent = task.title;

    let taskMetaDiv = document.createElement("div");
    taskMetaDiv.setAttribute("class", "task-meta");

    let taskIdInfo = document.createElement("h5");
    taskIdInfo.textContent = task.tid;

    let taskCreationInfo = document.createElement("h5");
    taskCreationInfo.textContent = formatDate(new Date(task.createdAt));

    let p = document.createElement("p");
    p.setAttribute("class", "description");
    p.textContent = task.description

    if (task.status == "todo") {
        todoTaskList.append(div);
        todoTasks += 1;
    }
    if (task.status == "doing") {
        doingTaskList.append(div);
        doingTasks += 1;
    }
    if (task.status == "done") {
        doneTaskList.append(div);
        doneTasks += 1;
    }

    div.append(cardHead, h3, taskMetaDiv, p);
    cardHead.append(tagsDiv, cardActions);
    tagsDiv.append(span, categorySpan);

    if (task.status != "done") {
        cardActions.append(completeIcon, editIcon, deleteIcon);
    } else {
        cardActions.append(editIcon, deleteIcon);
    }

    taskMetaDiv.append(taskIdInfo, taskCreationInfo);

}

//Call card action buttons using event delegation
todoTaskList.addEventListener("click", handleCardActions);
doingTaskList.addEventListener("click", handleCardActions);
doneTaskList.addEventListener("click", handleCardActions);

todoTaskList.addEventListener("dragstart", handleDragStart);
doingTaskList.addEventListener("dragstart", handleDragStart);
doneTaskList.addEventListener("dragstart", handleDragStart);


function handleDragStart(e) {
    const card = e.target.closest(".card");
    if (!card) return;

    dragCardId = card.dataset.tid;
    console.log("Dragging:", dragCardId);
}

function handleCardActions(e) {
    const target = e.target;
    const card = target.closest(".card");
    if (!card) return;

    const tid = card.dataset.tid;
    const task = tasks.find(t => t.tid === tid);
    if (!task) return;

    if (target.classList.contains("delete-btn")) {
        if (confirm("Are you sure, you want to delete this task?")) {
            tasks = tasks.filter(t => t.tid !== tid);
            saveTasks();
            showTasks();
        }
    }

    if (target.classList.contains("edit-btn")) {
        modal.classList.add("show");
        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskStatus.value = task.status;
        taskCategory.value = task.category;
        cardId = task.tid;
        addTaskBtn.textContent = "Update Task";
        modalHeading.textContent = "Update Task";
    }

    if (target.classList.contains("complete-btn")) {
        if (confirm("Are you sure, you want to mark this task as completed?")) {
            task.status = "done";
            task.tag = "Completed";
            saveTasks();
            showTasks();
        }
    }
}


function formatDate(date) {
    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    })
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
            task.tag = (newStatus == "todo" ? "pending" : (newStatus == "doing") ? "In Progress" : "Completed");
            saveTasks();
            showTasks();
        }
    })
}

setupDropZone(todoTaskList, "todo");
setupDropZone(doingTaskList, "doing");
setupDropZone(doneTaskList, "done");


filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    filterByCategory();
});


function filterByCategory() {
    const category = filterTaskCategory.value.trim();
    if (category === "") {
        showTasks(null);
        filterDialog.classList.remove("show");
        return;
    }
    filteredTasks = tasks.filter((task) => { return (task.category).toLowerCase().includes(category.toLowerCase()) });
    showTasks(filteredTasks);
    filterDialog.classList.remove("show");
}