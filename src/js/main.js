const taskList = document.querySelector('.task-list');
var templateList = document.querySelector('.list-template__task-list');
var deleteIcon = document.querySelector('.delete-icon');
var deleteIconTemplate = document.querySelector('.delete-icon--template');
var taskReadyArr = [].slice.call(taskList.querySelectorAll('.task__ready'));
const newTask = document.querySelector('.create__elems--task');


var storage = localStorage;

let startList = {
  // "Начать делать презентацию": "work",
  // "Заплатить за аренду": "personal",
  // "Купить молоко": "shopping",
  // "Не забыть забрать Мишу со школы": "family",
  // "Купить шоколад Маше": "shopping"
};

// var dataList = Object.assign(startList);

// storage.data = JSON.stringify(dataList);

var funcObj = {
  appendTaskToStorage: function (obj) {
    for (const key in obj) {
      storage.setItem(key, obj[key]);
    }
  }
}

funcObj.appendTaskToStorage(startList);


// ФОРМИРОВАНИЕ СТАРТОВОГО СПИСКА

var renderMainList = function (obj) {
  var fragment = document.createDocumentFragment();

  for (key in obj) {
    if (obj.getItem(key) !== null) {

      var taskItem = document.createElement('div');
      taskItem.classList.add('task');
      taskItem.classList.add('task--' + obj[key]);
      taskItem.setAttribute('data-category', obj[key]);

      var taskItemReady = document.createElement('div');
      taskItemReady.classList.add('task__ready');
      taskItem.appendChild(taskItemReady);

      var taskItemText = document.createElement('p');
      taskItemText.classList.add('task__text');
      taskItemText.textContent = key;
      taskItem.appendChild(taskItemText);

      fragment.appendChild(taskItem);

    }

  }

  taskList.appendChild(fragment);

};

renderMainList(storage);






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


// ПРИ УДАЛЕНИИ ТАСКА УДАЛЯЕТСЯ ЗАПИСЬ В localStorage
  var taskDoneTextArr = [];
  for(let i = 0; i < taskDoneArr.length; i++) {
    taskDoneTextArr[i] = taskDoneArr[i].lastChild.textContent;
  }
 

  // let storageObj = JSON.parse(storage.data);
 

  for (let index = 0; index < taskDoneTextArr.length; index++) {

    for (const key in storage) {
      if (key == taskDoneTextArr[index] ) {
        storage.removeItem(key);
      }
    }
   
    
  }

  // storage.data = JSON.stringify(storageObj);

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

overlay.addEventListener('click', function(e){
  formBtn.classList.toggle('form__btn--active');
  btnList.classList.toggle('create__items--active');
  overlay.classList.toggle('overlay--active');
})

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
  if (e.target.parentElement.tagName === 'LI') {
   targ = e.target.parentElement;
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

  console.log(textContentArr);

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

      obj.all++;
      
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

  var taskDone = document.querySelector('.task__text');

});



taskBtnDone.addEventListener('click', function (e) {
  e.preventDefault();  

  var allNewItems = newTaskScreen.querySelectorAll('.new-task__item input');
  let categoryName = newTaskScreen.querySelector('.new-task__cat-item input:checked').value;
  var dataNewList = {};

  let tasksArrRemove = taskList.querySelectorAll('.task');
  for (let i = 0; i < tasksArrRemove.length; i++) {
    tasksArrRemove[i].remove();
    
  }

  for (var i = 0; i < allNewItems.length; i++) {
    if (allNewItems[i].value) {
      storage.setItem(allNewItems[i].value, categoryName);
    }
    
  }

  // let finalList = Object.assign(dataList, dataNewList);

  // storage.data = JSON.stringify(finalList);
  newTaskScreen.classList.add('new-task--hide');
  renderMainList(storage);
  updateData();

});


// СООРТИРОВКА ВСЕГО СПИСКА ПО КАТЕГОРИЯМ

