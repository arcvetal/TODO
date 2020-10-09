const btnNewTask = document.querySelector('.create__elems--task');

const windowTask = document.querySelector('.new-task');

btnNewTask.addEventListener('click', function (e) {
    if (windowTask.classList.contains('new-task--hide')) {
        windowTask.classList.remove('new-task--hide');
    }    
});