var taskList = document.querySelector('.task-list');
var templateList = document.querySelector('.list-template__task-list');
var deleteIcon = document.querySelector('.delete-icon');
var deleteIconTemplate = document.querySelector('.delete-icon--template');
var taskReadyArr = [].slice.call(taskList.querySelectorAll('.task__ready'));

var storage = localStorage;

var dataList = {
  "Начать делать презентацию": "work",
  "Заплатить за аренду": "personal",
  "Купить молоко": "shopping",
  "Не забыть забрать Мишу со школы": "family",
  "Купить шоколад Маше": "shopping"

};

storage.data = JSON.stringify(dataList);






// ФОРМИРОВАНИЕ СТАРТОВОГО СПИСКА

var renderMainList = function (obj) {
  var fragment = document.createDocumentFragment();

  for (key in obj) {

    var taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.classList.add('task--' + obj[key]);

    var taskItemReady = document.createElement('div');
    taskItemReady.classList.add('task__ready');
    taskItem.appendChild(taskItemReady);

    var taskItemText = document.createElement('p');
    taskItemText.classList.add('task__text');
    taskItemText.textContent = key;
    taskItem.appendChild(taskItemText);

    fragment.appendChild(taskItem);
  }

  taskList.appendChild(fragment);

};

renderMainList(JSON.parse(storage.data));




// ГАЛОЧКА И ЗАЧЕРКИВАНИЕ ТАСКА

var doneMark = document.querySelector('.task__ready--done');

if (doneMark) {
  deleteIcon.classList.add('delete-icon--show');
}


var onTaskDone = function (wrapperNode) {

  wrapperNode.addEventListener('click', function(e){

    // Установка калочки таска
    if (e.target.classList.contains('task__ready')) {
      e.target.classList.toggle('task__ready--done');
      e.target.nextElementSibling.classList.toggle('task__text--done');
      e.target.parentElement.classList.toggle('task--done');

      // Появление корзинки при выборе таска
      var doneMark = wrapperNode.querySelector('.task__ready--done');

      if (doneMark) {
        deleteIcon.classList.add('delete-icon--show');
      } else {
        deleteIcon.classList.remove('delete-icon--show');
      }
    } 
    
  });
}

onTaskDone(taskList);
// 
// 








// УДАЛЕНИЕ ТАСКА


deleteIcon.addEventListener('click', function (e) {
  var taskDoneArr = [].slice.call(document.querySelectorAll('.task--done'));

  for (var i = 0; i < taskDoneArr.length; i++) {
    taskDoneArr[i].remove();
    
  }

  deleteIcon.classList.remove('delete-icon--show');

  updateData();

});

// 
// 


// btn-plus

var formBtn = document.querySelector('.form__btn');
var btnList = document.querySelector('.create__items');
var overlay = document.querySelector('.overlay');

formBtn.addEventListener('click', function(e){
  formBtn.classList.toggle('form__btn--active');
  btnList.classList.toggle('create__items--active');
  overlay.classList.toggle('overlay--active');
});
// 
// 



// list-template

// СОЗДАНИЕ ЗАГОЛОВКА И ЦВЕТА КАРТОЧКИ
var listTemplate = document.querySelector('.list-template');
var templateTitile = listTemplate.querySelector('.list-template__title');
var templateCount = listTemplate.querySelector('.list-template__count');

// template-list
var templateTaskList = document.querySelector('.list-template__task-list');
var templateItem = document.querySelector('.list-template__task--template');
var templateReady = templateItem.querySelector('.list-template__task-ready');
var templateText = templateItem.querySelector('.list-template__task-text');
var templateDate = templateItem.querySelector('task__date');


var categoryList = document.querySelector('.category__list');





