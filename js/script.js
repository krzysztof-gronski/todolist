{

    const tasks = [
        { content: "dede",
        done: true},
        {content: "jrifrjf",
        done: false},
    ];

const addNewTask=(newTaskContent)=>{
    tasks.push({content: newTaskContent});
    render();
};

const removeTask(index){
    tasks.splice(index,1);
            render();
};

const onFormSubmit=(event)=>{

    event.preventDefault();
    const newTaskContent=document.querySelector(".js-newTask").value.trim();
    if(newTaskContent===""){
        return;
    }
    addNewTask(newTaskContent);
}

const render = () => {
    let htmlString = "";
    for(const task of tasks){
        htmlString+=`
        <li class="ul__li${task.done?"--done\"":"\""}>  
        ${task.content}
        <button class="js-remove">Usun</button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML=htmlString;
    const removeButtons = document.querySelectorAll(".js-remove";)
    removeButtons.forEach((removeButton,index)=>{
        removeButton.addEventListener("click",()=>{
            removeTask(index);
        })

    })
};

const init = () => {
    render();

    const form=document.querySelector(".js-form");
    form.addEventListener("submit",onFormSubmit);
};

init();

}