//Selecting Elements
let form = document.querySelector("#form");
let taskInput = document.querySelector("#taskInput");
let filterTaskInput = document.querySelector("#filterTask");
let taskList = document.querySelector("#taskList");
let clearTask = document.querySelector("#clearTask");

//Adding Event Listeners
form.addEventListener("submit", addTask);
filterTaskInput.addEventListener("keyup", filterTask);
taskList.addEventListener("click", removeTask);
clearTask.addEventListener("click", removeTaskAll);
document.addEventListener("DOMContentLoaded", fixStorage)

//Defining Functions
function addTask(e) {
    if (taskInput.value == '') {
        alert("Add a task");
    } else {
        let list = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        anchor.innerHTML = 'x';
        list.appendChild(document.createTextNode(taskInput.value + ' '));
        list.appendChild(anchor);
        taskList.appendChild(list);

        //LocalStore Start
        storeTask(taskInput.value);
        //LocalStore End

        taskInput.value = '';
    }
    e.preventDefault();
}

//Remove Task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.remove();

            removefromLocalStore(e.target.parentElement);
        }
    }
}

//Clear Task Button
function removeTaskAll() {
    taskList.innerHTML = '';

    //Local Store
    localStorage.clear();
}

//Filter Task
function filterTask(e) {
    let filterValue = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(task => {
        let filterInputText = task.firstChild.textContent;
        if (filterInputText.toLowerCase().indexOf(filterValue) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

//Local Store
function storeTask(inputValue) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(inputValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function fixStorage() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(value => {
        let list = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        anchor.innerHTML = 'x';
        list.appendChild(document.createTextNode(value + ' '));
        list.appendChild(anchor);
        taskList.appendChild(list);
    })
}

//Remove From Local Store
function removefromLocalStore(li) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    li.removeChild(li.lastChild); //anchor Tag
    tasks.forEach((value, index) => {
        if (li.textContent.trim() === value) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}