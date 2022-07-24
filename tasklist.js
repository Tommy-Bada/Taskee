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
        fixFromLS(e.target.parentElement.parentElement.parentElement);
        fixInLS(e.target.parentElement.parentElement.parentElement.firstChild.textContent);
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
        if(task === rmvTask.firstChild.textContent){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fix Completed task in local storage
// Remove completed task from Local Storage
function fixFromLS(cpltdTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(cpltdTask.firstChild.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Add to another local storage
function fixInLS(completedTask){
    let completedTasks ;
    if(localStorage.getItem('completedTasks') === null){
        completedTasks = [];
    } 
    else{
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    };
    
    completedTasks.push(completedTask);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
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


    document.querySelectorAll(".task-complete").forEach(function(list){
        if (list.firstChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1){
            list.style.display = "block"
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


//Get completed task from Local storage
getCompletedTask()

function getCompletedTask(){
    let completedTasks;
    if(localStorage.getItem('completedTasks') === null){
        completedTasks = [];
    } else{
        completedTasks = JSON.parse(localStorage.getItem('completedTasks'));
    }

    completedTasks.forEach(function(completedTask){
        let cTask = document.createElement("li")
        cTask.classList.add("task-complete")
        cTask.appendChild(document.createTextNode(completedTask));
        completedTaskContainer.appendChild(cTask);
    })
}

document.addEventListener('DOMcontentloaded', getCompletedTask);




// Get started
function moveToMainScreen(){
    const screenTwo = document.querySelector("#screen-two");
    const screenThree = document.querySelector("#screen-three");
    const wholeScreen = document.querySelector("#whole-screen");
    screenTwo.style.opacity = 0;
    screenTwo.style.zIndex = 0;
    screenThree.style.marginLeft = "-100vw";
    screenThree.style.zIndex = 1;
    

}

document.querySelector("#get-started").addEventListener("click", moveToMainScreen);

