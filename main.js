// #유저 값 입력
let taskInput = document.getElementById("task-input");
// console.log(taskInput);

// #버튼클릭하면 할일 추가
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

// #task 리스트 만들기

let taskList = [];

function addTask() {
    // console.log(clicked);
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);

    render();
    taskInput.value = "";
}

function render() {
    let resultHTML ='';
    for(let i=0;i<taskList.length;i++){
        resultHTML += `<div class="task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button>Check</button>
                        <button>Del</button>
                    </div>
                </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}