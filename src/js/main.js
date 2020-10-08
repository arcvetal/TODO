const  taskList = document.querySelector('.task-list');
var templateList = document.querySelector('.list-template__task-list');
var deleteIcon = document.querySelector('.delete-icon');
var deleteIconTemplate = document.querySelector('.delete-icon--template');
var taskReadyArr = [].slice.call(taskList.querySelectorAll('.task__ready'));


var storage = localStorage;

let startList = {
  "Начать делать презентацию": "work",
  "Заплатить за аренду": "personal",
  "Купить молоко": "shopping",
  "Не забыть забрать Мишу со школы": "family",
  "Купить шоколад Маше": "shopping"
};

var dataList = Object.assign(startList);

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


// ПРИ УДАЛЕНИИ ТАСКА УДАЛЯЕТСЯ ЗАПИСЬ В localStorage
  var taskDoneTextArr = [];
  for(let i = 0; i < taskDoneArr.length; i++) {
    taskDoneTextArr[i] = taskDoneArr[i].lastChild.textContent;
  }
 

  let storageObj = JSON.parse(storage.data);
 

  for (let index = 0; index < taskDoneTextArr.length; index++) {
    if (storageObj.hasOwnProperty(taskDoneTextArr[index]) ) {
      delete storageObj[taskDoneTextArr[index]];
    }
    
  }

  storage.data = JSON.stringify(storageObj);

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
  let categoryName = newTaskScreen.querySelector('.new-task__cat-item input:checked').value;
  var dataNewList = {};

  for (var i = 0; i < allNewItems.length; i++) {
    if (allNewItems[i].value) {
      dataNewList[allNewItems[i].value] = categoryName;
    }
    
  }

  let finalList = Object.assign(dataList, dataNewList);

  storage.data = JSON.stringify(finalList);
  newTaskScreen.classList.add('new-task--hide');
  renderMainList(JSON.parse(storage.data));
  updateData();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1saXN0Jyk7XHJcbnZhciB0ZW1wbGF0ZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1saXN0Jyk7XHJcbnZhciBkZWxldGVJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1pY29uJyk7XHJcbnZhciBkZWxldGVJY29uVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24tLXRlbXBsYXRlJyk7XHJcbnZhciB0YXNrUmVhZHlBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrX19yZWFkeScpKTtcclxuXHJcblxyXG52YXIgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuXHJcbmxldCBzdGFydExpc3QgPSB7XHJcbiAgXCLQndCw0YfQsNGC0Ywg0LTQtdC70LDRgtGMINC/0YDQtdC30LXQvdGC0LDRhtC40Y5cIjogXCJ3b3JrXCIsXHJcbiAgXCLQl9Cw0L/Qu9Cw0YLQuNGC0Ywg0LfQsCDQsNGA0LXQvdC00YNcIjogXCJwZXJzb25hbFwiLFxyXG4gIFwi0JrRg9C/0LjRgtGMINC80L7Qu9C+0LrQvlwiOiBcInNob3BwaW5nXCIsXHJcbiAgXCLQndC1INC30LDQsdGL0YLRjCDQt9Cw0LHRgNCw0YLRjCDQnNC40YjRgyDRgdC+INGI0LrQvtC70YtcIjogXCJmYW1pbHlcIixcclxuICBcItCa0YPQv9C40YLRjCDRiNC+0LrQvtC70LDQtCDQnNCw0YjQtVwiOiBcInNob3BwaW5nXCJcclxufTtcclxuXHJcbnZhciBkYXRhTGlzdCA9IE9iamVjdC5hc3NpZ24oc3RhcnRMaXN0KTtcclxuXHJcbnN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGFMaXN0KTtcclxuXHJcblxyXG4vLyDQpNCe0KDQnNCY0KDQntCS0JDQndCY0JUg0KHQotCQ0KDQotCe0JLQntCT0J4g0KHQn9CY0KHQmtCQXHJcblxyXG52YXIgcmVuZGVyTWFpbkxpc3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICBmb3IgKGtleSBpbiBvYmopIHtcclxuXHJcbiAgICB2YXIgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stLScgKyBvYmpba2V5XSk7XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtUmVhZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tJdGVtUmVhZHkuY2xhc3NMaXN0LmFkZCgndGFza19fcmVhZHknKTtcclxuICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tJdGVtUmVhZHkpO1xyXG5cclxuICAgIHZhciB0YXNrSXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0YXNrSXRlbVRleHQuY2xhc3NMaXN0LmFkZCgndGFza19fdGV4dCcpO1xyXG4gICAgdGFza0l0ZW1UZXh0LnRleHRDb250ZW50ID0ga2V5O1xyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW1UZXh0KTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbiAgfVxyXG5cclxuICB0YXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG59O1xyXG5cclxucmVuZGVyTWFpbkxpc3QoSlNPTi5wYXJzZShzdG9yYWdlLmRhdGEpKTtcclxuXHJcblxyXG5cclxuXHJcbi8vINCT0JDQm9Ce0KfQmtCQINCYINCX0JDQp9CV0KDQmtCY0JLQkNCd0JjQlSDQotCQ0KHQmtCQXHJcblxyXG52YXIgZG9uZU1hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza19fcmVhZHktLWRvbmUnKTtcclxuXHJcbmlmIChkb25lTWFyaykge1xyXG4gIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxufVxyXG5cclxuXHJcbnZhciBvblRhc2tEb25lID0gZnVuY3Rpb24gKHdyYXBwZXJOb2RlKSB7XHJcblxyXG4gIHdyYXBwZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINC60LDQu9C+0YfQutC4INGC0LDRgdC60LBcclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2tfX3JlYWR5JykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fcmVhZHktLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX3RleHQtLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrLS1kb25lJyk7XHJcblxyXG4gICAgICAvLyDQn9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQv9GA0Lgg0LLRi9Cx0L7RgNC1INGC0LDRgdC60LBcclxuICAgICAgdmFyIGRvbmVNYXJrID0gd3JhcHBlck5vZGUucXVlcnlTZWxlY3RvcignLnRhc2tfX3JlYWR5LS1kb25lJyk7XHJcblxyXG4gICAgICBpZiAoZG9uZU1hcmspIHtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbm9uVGFza0RvbmUodGFza0xpc3QpO1xyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0KPQlNCQ0JvQldCd0JjQlSDQotCQ0KHQmtCQXHJcblxyXG5cclxuZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgdmFyIHRhc2tEb25lQXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay0tZG9uZScpKTtcclxuXHJcblxyXG4vLyDQn9Cg0Jgg0KPQlNCQ0JvQldCd0JjQmCDQotCQ0KHQmtCQINCj0JTQkNCb0K/QldCi0KHQryDQl9CQ0J/QmNCh0Kwg0JIgbG9jYWxTdG9yYWdlXHJcbiAgdmFyIHRhc2tEb25lVGV4dEFyciA9IFtdO1xyXG4gIGZvcihsZXQgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFza0RvbmVUZXh0QXJyW2ldID0gdGFza0RvbmVBcnJbaV0ubGFzdENoaWxkLnRleHRDb250ZW50O1xyXG4gIH1cclxuIFxyXG5cclxuICBsZXQgc3RvcmFnZU9iaiA9IEpTT04ucGFyc2Uoc3RvcmFnZS5kYXRhKTtcclxuIFxyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFza0RvbmVUZXh0QXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgaWYgKHN0b3JhZ2VPYmouaGFzT3duUHJvcGVydHkodGFza0RvbmVUZXh0QXJyW2luZGV4XSkgKSB7XHJcbiAgICAgIGRlbGV0ZSBzdG9yYWdlT2JqW3Rhc2tEb25lVGV4dEFycltpbmRleF1dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBzdG9yYWdlLmRhdGEgPSBKU09OLnN0cmluZ2lmeShzdG9yYWdlT2JqKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFza0RvbmVBcnJbaV0ucmVtb3ZlKCk7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGRlbGV0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuLy8gYnRuLXBsdXNcclxuXHJcbnZhciBmb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2J0bicpO1xyXG52YXIgYnRuTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGVfX2l0ZW1zJyk7XHJcbnZhciBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuXHJcbmZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICBmb3JtQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2J0bi0tYWN0aXZlJyk7XHJcbiAgYnRuTGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdjcmVhdGVfX2l0ZW1zLS1hY3RpdmUnKTtcclxuICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ292ZXJsYXktLWFjdGl2ZScpO1xyXG59KTtcclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcblxyXG4vLyBsaXN0LXRlbXBsYXRlXHJcblxyXG4vLyDQodCe0JfQlNCQ0J3QmNCVINCX0JDQk9Ce0JvQntCS0JrQkCDQmCDQptCS0JXQotCQINCa0JDQoNCi0J7Qp9Ca0JhcclxudmFyIGxpc3RUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlJyk7XHJcbnZhciB0ZW1wbGF0ZVRpdGlsZSA9IGxpc3RUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGl0bGUnKTtcclxudmFyIHRlbXBsYXRlQ291bnQgPSBsaXN0VGVtcGxhdGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX2NvdW50Jyk7XHJcblxyXG4vLyB0ZW1wbGF0ZS1saXN0XHJcbnZhciB0ZW1wbGF0ZVRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stbGlzdCcpO1xyXG52YXIgdGVtcGxhdGVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stLXRlbXBsYXRlJyk7XHJcbnZhciB0ZW1wbGF0ZVJlYWR5ID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXJlYWR5Jyk7XHJcbnZhciB0ZW1wbGF0ZVRleHQgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stdGV4dCcpO1xyXG52YXIgdGVtcGxhdGVEYXRlID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3Rhc2tfX2RhdGUnKTtcclxuXHJcblxyXG52YXIgY2F0ZWdvcnlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGVnb3J5X19saXN0Jyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxudmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oZSl7XHJcbiAgdmFyIHRhcmcgPSBlLnRhcmdldDtcclxuXHJcbiAgLy8g0YTQuNC60YEg0LLRi9Cx0L7RgNCwINC60LDRgNGC0L7Rh9C60LhcclxuICBpZiAoZS50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnTEknKSB7XHJcbiAgIHRhcmcgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcblxyXG5cclxuICAvLyDQv9C+0LvRg9GH0LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YLQtdCz0L7RgNC40LhcclxuICB2YXIgY29sb3JUYXJnZXQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmcpLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICB2YXIgdGl0bGVUYXJnZXQgPSB0YXJnLmZpcnN0RWxlbWVudENoaWxkLmlubmVyVGV4dDtcclxuICB2YXIgY291bnRlclRhcmdldCA9IHRhcmcubGFzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcblxyXG5cclxuICAvL9C30LDQtNCw0LTQuNC8INGG0LLQtdGCLCDQt9Cw0LPQvtC70L7QstC+0LosINGB0YfQtdGC0YfQuNC6INC60LDRgNGC0L7Rh9C60LhcclxuICBsaXN0VGVtcGxhdGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUYXJnZXQ7XHJcbiAgdGVtcGxhdGVUaXRpbGUudGV4dENvbnRlbnQgPSAgdGl0bGVUYXJnZXQ7XHJcbiAgdGVtcGxhdGVDb3VudC50ZXh0Q29udGVudCA9IGNvdW50ZXJUYXJnZXQ7XHJcblxyXG5cclxuXHJcbiAgLy8gXHJcbiAgLy8gXHJcblxyXG4gIC8vINGB0L7QsdC10YDQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXHJcbiAgdmFyIGlkQ2F0ZWdvcnkgPSB0YXJnLmlkLnNsaWNlKDQpO1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW0oKSB7XHJcblxyXG4gICAgdmFyIHRlbXBsYXRlVGFza0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stLScgKyBpZENhdGVnb3J5KSk7XHJcblxyXG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZVRhc2tBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrJyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtUmVhZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbVJlYWR5LmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtUmVhZHkpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBuZXdJdGVtVGV4dC5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXRleHQnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtVGV4dCk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG5ld0l0ZW1EYXRlLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stZGF0ZScpO1xyXG4gICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKG5ld0l0ZW1EYXRlKTtcclxuICAgICAgbmV3SXRlbVRleHQudGV4dENvbnRlbnQgPSB0ZW1wbGF0ZVRhc2tBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5pbm5lckhUTUw9ICcnO1xyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlVGFza0VsZW0oKTtcclxuICBcclxuXHJcbiAgXHJcbn07XHJcblxyXG5jYXRlZ29yeUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XHJcblxyXG5vblRhc2tEb25lKHRlbXBsYXRlVGFza0xpc3QpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vINCT0LDQu9C+0YfQutCwINC4INC/0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INCyINC60LDRgNGC0L7Rh9C60LVcclxuXHJcbnZhciBvblRhc2tEb25lVGVtcGxhdGUgPSBmdW5jdGlvbiAod3JhcHBlck5vZGUpIHtcclxuXHJcbiAgd3JhcHBlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0LrQsNC70L7Rh9C60Lgg0YLQsNGB0LrQsFxyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeScpKSB7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHktLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stdGV4dC0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stLWRvbmUnKTtcclxuXHJcbiAgICAgIC8vINCf0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INC/0YDQuCDQstGL0LHQvtGA0LUg0YLQsNGB0LrQsFxyXG4gICAgICB2YXIgZG9uZU1hcmsgPSB3cmFwcGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeS0tZG9uZScpO1xyXG5cclxuICAgICAgaWYgKGRvbmVNYXJrKSB7XHJcbiAgICAgICAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICB9KTtcclxufVxyXG5cclxub25UYXNrRG9uZVRlbXBsYXRlKHRlbXBsYXRlTGlzdCk7XHJcblxyXG4vLyDQo9CU0JDQm9CV0J3QmNCVINCi0JDQodCa0JAg0JIg0JrQkNCg0KLQntCn0JrQlVxyXG5cclxuZGVsZXRlSWNvblRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgdGFza0RvbmVBcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0LXRlbXBsYXRlX190YXNrLS1kb25lJykpO1xyXG5cclxuICB2YXIgdGV4dENvbnRlbnRBcnIgPSBbXTtcclxuICBcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0ZXh0Q29udGVudEFycltpXSA9IHRhc2tEb25lQXJyW2ldLnRleHRDb250ZW50O1xyXG4gICAgdGFza0RvbmVBcnJbaV0ucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyh0ZXh0Q29udGVudEFycik7XHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGFza3NBcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgaWYgKHRhc2tzQXJyW2tdLnRleHRDb250ZW50ID09PSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIHRhc2tzQXJyW2tdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy8g0JrQntCb0JjQp9CV0KHQotCS0J4g0JfQkNCU0JDQp1xyXG4gXHJcblxyXG5cclxudmFyIHVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0YHQvtCx0LXRgNC10Lwg0Lgg0YHQs9GA0YPQv9C40YDRg9C10Lwg0YLQsNGB0LrQuCDQv9C+INC60LDRgtC10LPQvtGA0LjRj9C8INCyINC+0LHRjNC10LrRglxyXG5cclxuICB2YXIgdGFza3NBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0FyciA9IFtdLnNsaWNlLmNhbGwoY2F0ZWdvcnlMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeV9faXRlbScpKTtcclxuXHJcbiAgdmFyIGNhdGVnb3JpZXNJZE9iaiA9IHt9O1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0ZWdvcmllc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY2F0ZWdvcmllc0lkT2JqW2NhdGVnb3JpZXNBcnJbaV0uaWQuc2xpY2UoNCldID0gMDtcclxuICB9XHJcbiAgXHJcblxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQn9Ce0JTQodCn0JXQoiDQotCQ0KHQmtCe0JIg0J/QniDQmtCQ0KLQldCT0J7QoNCY0K/QnFxyXG5cclxuICB2YXIgY291bnRUYXNrcyA9IGZ1bmN0aW9uIChhcnJheSwgb2JqKSB7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIFxyXG4gICAgICBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13b3JrJykpIHtcclxuICAgICAgICBvYmoud29yaysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tcGVyc29uYWwnKSl7XHJcbiAgICAgICAgb2JqLnBlcnNvbmFsKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1zaG9wcGluZycpKXtcclxuICAgICAgICBvYmouc2hvcHBpbmcrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWZhbWlseScpKXtcclxuICAgICAgICBvYmouZmFtaWx5Kys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13YXJuaW5nJykpe1xyXG4gICAgICAgIG9iai53YXJuaW5nKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICB2YXIgcmVzdWwgPSBjb3VudFRhc2tzKHRhc2tzQXJyLCBjYXRlZ29yaWVzSWRPYmopO1xyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQntCa0J7QndCn0JDQndCY0JUg0KHQm9Ce0JLQkCBcItCX0JDQlNCQ0KfQkFwiXHJcblxyXG4gIHZhciBjb21iaWVuZFRhc2tXb3JkcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFxyXG4gICAgdmFyIGN1cnJlbnRWYWx1ZUNvdW50ZXI7XHJcbiAgICB2YXIgcENvdW50ZXI7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgcENvdW50ZXIgPSBjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvcignI2NhdF8nICsga2V5ICsgJyAuY2F0ZWdvcnlfX2NvdW50Jyk7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPSBvYmpba2V5XSA7XHJcbiAgICAgIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gJ9Cd0LXRgiDQt9Cw0LTQsNGHJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDEpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQsCc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID49IDIgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSA0KXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gNSAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDIwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRhyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb21iaWVuZFRhc2tXb3JkcyhyZXN1bCk7XHJcblxyXG59XHJcblxyXG51cGRhdGVEYXRhKCk7XHJcbiAgXHJcbiAgXHJcbi8vINCe0KLQoNCY0KHQntCS0JrQkCDQntCa0J3QkCDQndCe0JLQntCT0J4g0KLQkNCh0JrQkCBcclxuXHJcbnZhciBjcmVhdGVOZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyDQvtC60L3QvlxyXG4gIHZhciBuZXdUYXNrV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3VGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG5cclxuLy8g0LrQvdC+0L/QutC4INC+0YLQvNC10L3QsCDQuCDQs9C+0YLQvtCy0L4gXHJcbiAgdmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdmFyIGJ0bkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5DYW5jZWwpO1xyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuRG9uZSk7XHJcblxyXG4vLyDRgdC/0LjRgdC+0Lot0L7QsdC10YDRgtC60LAg0Lgg0L7QtNC40L0g0YLQsNGB0LpcclxuICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0RvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0RvbmUpO1xyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tJbnB1dCk7XHJcbiAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFza0l0ZW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0J3QntCS0J7Qk9CeINCY0J3Qn9Cj0KLQkCDQlNCb0K8g0JfQkNCf0JjQodCYXHJcblxyXG52YXIgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHJcbiAgdmFyIG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBuZXdMaS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19faXRlbScpO1xyXG4gIHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX3JlYWR5Jyk7XHJcbiAgdmFyIG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuZXdJbnB1dC5pZCA9ICduZXctdGFzay0nICsgY3VycmVudDtcclxuICBuZXdJbnB1dC5uYW1lID0gJ25ldy10YXNrJztcclxuICBuZXdJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gIG5ld0lucHV0LnBsYWNlaG9sZGVyID0gJ9Cn0YLQviDQvdGD0LbQvdC+INGB0LTQtdC70LDRgtGMID8nO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3SW5wdXQpO1xyXG5cclxuICByZXR1cm4gbmV3TGk7XHJcblxyXG59O1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxudmFyIHJlbW92ZUlucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoIWUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBlLnRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbnB1dE5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgaXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbnZhciBjdXJyZW50SXRlbSA9IDE7XHJcblxyXG52YXIgYXBwZW5kSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgIWUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fbGlzdCcpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN1cnJlbnRJdGVtID0gKytjdXJyZW50SXRlbTtcclxuICAgICAgdmFyIG5ld0l0ZW1UZW1wbGF0ZSA9IGNyZWF0ZVRhc2soY3VycmVudEl0ZW0pO1xyXG4gICAgICBcclxuICAgICAgbmV3SXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW1UZW1wbGF0ZSk7XHJcbiAgICAgIHZhciB0YWJJdGVtbSA9IG5ld1Rhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0nICsgY3VycmVudEl0ZW0pO1xyXG4gICAgICB0YWJJdGVtbS5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZS50YXJnZXQudmFsdWUgPT0gMCApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gMCAmJiBlLmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbml0ZW1UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG5cclxuLy9cclxuXHJcbnZhciBuZXdUYXNrU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyk7XHJcbnZhciBmaXJzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLTEnKTtcclxudmFyIHRhc2tCdG5Eb25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19idG4tLWRvbmUnKTtcclxudmFyIHRhc2tCdG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2J0bi0tY2FuY2VsJyk7XHJcblxyXG4vL9Cf0J7Qr9CS0JvQldCd0JjQlSDQmCDQodCa0KDQq9Ci0JjQlSDQmtCd0J7Qn9Ca0JggXCLQk9Ce0KLQntCS0J5cIlxyXG5cclxuZmlyc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICB0YXNrQnRuRG9uZS5jbGFzc0xpc3QucmVtb3ZlKCduZXctdGFza19fYnRuLS1oaWRlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhc2tCdG5Eb25lLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19idG4tLWhpZGUnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbnRhc2tCdG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG50YXNrQnRuRG9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXHJcblxyXG4gIHZhciBhbGxOZXdJdGVtcyA9IG5ld1Rhc2tTY3JlZW4ucXVlcnlTZWxlY3RvckFsbCgnLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbiAgbGV0IGNhdGVnb3J5TmFtZSA9IG5ld1Rhc2tTY3JlZW4ucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19jYXQtaXRlbSBpbnB1dDpjaGVja2VkJykudmFsdWU7XHJcbiAgdmFyIGRhdGFOZXdMaXN0ID0ge307XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTmV3SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChhbGxOZXdJdGVtc1tpXS52YWx1ZSkge1xyXG4gICAgICBkYXRhTmV3TGlzdFthbGxOZXdJdGVtc1tpXS52YWx1ZV0gPSBjYXRlZ29yeU5hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGxldCBmaW5hbExpc3QgPSBPYmplY3QuYXNzaWduKGRhdGFMaXN0LCBkYXRhTmV3TGlzdCk7XHJcblxyXG4gIHN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGZpbmFsTGlzdCk7XHJcbiAgbmV3VGFza1NjcmVlbi5jbGFzc0xpc3QuYWRkKCduZXctdGFzay0taGlkZScpO1xyXG4gIHJlbmRlck1haW5MaXN0KEpTT04ucGFyc2Uoc3RvcmFnZS5kYXRhKSk7XHJcbiAgdXBkYXRlRGF0YSgpO1xyXG59KTsiXSwiZmlsZSI6InRhc2stbWFyay1hbmltYXRlLmpzIn0=
