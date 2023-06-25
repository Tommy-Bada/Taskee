//Create a task
let addTask = document.querySelector("#add-form");
function createTask(e){
    let taskText = document.querySelector("#task-text");
    let taskDate = document.querySelector("#task-date");
    let taskTime = document.querySelector("#task-time");

    if (taskText.value === ""){
        alert("No task added");
    }else{
    let newTask = document.createElement("li");
    newTask.classList.add("task");
    let details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = `<div class="task-text">${taskText.value}</div>
    <div class="task-date"><b>Due-date:</b> ${taskDate.value}</div>
    <div class="task-time"><b>Due-time:</b> ${taskTime.value}</div>`;
    let link = document.createElement("div");
    link.classList.add("ct-icons");
    link.innerHTML = `
    <div><button class="start">Start</button></div>
    <div><button class="tick">Complete</button></div>
    <div><button class="edit">Edit</button></div>
    <div><button class="cancel">Delete</button></div>`
    newTask.appendChild(details);
    newTask.appendChild(link);
    document.querySelector("#task-container").appendChild(newTask);
    let taskToLS = [taskText.value, taskDate.value, taskTime.value]
    storeInLs(taskToLS);
    }

    e.preventDefault();

    taskText.value = "";
    taskDate.value = "";
    taskTime.value = "";
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




// Start , Complete, Edit, or Delete Task
let taskContainer = document.querySelector("#task-container")
let completedTaskContainer = document.querySelector("#completed-task-container")
let inProgressTaskContainer = document.querySelector("#in-progress-task-container")

function actionOnTask(e){
    
    //Start Task
    if(e.target.classList.contains("start")){
        alert("Good luck mate. You got this.");
        removeFromPendingLS(e.target.parentElement.parentElement.parentElement);

        let taskToProgressLS = [e.target.parentElement.parentElement.parentElement.firstChild.firstChild.textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[1].textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[2].textContent]

        let iTask = document.createElement("li")
        iTask.classList.add("task-in-progress")
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${taskToProgressLS[0]}</div>
        <div class="task-date"><b>Due-date:</b> ${taskToProgressLS[1]}</div>
        <div class="task-time"><b>Due-time:</b> ${taskToProgressLS[2]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        link.innerHTML = `
        <div><button class="tick-from-progress">Complete</button></div>`
        iTask.appendChild(details);
        iTask.appendChild(link);
        inProgressTaskContainer.appendChild(iTask);

        addToProgressLS(taskToProgressLS);
        e.target.parentElement.parentElement.parentElement.remove();
    }

     //Complete Task
     if(e.target.classList.contains("tick")){
        alert("Well done mate. Keep smashing your goals.");
        removeFromPendingLS(e.target.parentElement.parentElement.parentElement);

        let taskToCompletedLS = [e.target.parentElement.parentElement.parentElement.firstChild.firstChild.textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[1].textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[2].textContent]
        
        let cTask = document.createElement("li")
        cTask.classList.add("task-complete")
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${taskToCompletedLS[0]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        cTask.appendChild(details);
        cTask.appendChild(link);
        completedTaskContainer.appendChild(cTask);

        addtoCompletedLS(taskToCompletedLS);
        e.target.parentElement.parentElement.parentElement.remove();
    }

    //Edit Task
    let updateTask = document.querySelector("#edit-form")
    if(e.target.classList.contains("edit")){
        removeFromPendingLS(e.target.parentElement.parentElement.parentElement);
        let taskToCompletedLS = [e.target.parentElement.parentElement.parentElement.firstChild.firstChild.textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[1].textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[2].textContent]
        let editText = document.querySelector("#edit-text");
        let editDate = document.querySelector("#edit-date");
        let editTime = document.querySelector("#edit-time");

        editText.value = taskToCompletedLS[0]
        editDate.value = taskToCompletedLS[1]
        editTime.value = taskToCompletedLS[2]
        e.target.parentElement.parentElement.parentElement.remove();
        updateTask.style.display = "block"
        addTask.style.display = "none"
    }

    //Update Edited Task
    function updateEditedTask(e){
        let editText = document.querySelector("#edit-text");
        let editDate = document.querySelector("#edit-date");
        let editTime = document.querySelector("#edit-time");

        if (editText.value === ""){
            alert("No task added");
        }else{
        let newTask = document.createElement("li");
        newTask.classList.add("task");
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${editText.value}</div>
        <div class="task-date">${editDate.value}</div>
        <div class="task-time">${editTime.value}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        link.innerHTML = `
        <div><button class="start">Start</button></div>
        <div><button class="tick">Complete</button></div>
        <div><button class="edit">Edit</button></div>
        <div><button class="cancel">Delete</button></div>`
        newTask.appendChild(details);
        newTask.appendChild(link);
        document.querySelector("#task-container").appendChild(newTask);
        let taskToEditInLS = [editText.value, editDate.value, editTime.value]
        storeInLs(taskToEditInLS);
        }
        e.preventDefault();
        updateTask.style.display = "none"
        addTask.style.display = "block"
    }

   updateTask.addEventListener("submit", updateEditedTask);

    //Delete Task
    if(e.target.classList.contains("cancel")){
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.parentElement.remove();
        removeFromPendingLS( e.target.parentElement.parentElement.parentElement);
        }
    }

}

taskContainer.addEventListener("click", actionOnTask)


//Local Storage Handlers 

// Remove task from Pending Task in Local Storage
function removeFromPendingLS(pendingTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(pendingTask.firstChild.firstChild.textContent === task[0]){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to In Progress Local Storage
function addToProgressLS(inProgressTask){
    let inProgressTasks ;
    if(localStorage.getItem('inProgressTasks') === null){
        inProgressTasks = [];
    } 
    else{
        inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks'));
    };
    
    inProgressTasks.push(inProgressTask);
    localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
}

// Add to completed local storage
function addtoCompletedLS(completedTask){
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

// Edit task from local storage
function editInLS(updateTask){
    let tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.forEach(function(task, index){
            console.log(updateTask, task)
            if(updateTask[0]=== task[0]){
                // tasks.splice(index, 1, updateTask);
            }
        })
    
}






// In Progress Task Handlers
//Complete Task From Progress list
function completeFromProgress(e){
    if(e.target.classList.contains("tick-from-progress")){
        alert("Well done mate. Keep smashing your goals.");
        console.log(e.target.parentElement.parentElement.parentElement)
        removeFromProgressLS(e.target.parentElement.parentElement.parentElement);

        let taskToCompletedLS = [e.target.parentElement.parentElement.parentElement.firstChild.firstChild.textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[1].textContent, 
            e.target.parentElement.parentElement.parentElement.firstChild.children[2].textContent]
        console.log(taskToCompletedLS)
        let cTask = document.createElement("li")
        cTask.classList.add("task-complete")
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${taskToCompletedLS[0]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        cTask.appendChild(details);
        cTask.appendChild(link);
        completedTaskContainer.appendChild(cTask);

        addtoCompletedLS(taskToCompletedLS);
        e.target.parentElement.parentElement.parentElement.remove();
        }
    }

    // Remove task from In Progress Category  in Local Storage
    function removeFromProgressLS(progressTask){
        let inProgressTasks;
        if(localStorage.getItem('inProgressTasks') === null){
            inProgressTasks = [];
        } else{
            inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks'));
        }
        inProgressTasks.forEach(function(task, index){
            if(progressTask.firstChild.firstChild.textContent === task[0]){
                inProgressTasks.splice(index, 1)
            }
        });

        localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
    }

inProgressTaskContainer.addEventListener("click", completeFromProgress)




//Other Functionalities
//Clear Tasks
let clearBtn = document.querySelector("#clear-btn")

function clearTask(){

    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }
    while(completedTaskContainer.firstChild){
        completedTaskContainer.removeChild(completedTaskContainer.firstChild);
    }
    while(inProgressTaskContainer.firstChild){
        inProgressTaskContainer.removeChild(inProgressTaskContainer.firstChild);
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


    document.querySelectorAll(".task-in-progress").forEach(function(list){
        if (list.firstChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1){
            list.style.display = "block"
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



//On load functionalities
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
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${task[0]}</div>
        <div class="task-date"><b>Due-date:</b> ${task[1]}</div>
        <div class="task-time"><b>Due-time:</b> ${task[2]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        link.innerHTML = `
        <div><button class="start">Start</button></div>
        <div><button class="tick">Complete</button></div>
        <div><button class="edit">Edit</button></div>
        <div><button class="cancel">Delete</button></div>`
        

        newTask.appendChild(details);
        newTask.appendChild(link);
        taskContainer.appendChild(newTask);
    })
}
document.addEventListener('DOMcontentloaded', getTask);


// Get In Progress task from Local storage
getInProgressTask()

function getInProgressTask(){
    let inProgressTasks;
    if(localStorage.getItem('inProgressTasks') === null){
        inProgressTasks = [];
    } else{
        inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks'));
    }

    inProgressTasks.forEach(function(inProgressTask){
        let iTask = document.createElement("li")
        iTask.classList.add("task-in-progress")
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${inProgressTask[0]}</div>
        <div class="task-date"><b>Due-date:</b> ${inProgressTask[1]}</div>
        <div class="task-time"><b>Due-time:</b> ${inProgressTask[2]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        link.innerHTML = `
        <div><button class="tick-from-progress">Complete</button></div>`
        iTask.appendChild(details);
        iTask.appendChild(link);
        inProgressTaskContainer.appendChild(iTask);
    })
}
document.addEventListener('DOMcontentloaded', getInProgressTask);

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
        let details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `<div class="task-text">${completedTask[0]}</div>`;
        let link = document.createElement("div");
        link.classList.add("ct-icons");
        cTask.appendChild(details);
        cTask.appendChild(link);
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