categoryList.addEventListener('click', function (e) {
  // console.dir(e.target);
  let target = e.target.closest('li');
  let chooseCategory = target.dataset.category;

  let tasksArr = taskList.querySelectorAll('.task');

  tasksArr.forEach((elem) => {
    if (elem.classList.contains('task--delete')) {
      elem.classList.remove('task--delete');
    }
    if (elem.dataset.category !== chooseCategory) {
      elem.classList.add('task--delete');
    }
    
  })

  if (chooseCategory == 'all') {
    tasksArr.forEach((elem) => {
      if (elem.classList.contains('task--delete')) {
        elem.classList.remove('task--delete');
      }
    })
  }

});

newTask.addEventListener('click', (e) => {
  newTaskScreen.classList.remove('new-task--hide');
  formBtn.classList.toggle('form__btn--active');
  btnList.classList.toggle('create__items--active');
  overlay.classList.toggle('overlay--active');
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIGRlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24nKTtcclxudmFyIGRlbGV0ZUljb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbi0tdGVtcGxhdGUnKTtcclxudmFyIHRhc2tSZWFkeUFyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfX3JlYWR5JykpO1xyXG5jb25zdCBuZXdUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZV9fZWxlbXMtLXRhc2snKTtcclxuXHJcblxyXG52YXIgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuXHJcbmxldCBzdGFydExpc3QgPSB7XHJcbiAgLy8gXCLQndCw0YfQsNGC0Ywg0LTQtdC70LDRgtGMINC/0YDQtdC30LXQvdGC0LDRhtC40Y5cIjogXCJ3b3JrXCIsXHJcbiAgLy8gXCLQl9Cw0L/Qu9Cw0YLQuNGC0Ywg0LfQsCDQsNGA0LXQvdC00YNcIjogXCJwZXJzb25hbFwiLFxyXG4gIC8vIFwi0JrRg9C/0LjRgtGMINC80L7Qu9C+0LrQvlwiOiBcInNob3BwaW5nXCIsXHJcbiAgLy8gXCLQndC1INC30LDQsdGL0YLRjCDQt9Cw0LHRgNCw0YLRjCDQnNC40YjRgyDRgdC+INGI0LrQvtC70YtcIjogXCJmYW1pbHlcIixcclxuICAvLyBcItCa0YPQv9C40YLRjCDRiNC+0LrQvtC70LDQtCDQnNCw0YjQtVwiOiBcInNob3BwaW5nXCJcclxufTtcclxuXHJcbi8vIHZhciBkYXRhTGlzdCA9IE9iamVjdC5hc3NpZ24oc3RhcnRMaXN0KTtcclxuXHJcbi8vIHN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGFMaXN0KTtcclxuXHJcbnZhciBmdW5jT2JqID0ge1xyXG4gIGFwcGVuZFRhc2tUb1N0b3JhZ2U6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICBzdG9yYWdlLnNldEl0ZW0oa2V5LCBvYmpba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jT2JqLmFwcGVuZFRhc2tUb1N0b3JhZ2Uoc3RhcnRMaXN0KTtcclxuXHJcblxyXG4vLyDQpNCe0KDQnNCY0KDQntCS0JDQndCY0JUg0KHQotCQ0KDQotCe0JLQntCT0J4g0KHQn9CY0KHQmtCQXHJcblxyXG52YXIgcmVuZGVyTWFpbkxpc3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouZ2V0SXRlbShrZXkpICE9PSBudWxsKSB7XHJcblxyXG4gICAgICB2YXIgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLS0nICsgb2JqW2tleV0pO1xyXG4gICAgICB0YXNrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0ZWdvcnknLCBvYmpba2V5XSk7XHJcblxyXG4gICAgICB2YXIgdGFza0l0ZW1SZWFkeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0YXNrSXRlbVJlYWR5LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3JlYWR5Jyk7XHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tJdGVtUmVhZHkpO1xyXG5cclxuICAgICAgdmFyIHRhc2tJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza0l0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3RleHQnKTtcclxuICAgICAgdGFza0l0ZW1UZXh0LnRleHRDb250ZW50ID0ga2V5O1xyXG4gICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbVRleHQpO1xyXG5cclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB0YXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG59O1xyXG5cclxucmVuZGVyTWFpbkxpc3Qoc3RvcmFnZSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vINCT0JDQm9Ce0KfQmtCQINCYINCX0JDQp9CV0KDQmtCY0JLQkNCd0JjQlSDQotCQ0KHQmtCQXHJcblxyXG52YXIgZG9uZU1hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza19fcmVhZHktLWRvbmUnKTtcclxuXHJcbmlmIChkb25lTWFyaykge1xyXG4gIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxufVxyXG5cclxuXHJcbnZhciBvblRhc2tEb25lID0gZnVuY3Rpb24gKHdyYXBwZXJOb2RlKSB7XHJcblxyXG4gIHdyYXBwZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINC60LDQu9C+0YfQutC4INGC0LDRgdC60LBcclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2tfX3JlYWR5JykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fcmVhZHktLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX3RleHQtLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrLS1kb25lJyk7XHJcblxyXG4gICAgICAvLyDQn9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQv9GA0Lgg0LLRi9Cx0L7RgNC1INGC0LDRgdC60LBcclxuICAgICAgdmFyIGRvbmVNYXJrID0gd3JhcHBlck5vZGUucXVlcnlTZWxlY3RvcignLnRhc2tfX3JlYWR5LS1kb25lJyk7XHJcblxyXG4gICAgICBpZiAoZG9uZU1hcmspIHtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbm9uVGFza0RvbmUodGFza0xpc3QpO1xyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0KPQlNCQ0JvQldCd0JjQlSDQotCQ0KHQmtCQXHJcblxyXG5cclxuZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgdmFyIHRhc2tEb25lQXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay0tZG9uZScpKTtcclxuXHJcblxyXG4vLyDQn9Cg0Jgg0KPQlNCQ0JvQldCd0JjQmCDQotCQ0KHQmtCQINCj0JTQkNCb0K/QldCi0KHQryDQl9CQ0J/QmNCh0Kwg0JIgbG9jYWxTdG9yYWdlXHJcbiAgdmFyIHRhc2tEb25lVGV4dEFyciA9IFtdO1xyXG4gIGZvcihsZXQgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFza0RvbmVUZXh0QXJyW2ldID0gdGFza0RvbmVBcnJbaV0ubGFzdENoaWxkLnRleHRDb250ZW50O1xyXG4gIH1cclxuIFxyXG5cclxuICAvLyBsZXQgc3RvcmFnZU9iaiA9IEpTT04ucGFyc2Uoc3RvcmFnZS5kYXRhKTtcclxuIFxyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFza0RvbmVUZXh0QXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHN0b3JhZ2UpIHtcclxuICAgICAgaWYgKGtleSA9PSB0YXNrRG9uZVRleHRBcnJbaW5kZXhdICkge1xyXG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgXHJcbiAgfVxyXG5cclxuICAvLyBzdG9yYWdlLmRhdGEgPSBKU09OLnN0cmluZ2lmeShzdG9yYWdlT2JqKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFza0RvbmVBcnJbaV0ucmVtb3ZlKCk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGRlbGV0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuLy8gYnRuLXBsdXNcclxuXHJcbnZhciBmb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2J0bicpO1xyXG52YXIgYnRuTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGVfX2l0ZW1zJyk7XHJcbnZhciBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuXHJcbmZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICBmb3JtQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2J0bi0tYWN0aXZlJyk7XHJcbiAgYnRuTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdjcmVhdGVfX2l0ZW1zLS1hY3RpdmUnKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ292ZXJsYXktLWFjdGl2ZScpO1xyXG59KTtcclxuXHJcbm92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICBmb3JtQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2J0bi0tYWN0aXZlJyk7XHJcbiAgYnRuTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdjcmVhdGVfX2l0ZW1zLS1hY3RpdmUnKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ292ZXJsYXktLWFjdGl2ZScpO1xyXG59KVxyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcblxyXG4vLyBsaXN0LXRlbXBsYXRlXHJcblxyXG4vLyDQodCe0JfQlNCQ0J3QmNCVINCX0JDQk9Ce0JvQntCS0JrQkCDQmCDQptCS0JXQotCQINCa0JDQoNCi0J7Qp9Ca0JhcclxudmFyIGxpc3RUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlJyk7XHJcbnZhciB0ZW1wbGF0ZVRpdGlsZSA9IGxpc3RUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGl0bGUnKTtcclxudmFyIHRlbXBsYXRlQ291bnQgPSBsaXN0VGVtcGxhdGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX2NvdW50Jyk7XHJcblxyXG4vLyB0ZW1wbGF0ZS1saXN0XHJcbnZhciB0ZW1wbGF0ZVRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stbGlzdCcpO1xyXG52YXIgdGVtcGxhdGVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stLXRlbXBsYXRlJyk7XHJcbnZhciB0ZW1wbGF0ZVJlYWR5ID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXJlYWR5Jyk7XHJcbnZhciB0ZW1wbGF0ZVRleHQgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stdGV4dCcpO1xyXG52YXIgdGVtcGxhdGVEYXRlID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3Rhc2tfX2RhdGUnKTtcclxuXHJcblxyXG52YXIgY2F0ZWdvcnlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGVnb3J5X19saXN0Jyk7XHJcblxyXG5cclxudmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgdmFyIHRhcmcgPSBlLnRhcmdldDtcclxuXHJcbiAgLy8g0YTQuNC60YEg0LLRi9Cx0L7RgNCwINC60LDRgNGC0L7Rh9C60LhcclxuICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnTEknKSB7XHJcbiAgIHRhcmcgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcblxyXG5cclxuICAvLyDQv9C+0LvRg9GH0LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YLQtdCz0L7RgNC40LhcclxuICB2YXIgY29sb3JUYXJnZXQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmcpLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICB2YXIgdGl0bGVUYXJnZXQgPSB0YXJnLmZpcnN0RWxlbWVudENoaWxkLmlubmVyVGV4dDtcclxuICB2YXIgY291bnRlclRhcmdldCA9IHRhcmcubGFzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcblxyXG5cclxuICAvL9C30LDQtNCw0LTQuNC8INGG0LLQtdGCLCDQt9Cw0LPQvtC70L7QstC+0LosINGB0YfQtdGC0YfQuNC6INC60LDRgNGC0L7Rh9C60LhcclxuICBsaXN0VGVtcGxhdGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUYXJnZXQ7XHJcbiAgdGVtcGxhdGVUaXRpbGUudGV4dENvbnRlbnQgPSAgdGl0bGVUYXJnZXQ7XHJcbiAgdGVtcGxhdGVDb3VudC50ZXh0Q29udGVudCA9IGNvdW50ZXJUYXJnZXQ7XHJcblxyXG5cclxuXHJcbiAgLy8gXHJcbiAgLy8gXHJcblxyXG4gIC8vINGB0L7QsdC10YDQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXHJcbiAgdmFyIGlkQ2F0ZWdvcnkgPSB0YXJnLmlkLnNsaWNlKDQpO1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW0oKSB7XHJcblxyXG4gICAgdmFyIHRlbXBsYXRlVGFza0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stLScgKyBpZENhdGVnb3J5KSk7XHJcblxyXG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZVRhc2tBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrJyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtUmVhZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbVJlYWR5LmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtUmVhZHkpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBuZXdJdGVtVGV4dC5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXRleHQnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtVGV4dCk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG5ld0l0ZW1EYXRlLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stZGF0ZScpO1xyXG4gICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKG5ld0l0ZW1EYXRlKTtcclxuICAgICAgbmV3SXRlbVRleHQudGV4dENvbnRlbnQgPSB0ZW1wbGF0ZVRhc2tBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5pbm5lckhUTUw9ICcnO1xyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlVGFza0VsZW0oKTtcclxuICBcclxuXHJcbiAgXHJcbn07XHJcblxyXG5jYXRlZ29yeUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XHJcblxyXG5vblRhc2tEb25lKHRlbXBsYXRlVGFza0xpc3QpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vINCT0LDQu9C+0YfQutCwINC4INC/0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INCyINC60LDRgNGC0L7Rh9C60LVcclxuXHJcbnZhciBvblRhc2tEb25lVGVtcGxhdGUgPSBmdW5jdGlvbiAod3JhcHBlck5vZGUpIHtcclxuXHJcbiAgd3JhcHBlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0LrQsNC70L7Rh9C60Lgg0YLQsNGB0LrQsFxyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeScpKSB7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHktLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stdGV4dC0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stLWRvbmUnKTtcclxuXHJcbiAgICAgIC8vINCf0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INC/0YDQuCDQstGL0LHQvtGA0LUg0YLQsNGB0LrQsFxyXG4gICAgICB2YXIgZG9uZU1hcmsgPSB3cmFwcGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeS0tZG9uZScpO1xyXG5cclxuICAgICAgaWYgKGRvbmVNYXJrKSB7XHJcbiAgICAgICAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICB9KTtcclxufVxyXG5cclxub25UYXNrRG9uZVRlbXBsYXRlKHRlbXBsYXRlTGlzdCk7XHJcblxyXG4vLyDQo9CU0JDQm9CV0J3QmNCVINCi0JDQodCa0JAg0JIg0JrQkNCg0KLQntCn0JrQlVxyXG5cclxuZGVsZXRlSWNvblRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgdGFza0RvbmVBcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0LXRlbXBsYXRlX190YXNrLS1kb25lJykpO1xyXG5cclxuICB2YXIgdGV4dENvbnRlbnRBcnIgPSBbXTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0ZXh0Q29udGVudEFycltpXSA9IHRhc2tEb25lQXJyW2ldLnRleHRDb250ZW50O1xyXG4gICAgdGFza0RvbmVBcnJbaV0ucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyh0ZXh0Q29udGVudEFycik7XHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCB0YXNrc0Fyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICBpZiAodGFza3NBcnJba10udGV4dENvbnRlbnQgPT09IHRhc2tEb25lQXJyW2ldLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgdGFza3NBcnJba10ucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuICB1cGRhdGVEYXRhKCk7XHJcblxyXG59KTtcclxuXHJcblxyXG4vLyDQmtCe0JvQmNCn0JXQodCi0JLQniDQl9CQ0JTQkNCnXHJcbiBcclxuXHJcblxyXG52YXIgdXBkYXRlRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyDRgdC+0LHQtdGA0LXQvCDQuCDRgdCz0YDRg9C/0LjRgNGD0LXQvCDRgtCw0YHQutC4INC/0L4g0LrQsNGC0LXQs9C+0YDQuNGP0Lwg0LIg0L7QsdGM0LXQutGCXHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcblxyXG4gIHZhciBjYXRlZ29yaWVzQXJyID0gW10uc2xpY2UuY2FsbChjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmNhdGVnb3J5X19pdGVtJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0lkT2JqID0ge307XHJcbiAgXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRlZ29yaWVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYXRlZ29yaWVzSWRPYmpbY2F0ZWdvcmllc0FycltpXS5pZC5zbGljZSg0KV0gPSAwO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLy8gXHJcblxyXG4gIC8vINCf0J7QlNCh0KfQldCiINCi0JDQodCa0J7QkiDQn9CeINCa0JDQotCV0JPQntCg0JjQr9CcXHJcblxyXG4gIHZhciBjb3VudFRhc2tzID0gZnVuY3Rpb24gKGFycmF5LCBvYmopIHtcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgb2JqLmFsbCsrO1xyXG4gICAgICBcclxuICAgICAgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0td29yaycpKSB7XHJcbiAgICAgICAgb2JqLndvcmsrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLXBlcnNvbmFsJykpe1xyXG4gICAgICAgIG9iai5wZXJzb25hbCsrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tc2hvcHBpbmcnKSl7XHJcbiAgICAgICAgb2JqLnNob3BwaW5nKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1mYW1pbHknKSl7XHJcbiAgICAgICAgb2JqLmZhbWlseSsrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0td2FybmluZycpKXtcclxuICAgICAgICBvYmoud2FybmluZysrO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG5cclxuICBcclxuXHJcbiAgdmFyIHJlc3VsID0gY291bnRUYXNrcyh0YXNrc0FyciwgY2F0ZWdvcmllc0lkT2JqKTtcclxuICBcclxuICAvLyBcclxuXHJcbiAgLy8g0J7QmtCe0J3Qp9CQ0J3QmNCVINCh0JvQntCS0JAgXCLQl9CQ0JTQkNCn0JBcIlxyXG5cclxuICB2YXIgY29tYmllbmRUYXNrV29yZHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBcclxuICAgIHZhciBjdXJyZW50VmFsdWVDb3VudGVyO1xyXG4gICAgdmFyIHBDb3VudGVyO1xyXG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgIHBDb3VudGVyID0gY2F0ZWdvcnlMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNjYXRfJyArIGtleSArICcgLmNhdGVnb3J5X19jb3VudCcpO1xyXG4gICAgICBjdXJyZW50VmFsdWVDb3VudGVyID0gb2JqW2tleV0gO1xyXG4gICAgICBpZiAoY3VycmVudFZhbHVlQ291bnRlciA9PT0gMCkge1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9ICfQndC10YIg0LfQsNC00LDRhyc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID09PSAxKXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LAnO1xyXG4gICAgICB9IGVsc2UgaWYoY3VycmVudFZhbHVlQ291bnRlciA+PSAyICYmIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPD0gNCl7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRh9C4JztcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID49IDUgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSAyMCkge1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YcnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgY29tYmllbmRUYXNrV29yZHMocmVzdWwpO1xyXG5cclxufVxyXG5cclxudXBkYXRlRGF0YSgpO1xyXG4gIFxyXG4gIFxyXG4vLyDQntCi0KDQmNCh0J7QktCa0JAg0J7QmtCd0JAg0J3QntCS0J7Qk9CeINCi0JDQodCa0JAgXHJcblxyXG52YXIgY3JlYXRlTmV3VGFzayA9IGZ1bmN0aW9uKCkge1xyXG5cclxuLy8g0L7QutC90L5cclxuICB2YXIgbmV3VGFza1dpbmRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG5ld1Rhc2tXaW5kb3cuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2snKTtcclxuXHJcbi8vINC60L3QvtC/0LrQuCDQvtGC0LzQtdC90LAg0Lgg0LPQvtGC0L7QstC+IFxyXG4gIHZhciBidG5XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdmFyIGJ0bkNhbmNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIHZhciBidG5Eb25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuQ2FuY2VsKTtcclxuICBidG5XcmFwcGVyLmFwcGVuZENoaWxkKGJ0bkRvbmUpO1xyXG5cclxuLy8g0YHQv9C40YHQvtC6LdC+0LHQtdGA0YLQutCwINC4INC+0LTQuNC9INGC0LDRgdC6XHJcbiAgdmFyIG5ld1Rhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdmFyIG5ld1Rhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdmFyIG5ld1Rhc2tEb25lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdmFyIG5ld1Rhc2tJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblxyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tEb25lKTtcclxuICBuZXdUYXNrSXRlbS5hcHBlbmRDaGlsZChuZXdUYXNrSW5wdXQpO1xyXG4gIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld1Rhc2tJdGVtKTtcclxufVxyXG5cclxuXHJcblxyXG4vLyDQodCe0JfQlNCQ0J3QmNCVINCd0J7QktCe0JPQniDQmNCd0J/Qo9Ci0JAg0JTQm9CvINCX0JDQn9CY0KHQmFxyXG5cclxudmFyIGNyZWF0ZVRhc2sgPSBmdW5jdGlvbihjdXJyZW50KSB7XHJcblxyXG4gIHZhciBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgbmV3TGkuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX2l0ZW0nKTtcclxuICB2YXIgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3RGl2LmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19yZWFkeScpO1xyXG4gIHZhciBuZXdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgbmV3SW5wdXQuaWQgPSAnbmV3LXRhc2stJyArIGN1cnJlbnQ7XHJcbiAgbmV3SW5wdXQubmFtZSA9ICduZXctdGFzayc7XHJcbiAgbmV3SW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICBuZXdJbnB1dC5wbGFjZWhvbGRlciA9ICfQp9GC0L4g0L3Rg9C20L3QviDRgdC00LXQu9Cw0YLRjCA/JztcclxuICBuZXdMaS5hcHBlbmRDaGlsZChuZXdEaXYpO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0lucHV0KTtcclxuXHJcbiAgcmV0dXJuIG5ld0xpO1xyXG5cclxufTtcclxuXHJcbi8vIFxyXG4vLyBcclxuXHJcbnZhciByZW1vdmVJbnB1dCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYgKCFlLnRhcmdldC52YWx1ZSkge1xyXG4gICAgZS50YXJnZXQucmVtb3ZlKCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgaW5wdXROZXdUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLTEnKTtcclxudmFyIGl0ZW1UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19faXRlbSBpbnB1dCcpO1xyXG52YXIgY3VycmVudEl0ZW0gPSAxO1xyXG5cclxudmFyIGFwcGVuZElucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzICYmICFlLnRhcmdldC52YWx1ZSA9PSAwICkge1xyXG4gICAgICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2xpc3QnKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjdXJyZW50SXRlbSA9ICsrY3VycmVudEl0ZW07XHJcbiAgICAgIHZhciBuZXdJdGVtVGVtcGxhdGUgPSBjcmVhdGVUYXNrKGN1cnJlbnRJdGVtKTtcclxuICAgICAgXHJcbiAgICAgIG5ld0l0ZW1UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBuZXdUYXNrTGlzdC5hcHBlbmRDaGlsZChuZXdJdGVtVGVtcGxhdGUpO1xyXG4gICAgICB2YXIgdGFiSXRlbW0gPSBuZXdUYXNrTGlzdC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stJyArIGN1cnJlbnRJdGVtKTtcclxuICAgICAgdGFiSXRlbW0uZm9jdXMoKTtcclxuICAgICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFwcGVuZElucHV0KTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlID09IDAgJiYgZS5rZXlDb2RlID09PSA4KSB7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucHJldmlvdXNFbGVtZW50U2libGluZy5sYXN0RWxlbWVudENoaWxkLmZvY3VzKCk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5pdGVtVGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFwcGVuZElucHV0KTtcclxuXHJcbi8vXHJcblxyXG52YXIgbmV3VGFza1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFzaycpO1xyXG52YXIgZmlyc3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0xJyk7XHJcbnZhciB0YXNrQnRuRG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fYnRuLS1kb25lJyk7XHJcbnZhciB0YXNrQnRuQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19idG4tLWNhbmNlbCcpO1xyXG5cclxuLy/Qn9Ce0K/QktCb0JXQndCY0JUg0Jgg0KHQmtCg0KvQotCY0JUg0JrQndCe0J/QmtCYIFwi0JPQntCi0J7QktCeXCJcclxuXHJcbmZpcnN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gIGlmIChlLnRhcmdldC52YWx1ZSkge1xyXG4gICAgdGFza0J0bkRvbmUuY2xhc3NMaXN0LnJlbW92ZSgnbmV3LXRhc2tfX2J0bi0taGlkZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0YXNrQnRuRG9uZS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19fYnRuLS1oaWRlJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG50YXNrQnRuQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgbmV3VGFza1NjcmVlbi5jbGFzc0xpc3QuYWRkKCduZXctdGFzay0taGlkZScpO1xyXG5cclxuICB2YXIgdGFza0RvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza19fdGV4dCcpO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbnRhc2tCdG5Eb25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7ICBcclxuXHJcbiAgdmFyIGFsbE5ld0l0ZW1zID0gbmV3VGFza1NjcmVlbi5xdWVyeVNlbGVjdG9yQWxsKCcubmV3LXRhc2tfX2l0ZW0gaW5wdXQnKTtcclxuICBsZXQgY2F0ZWdvcnlOYW1lID0gbmV3VGFza1NjcmVlbi5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2NhdC1pdGVtIGlucHV0OmNoZWNrZWQnKS52YWx1ZTtcclxuICB2YXIgZGF0YU5ld0xpc3QgPSB7fTtcclxuXHJcbiAgbGV0IHRhc2tzQXJyUmVtb3ZlID0gdGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzQXJyUmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrc0FyclJlbW92ZVtpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxOZXdJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFsbE5ld0l0ZW1zW2ldLnZhbHVlKSB7XHJcbiAgICAgIHN0b3JhZ2Uuc2V0SXRlbShhbGxOZXdJdGVtc1tpXS52YWx1ZSwgY2F0ZWdvcnlOYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgLy8gbGV0IGZpbmFsTGlzdCA9IE9iamVjdC5hc3NpZ24oZGF0YUxpc3QsIGRhdGFOZXdMaXN0KTtcclxuXHJcbiAgLy8gc3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZmluYWxMaXN0KTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcbiAgcmVuZGVyTWFpbkxpc3Qoc3RvcmFnZSk7XHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy8g0KHQntCe0KDQotCY0KDQntCS0JrQkCDQktCh0JXQk9CeINCh0J/QmNCh0JrQkCDQn9CeINCa0JDQotCV0JPQntCg0JjQr9CcXHJcblxyXG5jYXRlZ29yeUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIC8vIGNvbnNvbGUuZGlyKGUudGFyZ2V0KTtcclxuICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnbGknKTtcclxuICBsZXQgY2hvb3NlQ2F0ZWdvcnkgPSB0YXJnZXQuZGF0YXNldC5jYXRlZ29yeTtcclxuXHJcbiAgbGV0IHRhc2tzQXJyID0gdGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKTtcclxuXHJcbiAgdGFza3NBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1kZWxldGUnKSkge1xyXG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Rhc2stLWRlbGV0ZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsZW0uZGF0YXNldC5jYXRlZ29yeSAhPT0gY2hvb3NlQ2F0ZWdvcnkpIHtcclxuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLS1kZWxldGUnKTtcclxuICAgIH1cclxuICAgIFxyXG4gIH0pXHJcblxyXG4gIGlmIChjaG9vc2VDYXRlZ29yeSA9PSAnYWxsJykge1xyXG4gICAgdGFza3NBcnIuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWRlbGV0ZScpKSB7XHJcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrLS1kZWxldGUnKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG59KTtcclxuXHJcbm5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gIG5ld1Rhc2tTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnbmV3LXRhc2stLWhpZGUnKTtcclxuICBmb3JtQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2J0bi0tYWN0aXZlJyk7XHJcbiAgYnRuTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdjcmVhdGVfX2l0ZW1zLS1hY3RpdmUnKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ292ZXJsYXktLWFjdGl2ZScpO1xyXG59KSJdLCJmaWxlIjoidGFzay1tYXJrLWFuaW1hdGUuanMifQ==
