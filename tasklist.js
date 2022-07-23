//Create a task
let addTask = document.querySelector("#add-form");
function createTask(e){

    let taskText = document.querySelector("#task-text");
    if (taskText.value === ""){
        alert("No task added");
    }
    let newTask = document.createElement("li");
    newTask.classList.add("task");
    let link = document.createElement("div");
    link.classList.add("ct-icons");
    link.innerHTML = ` <div><img class="cancel" src="images/close.svg"/></div>
    <div><img class="tick" src="images/tick.svg"/></div>`;

    newTask.appendChild(document.createTextNode(taskText.value));
    newTask.appendChild(link);
    document.querySelector("#task-container").appendChild(newTask);
    storeInLs(taskText.value);
    e.preventDefault();
    taskText.value = "";
}

// Add Tasks to the local storage
function storeInLs(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log(tasks)
}

addTask.addEventListener("submit", createTask);



let taskContainer = document.querySelector("#task-container")
let completedTaskContainer = document.querySelector("#completed-task-container")

// Complete or Delete Task
function compltdDelTask(e){
    if(e.target.classList.contains("cancel")){
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.parentElement.remove();
        removeFromLS( e.target.parentElement.parentElement.parentElement);
        }
    }
    if(e.target.classList.contains("tick")){
        alert("Well done mate. Keep smashing your goals.");
        completedTaskContainer.appendChild( e.target.parentElement.parentElement.parentElement);
        fixInLS(e.target.parentElement.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
}

// Remove deleted task from local storage
function removeFromLS(rmvTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task, index){
        if(rmvTask.textContent === task){
            tasks.splice(index, 1)
            // console.log("drink")
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fix Completed task in local storage
function fixInLS(cpltdTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(cpltdTask.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskContainer.addEventListener("click", compltdDelTask)


//Clear Tasks
let clearBtn = document.querySelector("#clear-btn")

function clearTask(){

    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }
    while(completedTaskContainer.firstChild){
        completedTaskContainer.removeChild(completedTaskContainer.firstChild);
    }

    localStorage.clear();
}

clearBtn.addEventListener("click", clearTask);


//Filter Task
let searchTab = document.querySelector("#search-bar");

function search(e){
    document.querySelectorAll(".task").forEach(function(list){
    if (list.firstChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1){
        list.style.display = "flex"
    }
    else{
        list.style.display = "none"
    }
    })
}

searchTab.addEventListener("keyup", search);




// Get task from local storage

getTask()

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } 
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        let newTask = document.createElement("li");
        newTask.classList.add("task");
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        link.innerHTML = ` <div><img class="cancel" src="images/close.svg"/></div>
        <div><img class="tick" src="images/tick.svg"/></div>`;

        newTask.appendChild(document.createTextNode(task));
        newTask.appendChild(link);
        document.querySelector("#task-container").appendChild(newTask);
    })
}
document.addEventListener('DOMcontentloaded', getTask);






// Get started
function moveToMainScreen(){
    const screenTwo = document.querySelector("#screen-two");
    const screenThree = document.querySelector("#screen-three");
    const wholeScreen = document.querySelector("#whole-screen");
    screenThree.style.marginLeft = "-100vw";
    

}

document.querySelector("#get-started").addEventListener("click", moveToMainScreen);