var callback = function(e){
  var targ = e.target;

  // фикс выбора карточки
  if (event.target.parentElement.tagName === 'LI') {
   targ = event.target.parentElement;
  }
  



  // получим цвет, заголовок, счетчик категории
  var colorTarget = getComputedStyle(targ).getPropertyValue('background-color');
  var titleTarget = targ.firstElementChild.innerText;
  var counterTarget = targ.lastElementChild.innerText;


  //зададим цвет, заголовок, счетчик карточки
  listTemplate.style.backgroundColor = colorTarget;
  templateTitile.textContent =  titleTarget;
  templateCount.textContent = counterTarget;



  // 
  // 

  // соберем список задач
  var idCategory = targ.id.slice(4);


  function createTaskElem() {

    var templateTaskArr = [].slice.call(taskList.querySelectorAll('.task--' + idCategory));

    var fragment = document.createDocumentFragment();
    

    for (var i = 0; i < templateTaskArr.length; i++) {
      var newItem = document.createElement('div');
      newItem.classList.add('list-template__task');
      newItem.classList.add('list-template__task--template');

      var newItemReady = document.createElement('div');
      newItemReady.classList.add('list-template__task-ready');
      newItem.appendChild(newItemReady);

      var newItemText = document.createElement('p');
      newItemText.classList.add('list-template__task-text');
      newItem.appendChild(newItemText);

      var newItemDate = document.createElement('span');
      newItemDate.classList.add('list-template__task-date');
      newItem.appendChild(newItemDate);
      newItemText.textContent = templateTaskArr[i].textContent;
      fragment.appendChild(newItem);
      
    }
    
    templateTaskList.innerHTML= '';
    templateTaskList.appendChild(fragment);
  }


  createTaskElem();
  

  
};

categoryList.addEventListener('click', callback);

onTaskDone(templateTaskList);












// Галочка и появление корзинки в карточке

var onTaskDoneTemplate = function (wrapperNode) {

  wrapperNode.addEventListener('click', function(e){

    // Установка калочки таска
    if (e.target.classList.contains('list-template__task-ready')) {
      e.target.classList.toggle('list-template__task-ready--done');
      e.target.nextElementSibling.classList.toggle('list-template__task-text--done');
      e.target.parentElement.classList.toggle('list-template__task--done');

      // Появление корзинки при выборе таска
      var doneMark = wrapperNode.querySelector('.list-template__task-ready--done');

      if (doneMark) {
        deleteIconTemplate.classList.add('delete-icon--show');
      } else {
        deleteIconTemplate.classList.remove('delete-icon--show');
      }
    } 
    
  });
}

onTaskDoneTemplate(templateList);

// УДАЛЕНИЕ ТАСКА В КАРТОЧКЕ

deleteIconTemplate.addEventListener('click', function (e) {
  var taskDoneArr = [].slice.call(document.querySelectorAll('.list-template__task--done'));

  var textContentArr = [];
  
  for (var i = 0; i < taskDoneArr.length; i++) {
    textContentArr[i] = taskDoneArr[i].textContent;
    taskDoneArr[i].remove();
    
  }

  console.dir(textContentArr);



  var tasksArr = [].slice.call(taskList.querySelectorAll('.task'));

  for (var i = 0; i < taskDoneArr.length; i++) {
    

    for (var k = 0; k < tasksArr.length; k++) {
      if (tasksArr[k].textContent === taskDoneArr[i].textContent) {
        tasksArr[k].remove();
      }
      
    }
    
  }



  deleteIconTemplate.classList.remove('delete-icon--show');


  updateData();

});


// КОЛИЧЕСТВО ЗАДАЧ
 


var updateData = function () {
  // соберем и сгрупируем таски по категориям в обьект

  var tasksArr = [].slice.call(taskList.querySelectorAll('.task'));

  var categoriesArr = [].slice.call(categoryList.querySelectorAll('.category__item'));

  var categoriesIdObj = {};
  
  for (var i = 0; i < categoriesArr.length; i++) {
    categoriesIdObj[categoriesArr[i].id.slice(4)] = 0;
  }
  

  
  
  
  // 

  // ПОДСЧЕТ ТАСКОВ ПО КАТЕГОРИЯМ

  var countTasks = function (array, obj) {
    
    for (var i = 0; i < array.length; i++) {

      
      if (array[i].classList.contains('task--work')) {
        obj.work++;
      } else if (array[i].classList.contains('task--personal')){
        obj.personal++;
      } else if (array[i].classList.contains('task--shopping')){
        obj.shopping++;
      } else if (array[i].classList.contains('task--family')){
        obj.family++;
      } else if (array[i].classList.contains('task--warning')){
        obj.warning++;
      }
      
    }
    return obj;
  }


  

  var resul = countTasks(tasksArr, categoriesIdObj);
  
  // 

  // ОКОНЧАНИЕ СЛОВА "ЗАДАЧА"

  var combiendTaskWords = function (obj) {
    
    var currentValueCounter;
    var pCounter;
    for (key in obj) {
      pCounter = categoryList.querySelector('#cat_' + key + ' .category__count');
      currentValueCounter = obj[key] ;
      if (currentValueCounter === 0) {
        pCounter.innerText = 'Нет задач';
      } else if(currentValueCounter === 1){
        pCounter.innerText = currentValueCounter + ' задача';
      } else if(currentValueCounter >= 2 && currentValueCounter <= 4){
        pCounter.innerText = currentValueCounter + ' задачи';
      } else if (currentValueCounter >= 5 && currentValueCounter <= 20) {
        pCounter.innerText = currentValueCounter + ' задач';
      }
    }

  }

  combiendTaskWords(resul);

}

