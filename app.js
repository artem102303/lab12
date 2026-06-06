const form = document.querySelector('#todo-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        if (task.completed) {
            li.classList.add('completed');
        }

        li.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.dataset.index = index;

        li.append(' ');
        li.append(deleteBtn);

        taskList.append(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = input.value.trim();

    if (taskText !== '') {
        tasks.push({
            text: taskText,
            completed: false
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        input.value = '';

        renderTasks();
    }
});

taskList.addEventListener('click', (e) => {

    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset.index;

        tasks.splice(index, 1);
    }
    else if (e.target.tagName === 'LI') {
        const index = Array.from(taskList.children).indexOf(e.target);

        tasks[index].completed = !tasks[index].completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
});

renderTasks();