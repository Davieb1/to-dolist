// static/script.js
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const clearCompletedButton = document.getElementById('clear-completed');
    const saveTasksButton = document.getElementById('save-tasks');

// Listens for an event     
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newTaskInput = document.getElementById('new-task');
        const taskText = newTaskInput.value;
        if (taskText.trim() !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

// Clears the completed tasks    
    clearCompletedButton.addEventListener('click', function () {
        const pendingTasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').innerText;
            const isCompleted = li.querySelector('input[type="checkbox"]').checked;
            if (!isCompleted) {
                li.classList.add('high-priority');
                pendingTasks.push(li);
            } else {
                taskList.removeChild(li);
            }
        });
    });

// Saves the work to a txt file    
    saveTasksButton.addEventListener('click', function () {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').innerText;
            const isCompleted = li.querySelector('input[type="checkbox"]').checked;
            const status = isCompleted ? 'completed' : 'pending';
            tasks.push({ task: taskText, status: status });
        });

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tasks)
        }).then(response => response.json())
            .then(data => {
                alert(data.message);
            });
    });

// Creates a checkbox    
    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
        `;
        taskList.appendChild(li);

        li.querySelector('input[type="checkbox"]').addEventListener('change', function () {
            if (this.checked) {
                li.classList.add('completed');
                li.classList.remove('high-priority');
            } else {
                li.classList.remove('completed');
            }
        });
    }
});