updateData();
  
  
// ОТРИСОВКА ОКНА НОВОГО ТАСКА 

var createNewTask = function() {

// окно
  var newTaskWindow = document.createElement('div');
  newTaskWindow.classList.add('new-task');

// кнопки отмена и готово 
  var btnWrapper = document.createElement('div');
  var btnCancel = document.createElement('button');
  var btnDone = document.createElement('button');

  btnWrapper.appendChild(btnCancel);
  btnWrapper.appendChild(btnDone);

// список-обертка и один таск
  var newTaskList = document.createElement('div');
  var newTaskItem = document.createElement('div');
  var newTaskDone = document.createElement('div');
  var newTaskInput = document.createElement('input');

  newTaskItem.appendChild(newTaskDone);
  newTaskItem.appendChild(newTaskInput);
  newTaskList.appendChild(newTaskItem);
}



// СОЗДАНИЕ НОВОГО ИНПУТА ДЛЯ ЗАПИСИ

var createTask = function(current) {

  var newLi = document.createElement('li');
  newLi.classList.add('new-task__item');
  var newDiv = document.createElement('div');
  newDiv.classList.add('new-task__ready');
  var newInput = document.createElement('input');
  newInput.id = 'new-task-' + current;
  newInput.name = 'new-task';
  newInput.type = 'text';
  newInput.placeholder = 'Что нужно сделать ?';
  newLi.appendChild(newDiv);
  newLi.appendChild(newInput);

  return newLi;

};

// 
// 

var removeInput = function (e) {
  if (!e.target.value) {
    e.target.remove();
  }
}

var inputNewTask = document.querySelector('#new-task-1');
var itemTemplate = document.querySelector('.new-task__item input');
var currentItem = 1;

var appendInput = function (e) {
    if (e.keyCode === 13 && !e.target.value == 0 ) {
      var newTaskList = document.querySelector('.new-task__list');
      e.preventDefault();
      currentItem = ++currentItem;
      var newItemTemplate = createTask(currentItem);
      
      newItemTemplate.addEventListener('keydown', appendInput);
      newTaskList.appendChild(newItemTemplate);
      var tabItemm = newTaskList.querySelector('#new-task-' + currentItem);
      tabItemm.focus();
      e.target.removeEventListener('keydown', appendInput);
      e.preventDefault();
    }

    if (e.keyCode === 13 && e.target.value == 0 ) {
      e.preventDefault();
    }


    if (e.target.value == 0 && e.keyCode === 8) {
      e.target.parentNode.previousElementSibling.lastElementChild.focus();
      e.target.parentNode.remove();
    }

}

itemTemplate.addEventListener('keydown', appendInput);

//

var newTaskScreen = document.querySelector('.new-task');
var firstInput = document.querySelector('#new-task-1');
var taskBtnDone = document.querySelector('.new-task__btn--done');
var taskBtnCancel = document.querySelector('.new-task__btn--cancel');

//ПОЯВЛЕНИЕ И СКРЫТИЕ КНОПКИ "ГОТОВО"

firstInput.addEventListener('input', function (e) {
  if (e.target.value) {
    taskBtnDone.classList.remove('new-task__btn--hide');
  } else {
    taskBtnDone.classList.add('new-task__btn--hide');
  }
});


taskBtnCancel.addEventListener('click', function (e) {
  e.preventDefault();
  newTaskScreen.classList.add('new-task--hide');
});



taskBtnDone.addEventListener('click', function (e) {
  e.preventDefault();  

  var allNewItems = newTaskScreen.querySelectorAll('.new-task__item input');
  var currentCategory = newTaskScreen.querySelector('.new-task__cat-item input:checked');
  var categoryName = currentCategory.value;
  var dataNewList = {};

  for (var i = 0; i < allNewItems.length; i++) {
    if (allNewItems[i].value) {
      dataNewList[allNewItems[i].value] = categoryName;
    }
    
  }
 
  storage.data = JSON.stringify(dataNewList);
  newTaskScreen.classList.add('new-task--hide');
  renderMainList(JSON.parse(storage.data));

});

