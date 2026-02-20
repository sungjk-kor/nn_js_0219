// 
let taskInput = document.getElementById("task-input");
// console.log(taskInput);

// 
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

// just enter
taskInput.addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    addTask();
  }
});


// move underline 
let underLine = document.getElementById("under-line");

function moveUnderline(tabEl){
  if(!underLine) return;
  underLine.style.left = tabEl.offsetLeft + "px";
  underLine.style.width = tabEl.offsetWidth + "px";
}


// select one of 4 task-tabs, filtering
// which one clicked = event
let tabs = document.querySelectorAll(".task-tabs div");

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
  moveUnderline(event.currentTarget);
  filter(event);
});
}


let mode = 'all';
let taskList = [];
let filterList = [];

function filter(event){
    // mode : all region ==> going up
    if(event){
        mode = event.currentTarget.id;
    }
    
    filterList = [];

    // console.log("filter",mode);
    if(mode==="all"){
        // display all 
        render();
        return;

    }else if(mode==="ongoing"){
        // display iscomplete false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        render();
        // console.log("ongoing",filterList);

    }else if (mode==="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
                
    // console.log("done",filterList);
} 


function addTask() {
        // no input
      if (taskInput.value.trim() === "") {
    alert("할 일을 입력해주삼");
    taskInput.focus();
    return;
  }
    // console.log(clicked);
    // let taskContent = taskInput.value;
    let task = {
        id : Date.now(),
        taskContent: taskInput.value,
        isComplete : false
    }

    taskList.push(task);
    console.log(taskList);

    filter();
    taskInput.value = "";
}

// change task to {}, --> taskList[i] ==> taskList[i].taskContent


function render() {
    let list = [];
    // 1. each selected tap 
    if (mode === "all"){
       // taskList
        list = taskList;
    } else if(mode === "ongoing" || mode === "done"){
        list=filterList;
    }

    // 2.display each list

    let resultHTML ='';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete===true){
            resultHTML+=`<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete(${list[i].id})">Check</button>
                        <button onclick="delTask(${list[i].id})">Del</button>
                    </div>
                </div>`
        } else {resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete(${list[i].id})">Check</button>
                        <button onclick="delTask(${list[i].id})">Del</button>
                    </div>
                </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// check then cancel line : onclick making function eg :toggleComplete
// t--> need task id --> serch on gg 
// 

function toggleComplete(id){
    // display clicked id
    console.log("id",id);
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id===id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    
    filter();
}

function delTask(id){
    console.log("id",id);
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id===id){
            taskList.splice(i,1);
            break;
        }
    }
    console.log(taskList);
    // value change ==> ui change
    filter();
}


