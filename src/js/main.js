const taskList = document.querySelector('.task-list');
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

})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIGRlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24nKTtcclxudmFyIGRlbGV0ZUljb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbi0tdGVtcGxhdGUnKTtcclxudmFyIHRhc2tSZWFkeUFyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfX3JlYWR5JykpO1xyXG5cclxuXHJcbnZhciBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG5cclxudmFyIGRhdGFMaXN0ID0ge1xyXG4gIFwi0J3QsNGH0LDRgtGMINC00LXQu9Cw0YLRjCDQv9GA0LXQt9C10L3RgtCw0YbQuNGOXCI6IFwid29ya1wiLFxyXG4gIFwi0JfQsNC/0LvQsNGC0LjRgtGMINC30LAg0LDRgNC10L3QtNGDXCI6IFwicGVyc29uYWxcIixcclxuICBcItCa0YPQv9C40YLRjCDQvNC+0LvQvtC60L5cIjogXCJzaG9wcGluZ1wiLFxyXG4gIFwi0J3QtSDQt9Cw0LHRi9GC0Ywg0LfQsNCx0YDQsNGC0Ywg0JzQuNGI0YMg0YHQviDRiNC60L7Qu9GLXCI6IFwiZmFtaWx5XCIsXHJcbiAgXCLQmtGD0L/QuNGC0Ywg0YjQvtC60L7Qu9Cw0LQg0JzQsNGI0LVcIjogXCJzaG9wcGluZ1wiXHJcblxyXG59O1xyXG5cclxuc3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YUxpc3QpO1xyXG5cclxuXHJcbi8vINCk0J7QoNCc0JjQoNCe0JLQkNCd0JjQlSDQodCi0JDQoNCi0J7QktCe0JPQniDQodCf0JjQodCa0JBcclxuXHJcbnZhciByZW5kZXJNYWluTGlzdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gIGZvciAoa2V5IGluIG9iaikge1xyXG5cclxuICAgIHZhciB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay0tJyArIG9ialtrZXldKTtcclxuXHJcbiAgICB2YXIgdGFza0l0ZW1SZWFkeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0l0ZW1SZWFkeS5jbGFzc0xpc3QuYWRkKCd0YXNrX19yZWFkeScpO1xyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW1SZWFkeSk7XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRhc2tJdGVtVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrX190ZXh0Jyk7XHJcbiAgICB0YXNrSXRlbVRleHQudGV4dENvbnRlbnQgPSBrZXk7XHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbVRleHQpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcclxuICB9XHJcblxyXG4gIHRhc2tMaXN0LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHJcbn07XHJcblxyXG5yZW5kZXJNYWluTGlzdChKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSkpO1xyXG5cclxuXHJcblxyXG5cclxuLy8g0JPQkNCb0J7Qp9Ca0JAg0Jgg0JfQkNCn0JXQoNCa0JjQktCQ0J3QmNCVINCi0JDQodCa0JBcclxuXHJcbnZhciBkb25lTWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX19yZWFkeS0tZG9uZScpO1xyXG5cclxuaWYgKGRvbmVNYXJrKSB7XHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG59XHJcblxyXG5cclxudmFyIG9uVGFza0RvbmUgPSBmdW5jdGlvbiAod3JhcHBlck5vZGUpIHtcclxuXHJcbiAgd3JhcHBlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0LrQsNC70L7Rh9C60Lgg0YLQsNGB0LrQsFxyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFza19fcmVhZHknKSkge1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fdGV4dC0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2stLWRvbmUnKTtcclxuXHJcbiAgICAgIC8vINCf0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INC/0YDQuCDQstGL0LHQvtGA0LUg0YLQsNGB0LrQsFxyXG4gICAgICB2YXIgZG9uZU1hcmsgPSB3cmFwcGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcudGFza19fcmVhZHktLWRvbmUnKTtcclxuXHJcbiAgICAgIGlmIChkb25lTWFyaykge1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICB9KTtcclxufVxyXG5cclxub25UYXNrRG9uZSh0YXNrTGlzdCk7XHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQo9CU0JDQm9CV0J3QmNCVINCi0JDQodCa0JBcclxuXHJcblxyXG5kZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgdGFza0RvbmVBcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS1kb25lJykpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuICB1cGRhdGVEYXRhKCk7XHJcblxyXG59KTtcclxuXHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG4vLyBidG4tcGx1c1xyXG5cclxudmFyIGZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnRuJyk7XHJcbnZhciBidG5MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZV9faXRlbXMnKTtcclxudmFyIG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG5cclxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gIGZvcm1CdG4uY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fYnRuLS1hY3RpdmUnKTtcclxuICBidG5MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NyZWF0ZV9faXRlbXMtLWFjdGl2ZScpO1xyXG4gIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnb3ZlcmxheS0tYWN0aXZlJyk7XHJcbn0pO1xyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuXHJcbi8vIGxpc3QtdGVtcGxhdGVcclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0JfQkNCT0J7Qm9Ce0JLQmtCQINCYINCm0JLQldCi0JAg0JrQkNCg0KLQntCn0JrQmFxyXG52YXIgbGlzdFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlVGl0aWxlID0gbGlzdFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190aXRsZScpO1xyXG52YXIgdGVtcGxhdGVDb3VudCA9IGxpc3RUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fY291bnQnKTtcclxuXHJcbi8vIHRlbXBsYXRlLWxpc3RcclxudmFyIHRlbXBsYXRlVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1saXN0Jyk7XHJcbnZhciB0ZW1wbGF0ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlUmVhZHkgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxudmFyIHRlbXBsYXRlVGV4dCA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbnZhciB0ZW1wbGF0ZURhdGUgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcigndGFza19fZGF0ZScpO1xyXG5cclxuXHJcbnZhciBjYXRlZ29yeUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnlfX2xpc3QnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG52YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihlKXtcclxuICB2YXIgdGFyZyA9IGUudGFyZ2V0O1xyXG5cclxuICAvLyDRhNC40LrRgSDQstGL0LHQvtGA0LAg0LrQsNGA0YLQvtGH0LrQuFxyXG4gIGlmIChldmVudC50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnTEknKSB7XHJcbiAgIHRhcmcgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgXHJcblxyXG5cclxuXHJcbiAgLy8g0L/QvtC70YPRh9C40Lwg0YbQstC10YIsINC30LDQs9C+0LvQvtCy0L7Quiwg0YHRh9C10YLRh9C40Log0LrQsNGC0LXQs9C+0YDQuNC4XHJcbiAgdmFyIGNvbG9yVGFyZ2V0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgdmFyIHRpdGxlVGFyZ2V0ID0gdGFyZy5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcbiAgdmFyIGNvdW50ZXJUYXJnZXQgPSB0YXJnLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0O1xyXG5cclxuXHJcbiAgLy/Qt9Cw0LTQsNC00LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YDRgtC+0YfQutC4XHJcbiAgbGlzdFRlbXBsYXRlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yVGFyZ2V0O1xyXG4gIHRlbXBsYXRlVGl0aWxlLnRleHRDb250ZW50ID0gIHRpdGxlVGFyZ2V0O1xyXG4gIHRlbXBsYXRlQ291bnQudGV4dENvbnRlbnQgPSBjb3VudGVyVGFyZ2V0O1xyXG5cclxuXHJcblxyXG4gIC8vIFxyXG4gIC8vIFxyXG5cclxuICAvLyDRgdC+0LHQtdGA0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xyXG4gIHZhciBpZENhdGVnb3J5ID0gdGFyZy5pZC5zbGljZSg0KTtcclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtKCkge1xyXG5cclxuICAgIHZhciB0ZW1wbGF0ZVRhc2tBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS0nICsgaWRDYXRlZ29yeSkpO1xyXG5cclxuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVUYXNrQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzaycpO1xyXG4gICAgICBuZXdJdGVtLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stLXRlbXBsYXRlJyk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbVJlYWR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW1SZWFkeS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVJlYWR5KTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgbmV3SXRlbVRleHQuY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVRleHQpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1EYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBuZXdJdGVtRGF0ZS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLWRhdGUnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtRGF0ZSk7XHJcbiAgICAgIG5ld0l0ZW1UZXh0LnRleHRDb250ZW50ID0gdGVtcGxhdGVUYXNrQXJyW2ldLnRleHRDb250ZW50O1xyXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuaW5uZXJIVE1MPSAnJztcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZVRhc2tFbGVtKCk7XHJcbiAgXHJcblxyXG4gIFxyXG59O1xyXG5cclxuY2F0ZWdvcnlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xyXG5cclxub25UYXNrRG9uZSh0ZW1wbGF0ZVRhc2tMaXN0KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0JPQsNC70L7Rh9C60LAg0Lgg0L/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0LIg0LrQsNGA0YLQvtGH0LrQtVxyXG5cclxudmFyIG9uVGFza0RvbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uICh3cmFwcGVyTm9kZSkge1xyXG5cclxuICB3cmFwcGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDQutCw0LvQvtGH0LrQuCDRgtCw0YHQutCwXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5JykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tZG9uZScpO1xyXG5cclxuICAgICAgLy8g0J/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0L/RgNC4INCy0YvQsdC+0YDQtSDRgtCw0YHQutCwXHJcbiAgICAgIHZhciBkb25lTWFyayA9IHdyYXBwZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXJlYWR5LS1kb25lJyk7XHJcblxyXG4gICAgICBpZiAoZG9uZU1hcmspIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gIH0pO1xyXG59XHJcblxyXG5vblRhc2tEb25lVGVtcGxhdGUodGVtcGxhdGVMaXN0KTtcclxuXHJcbi8vINCj0JTQkNCb0JXQndCY0JUg0KLQkNCh0JrQkCDQkiDQmtCQ0KDQotCe0KfQmtCVXHJcblxyXG5kZWxldGVJY29uVGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIHZhciB0YXNrRG9uZUFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdGVtcGxhdGVfX3Rhc2stLWRvbmUnKSk7XHJcblxyXG4gIHZhciB0ZXh0Q29udGVudEFyciA9IFtdO1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRleHRDb250ZW50QXJyW2ldID0gdGFza0RvbmVBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5kaXIodGV4dENvbnRlbnRBcnIpO1xyXG5cclxuXHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIFxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGFza3NBcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgaWYgKHRhc2tzQXJyW2tdLnRleHRDb250ZW50ID09PSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIHRhc2tzQXJyW2tdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy8g0JrQntCb0JjQp9CV0KHQotCS0J4g0JfQkNCU0JDQp1xyXG4gXHJcblxyXG5cclxudmFyIHVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0YHQvtCx0LXRgNC10Lwg0Lgg0YHQs9GA0YPQv9C40YDRg9C10Lwg0YLQsNGB0LrQuCDQv9C+INC60LDRgtC10LPQvtGA0LjRj9C8INCyINC+0LHRjNC10LrRglxyXG5cclxuICB2YXIgdGFza3NBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0FyciA9IFtdLnNsaWNlLmNhbGwoY2F0ZWdvcnlMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeV9faXRlbScpKTtcclxuXHJcbiAgdmFyIGNhdGVnb3JpZXNJZE9iaiA9IHt9O1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0ZWdvcmllc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY2F0ZWdvcmllc0lkT2JqW2NhdGVnb3JpZXNBcnJbaV0uaWQuc2xpY2UoNCldID0gMDtcclxuICB9XHJcbiAgXHJcblxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQn9Ce0JTQodCn0JXQoiDQotCQ0KHQmtCe0JIg0J/QniDQmtCQ0KLQldCT0J7QoNCY0K/QnFxyXG5cclxuICB2YXIgY291bnRUYXNrcyA9IGZ1bmN0aW9uIChhcnJheSwgb2JqKSB7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIFxyXG4gICAgICBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13b3JrJykpIHtcclxuICAgICAgICBvYmoud29yaysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tcGVyc29uYWwnKSl7XHJcbiAgICAgICAgb2JqLnBlcnNvbmFsKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1zaG9wcGluZycpKXtcclxuICAgICAgICBvYmouc2hvcHBpbmcrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWZhbWlseScpKXtcclxuICAgICAgICBvYmouZmFtaWx5Kys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13YXJuaW5nJykpe1xyXG4gICAgICAgIG9iai53YXJuaW5nKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICB2YXIgcmVzdWwgPSBjb3VudFRhc2tzKHRhc2tzQXJyLCBjYXRlZ29yaWVzSWRPYmopO1xyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQntCa0J7QndCn0JDQndCY0JUg0KHQm9Ce0JLQkCBcItCX0JDQlNCQ0KfQkFwiXHJcblxyXG4gIHZhciBjb21iaWVuZFRhc2tXb3JkcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFxyXG4gICAgdmFyIGN1cnJlbnRWYWx1ZUNvdW50ZXI7XHJcbiAgICB2YXIgcENvdW50ZXI7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgcENvdW50ZXIgPSBjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvcignI2NhdF8nICsga2V5ICsgJyAuY2F0ZWdvcnlfX2NvdW50Jyk7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPSBvYmpba2V5XSA7XHJcbiAgICAgIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gJ9Cd0LXRgiDQt9Cw0LTQsNGHJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDEpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQsCc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID49IDIgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSA0KXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gNSAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDIwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRhyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb21iaWVuZFRhc2tXb3JkcyhyZXN1bCk7XHJcblxyXG59XHJcblxyXG51cGRhdGVEYXRhKCk7XHJcbiAgXHJcbiAgXHJcbi8vINCe0KLQoNCY0KHQntCS0JrQkCDQntCa0J3QkCDQndCe0JLQntCT0J4g0KLQkNCh0JrQkCBcclxuXHJcbnZhciBjcmVhdGVOZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyDQvtC60L3QvlxyXG4gIHZhciBuZXdUYXNrV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3VGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG5cclxuLy8g0LrQvdC+0L/QutC4INC+0YLQvNC10L3QsCDQuCDQs9C+0YLQvtCy0L4gXHJcbiAgdmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdmFyIGJ0bkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5DYW5jZWwpO1xyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuRG9uZSk7XHJcblxyXG4vLyDRgdC/0LjRgdC+0Lot0L7QsdC10YDRgtC60LAg0Lgg0L7QtNC40L0g0YLQsNGB0LpcclxuICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0RvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0RvbmUpO1xyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tJbnB1dCk7XHJcbiAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFza0l0ZW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0J3QntCS0J7Qk9CeINCY0J3Qn9Cj0KLQkCDQlNCb0K8g0JfQkNCf0JjQodCYXHJcblxyXG52YXIgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHJcbiAgdmFyIG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBuZXdMaS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19faXRlbScpO1xyXG4gIHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX3JlYWR5Jyk7XHJcbiAgdmFyIG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuZXdJbnB1dC5pZCA9ICduZXctdGFzay0nICsgY3VycmVudDtcclxuICBuZXdJbnB1dC5uYW1lID0gJ25ldy10YXNrJztcclxuICBuZXdJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gIG5ld0lucHV0LnBsYWNlaG9sZGVyID0gJ9Cn0YLQviDQvdGD0LbQvdC+INGB0LTQtdC70LDRgtGMID8nO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3SW5wdXQpO1xyXG5cclxuICByZXR1cm4gbmV3TGk7XHJcblxyXG59O1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxudmFyIHJlbW92ZUlucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoIWUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBlLnRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbnB1dE5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgaXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbnZhciBjdXJyZW50SXRlbSA9IDE7XHJcblxyXG52YXIgYXBwZW5kSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgIWUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fbGlzdCcpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN1cnJlbnRJdGVtID0gKytjdXJyZW50SXRlbTtcclxuICAgICAgdmFyIG5ld0l0ZW1UZW1wbGF0ZSA9IGNyZWF0ZVRhc2soY3VycmVudEl0ZW0pO1xyXG4gICAgICBcclxuICAgICAgbmV3SXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW1UZW1wbGF0ZSk7XHJcbiAgICAgIHZhciB0YWJJdGVtbSA9IG5ld1Rhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0nICsgY3VycmVudEl0ZW0pO1xyXG4gICAgICB0YWJJdGVtbS5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZS50YXJnZXQudmFsdWUgPT0gMCApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gMCAmJiBlLmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbml0ZW1UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG5cclxuLy9cclxuXHJcbnZhciBuZXdUYXNrU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyk7XHJcbnZhciBmaXJzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLTEnKTtcclxudmFyIHRhc2tCdG5Eb25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19idG4tLWRvbmUnKTtcclxudmFyIHRhc2tCdG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2J0bi0tY2FuY2VsJyk7XHJcblxyXG4vL9Cf0J7Qr9CS0JvQldCd0JjQlSDQmCDQodCa0KDQq9Ci0JjQlSDQmtCd0J7Qn9Ca0JggXCLQk9Ce0KLQntCS0J5cIlxyXG5cclxuZmlyc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICB0YXNrQnRuRG9uZS5jbGFzc0xpc3QucmVtb3ZlKCduZXctdGFza19fYnRuLS1oaWRlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhc2tCdG5Eb25lLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19idG4tLWhpZGUnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbnRhc2tCdG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG50YXNrQnRuRG9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgXHJcblxyXG4gIHZhciBhbGxOZXdJdGVtcyA9IG5ld1Rhc2tTY3JlZW4ucXVlcnlTZWxlY3RvckFsbCgnLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbiAgdmFyIGN1cnJlbnRDYXRlZ29yeSA9IG5ld1Rhc2tTY3JlZW4ucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19jYXQtaXRlbSBpbnB1dDpjaGVja2VkJyk7XHJcbiAgdmFyIGNhdGVnb3J5TmFtZSA9IGN1cnJlbnRDYXRlZ29yeS52YWx1ZTtcclxuICB2YXIgZGF0YU5ld0xpc3QgPSB7fTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxOZXdJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFsbE5ld0l0ZW1zW2ldLnZhbHVlKSB7XHJcbiAgICAgIGRhdGFOZXdMaXN0W2FsbE5ld0l0ZW1zW2ldLnZhbHVlXSA9IGNhdGVnb3J5TmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuIFxyXG4gIHN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGFOZXdMaXN0KTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcbiAgcmVuZGVyTWFpbkxpc3QoSlNPTi5wYXJzZShzdG9yYWdlLmRhdGEpKTtcclxuXHJcbn0pIl0sImZpbGUiOiJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJ9
