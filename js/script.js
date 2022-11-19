
{

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0,index),
            ...tasks.slice(index+1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks=[
            ...tasks.slice(0,index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index+1),
        ];
        render();
    };

    const allDone = () => {
        tasks=tasks.map((task)=>({
        ...task,
        done: true,
    }));
    console.log("alldone");
        render();
    };

    const hideDone = () => {
        hideDoneTasks=!hideDoneTasks;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })

        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })

        });
    };

    const bindButtonsEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDoneButton");
        if(hideDoneButton){
            hideDoneButton.addEventListener("click", () => {
                hideDone();
            });
        }
        
        const allDoneButton = document.querySelector(".js-allDoneButton");
        if(hideDoneButton){
            allDoneButton.addEventListener("click", () => {
                allDone();
            });
        }
        

        

    };

    const onFormSubmit = (event) => {

        event.preventDefault();
        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();
        if (newTaskContent === "") {
            newTaskInput.value = "";
            newTaskInput.focus();
            return;
        }
        addNewTask(newTaskContent);
        newTaskInput.value = "";
        newTaskInput.focus();
    }

    const renderTasks = () => {
        let htmlString = "";
        const liClasses = hideDoneTasks ? "ul__li--hidden\"" : "\"";
        for (const task of tasks) {
            htmlString += `
        <li class="ul__li ${task.done ? liClasses : "\""}>  
        <button class="ul__button js-done"></button>
        <span ${task.done ? "class=\"ul__li--done\"" : ""}>${task.content}</span>
        <button class="ul__button ul__button--remove js-remove">🗑</button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;


    };

    const renderButtons = () => {
        let htmlString = "";
        if(tasks.length)
        {
            htmlString=`
            <button class="form__button form__button--listHeader js-hideDoneButton">${hideDoneTasks ? "Pokaż ukończone":"Ukryj ukończone"}</button>
            <button class="form__button form__button--listHeader js-allDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
        }
        document.querySelector(".js-headerButtons").innerHTML = htmlString;
    };



    const render = () => {

        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();


        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            if (tasks[index].done) { toggleDoneButton.innerHTML = "&#10004" };

        });


    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}