{

    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })

        })
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })

        });
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

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
        <li class="ul__li${task.done ? "--done\"" : "\""}>  
        <button class="ul__button js-done"></button>
        ${task.content}
        <button class="ul__button ul__button--remove js-remove">X</button>
        </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            if(tasks[index].done){toggleDoneButton.textContent="V"};

        });


    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}