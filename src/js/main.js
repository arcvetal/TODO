const taskList = document.querySelector('.task-list');
var templateList = document.querySelector('.list-template__task-list');
var deleteIcon = document.querySelector('.delete-icon');
var deleteIconTemplate = document.querySelector('.delete-icon--template');
var taskReadyArr = [].slice.call(taskList.querySelectorAll('.task__ready'));
const newTask = document.querySelector('.create__elems--task');


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
      dataNewList[allNewItems[i].value] = categoryName;
    }
    
  }

  let finalList = Object.assign(dataList, dataNewList);

  storage.data = JSON.stringify(finalList);
  newTaskScreen.classList.add('new-task--hide');
  renderMainList(JSON.parse(storage.data));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIGRlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24nKTtcclxudmFyIGRlbGV0ZUljb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbi0tdGVtcGxhdGUnKTtcclxudmFyIHRhc2tSZWFkeUFyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfX3JlYWR5JykpO1xyXG5jb25zdCBuZXdUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZV9fZWxlbXMtLXRhc2snKTtcclxuXHJcblxyXG52YXIgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuXHJcbmxldCBzdGFydExpc3QgPSB7XHJcbiAgXCLQndCw0YfQsNGC0Ywg0LTQtdC70LDRgtGMINC/0YDQtdC30LXQvdGC0LDRhtC40Y5cIjogXCJ3b3JrXCIsXHJcbiAgXCLQl9Cw0L/Qu9Cw0YLQuNGC0Ywg0LfQsCDQsNGA0LXQvdC00YNcIjogXCJwZXJzb25hbFwiLFxyXG4gIFwi0JrRg9C/0LjRgtGMINC80L7Qu9C+0LrQvlwiOiBcInNob3BwaW5nXCIsXHJcbiAgXCLQndC1INC30LDQsdGL0YLRjCDQt9Cw0LHRgNCw0YLRjCDQnNC40YjRgyDRgdC+INGI0LrQvtC70YtcIjogXCJmYW1pbHlcIixcclxuICBcItCa0YPQv9C40YLRjCDRiNC+0LrQvtC70LDQtCDQnNCw0YjQtVwiOiBcInNob3BwaW5nXCJcclxufTtcclxuXHJcbnZhciBkYXRhTGlzdCA9IE9iamVjdC5hc3NpZ24oc3RhcnRMaXN0KTtcclxuXHJcbnN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGFMaXN0KTtcclxuXHJcblxyXG4vLyDQpNCe0KDQnNCY0KDQntCS0JDQndCY0JUg0KHQotCQ0KDQotCe0JLQntCT0J4g0KHQn9CY0KHQmtCQXHJcblxyXG52YXIgcmVuZGVyTWFpbkxpc3QgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICBmb3IgKGtleSBpbiBvYmopIHtcclxuXHJcbiAgICB2YXIgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2stLScgKyBvYmpba2V5XSk7XHJcbiAgICB0YXNrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0ZWdvcnknLCBvYmpba2V5XSk7XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtUmVhZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tJdGVtUmVhZHkuY2xhc3NMaXN0LmFkZCgndGFza19fcmVhZHknKTtcclxuICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tJdGVtUmVhZHkpO1xyXG5cclxuICAgIHZhciB0YXNrSXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0YXNrSXRlbVRleHQuY2xhc3NMaXN0LmFkZCgndGFza19fdGV4dCcpO1xyXG4gICAgdGFza0l0ZW1UZXh0LnRleHRDb250ZW50ID0ga2V5O1xyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW1UZXh0KTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbiAgfVxyXG5cclxuICB0YXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblxyXG59O1xyXG5cclxucmVuZGVyTWFpbkxpc3QoSlNPTi5wYXJzZShzdG9yYWdlLmRhdGEpKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0JPQkNCb0J7Qp9Ca0JAg0Jgg0JfQkNCn0JXQoNCa0JjQktCQ0J3QmNCVINCi0JDQodCa0JBcclxuXHJcbnZhciBkb25lTWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX19yZWFkeS0tZG9uZScpO1xyXG5cclxuaWYgKGRvbmVNYXJrKSB7XHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG59XHJcblxyXG5cclxudmFyIG9uVGFza0RvbmUgPSBmdW5jdGlvbiAod3JhcHBlck5vZGUpIHtcclxuXHJcbiAgd3JhcHBlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0LrQsNC70L7Rh9C60Lgg0YLQsNGB0LrQsFxyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFza19fcmVhZHknKSkge1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fdGV4dC0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2stLWRvbmUnKTtcclxuXHJcbiAgICAgIC8vINCf0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INC/0YDQuCDQstGL0LHQvtGA0LUg0YLQsNGB0LrQsFxyXG4gICAgICB2YXIgZG9uZU1hcmsgPSB3cmFwcGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcudGFza19fcmVhZHktLWRvbmUnKTtcclxuXHJcbiAgICAgIGlmIChkb25lTWFyaykge1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICB9KTtcclxufVxyXG5cclxub25UYXNrRG9uZSh0YXNrTGlzdCk7XHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQo9CU0JDQm9CV0J3QmNCVINCi0JDQodCa0JBcclxuXHJcblxyXG5kZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgdGFza0RvbmVBcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS1kb25lJykpO1xyXG5cclxuXHJcbi8vINCf0KDQmCDQo9CU0JDQm9CV0J3QmNCYINCi0JDQodCa0JAg0KPQlNCQ0JvQr9CV0KLQodCvINCX0JDQn9CY0KHQrCDQkiBsb2NhbFN0b3JhZ2VcclxuICB2YXIgdGFza0RvbmVUZXh0QXJyID0gW107XHJcbiAgZm9yKGxldCBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrRG9uZVRleHRBcnJbaV0gPSB0YXNrRG9uZUFycltpXS5sYXN0Q2hpbGQudGV4dENvbnRlbnQ7XHJcbiAgfVxyXG4gXHJcblxyXG4gIGxldCBzdG9yYWdlT2JqID0gSlNPTi5wYXJzZShzdG9yYWdlLmRhdGEpO1xyXG4gXHJcblxyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0YXNrRG9uZVRleHRBcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBpZiAoc3RvcmFnZU9iai5oYXNPd25Qcm9wZXJ0eSh0YXNrRG9uZVRleHRBcnJbaW5kZXhdKSApIHtcclxuICAgICAgZGVsZXRlIHN0b3JhZ2VPYmpbdGFza0RvbmVUZXh0QXJyW2luZGV4XV07XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VPYmopO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuICB1cGRhdGVEYXRhKCk7XHJcblxyXG59KTtcclxuXHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG4vLyBidG4tcGx1c1xyXG5cclxudmFyIGZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnRuJyk7XHJcbnZhciBidG5MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZV9faXRlbXMnKTtcclxudmFyIG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG5cclxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gIGZvcm1CdG4uY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fYnRuLS1hY3RpdmUnKTtcclxuICBidG5MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NyZWF0ZV9faXRlbXMtLWFjdGl2ZScpO1xyXG4gIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnb3ZlcmxheS0tYWN0aXZlJyk7XHJcbn0pO1xyXG5cclxub3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gIGZvcm1CdG4uY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fYnRuLS1hY3RpdmUnKTtcclxuICBidG5MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NyZWF0ZV9faXRlbXMtLWFjdGl2ZScpO1xyXG4gIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnb3ZlcmxheS0tYWN0aXZlJyk7XHJcbn0pXHJcblxyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuXHJcbi8vIGxpc3QtdGVtcGxhdGVcclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0JfQkNCT0J7Qm9Ce0JLQmtCQINCYINCm0JLQldCi0JAg0JrQkNCg0KLQntCn0JrQmFxyXG52YXIgbGlzdFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlVGl0aWxlID0gbGlzdFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190aXRsZScpO1xyXG52YXIgdGVtcGxhdGVDb3VudCA9IGxpc3RUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fY291bnQnKTtcclxuXHJcbi8vIHRlbXBsYXRlLWxpc3RcclxudmFyIHRlbXBsYXRlVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1saXN0Jyk7XHJcbnZhciB0ZW1wbGF0ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlUmVhZHkgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxudmFyIHRlbXBsYXRlVGV4dCA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbnZhciB0ZW1wbGF0ZURhdGUgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcigndGFza19fZGF0ZScpO1xyXG5cclxuXHJcbnZhciBjYXRlZ29yeUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnlfX2xpc3QnKTtcclxuXHJcblxyXG52YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihlKXtcclxuICB2YXIgdGFyZyA9IGUudGFyZ2V0O1xyXG5cclxuICAvLyDRhNC40LrRgSDQstGL0LHQvtGA0LAg0LrQsNGA0YLQvtGH0LrQuFxyXG4gIGlmIChlLnRhcmdldC5wYXJlbnRFbGVtZW50LnRhZ05hbWUgPT09ICdMSScpIHtcclxuICAgdGFyZyA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG4gIFxyXG5cclxuXHJcblxyXG4gIC8vINC/0L7Qu9GD0YfQuNC8INGG0LLQtdGCLCDQt9Cw0LPQvtC70L7QstC+0LosINGB0YfQtdGC0YfQuNC6INC60LDRgtC10LPQvtGA0LjQuFxyXG4gIHZhciBjb2xvclRhcmdldCA9IGdldENvbXB1dGVkU3R5bGUodGFyZykuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpO1xyXG4gIHZhciB0aXRsZVRhcmdldCA9IHRhcmcuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0O1xyXG4gIHZhciBjb3VudGVyVGFyZ2V0ID0gdGFyZy5sYXN0RWxlbWVudENoaWxkLmlubmVyVGV4dDtcclxuXHJcblxyXG4gIC8v0LfQsNC00LDQtNC40Lwg0YbQstC10YIsINC30LDQs9C+0LvQvtCy0L7Quiwg0YHRh9C10YLRh9C40Log0LrQsNGA0YLQvtGH0LrQuFxyXG4gIGxpc3RUZW1wbGF0ZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclRhcmdldDtcclxuICB0ZW1wbGF0ZVRpdGlsZS50ZXh0Q29udGVudCA9ICB0aXRsZVRhcmdldDtcclxuICB0ZW1wbGF0ZUNvdW50LnRleHRDb250ZW50ID0gY291bnRlclRhcmdldDtcclxuXHJcblxyXG5cclxuICAvLyBcclxuICAvLyBcclxuXHJcbiAgLy8g0YHQvtCx0LXRgNC10Lwg0YHQv9C40YHQvtC6INC30LDQtNCw0YdcclxuICB2YXIgaWRDYXRlZ29yeSA9IHRhcmcuaWQuc2xpY2UoNCk7XHJcblxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVUYXNrRWxlbSgpIHtcclxuXHJcbiAgICB2YXIgdGVtcGxhdGVUYXNrQXJyID0gW10uc2xpY2UuY2FsbCh0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay0tJyArIGlkQ2F0ZWdvcnkpKTtcclxuXHJcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlVGFza0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgbmV3SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBuZXdJdGVtLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2snKTtcclxuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLS10ZW1wbGF0ZScpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1SZWFkeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBuZXdJdGVtUmVhZHkuY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeScpO1xyXG4gICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKG5ld0l0ZW1SZWFkeSk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIG5ld0l0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stdGV4dCcpO1xyXG4gICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKG5ld0l0ZW1UZXh0KTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgbmV3SXRlbURhdGUuY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay1kYXRlJyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbURhdGUpO1xyXG4gICAgICBuZXdJdGVtVGV4dC50ZXh0Q29udGVudCA9IHRlbXBsYXRlVGFza0FycltpXS50ZXh0Q29udGVudDtcclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobmV3SXRlbSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0ZW1wbGF0ZVRhc2tMaXN0LmlubmVySFRNTD0gJyc7XHJcbiAgICB0ZW1wbGF0ZVRhc2tMaXN0LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9XHJcblxyXG5cclxuICBjcmVhdGVUYXNrRWxlbSgpO1xyXG4gIFxyXG5cclxuICBcclxufTtcclxuXHJcbmNhdGVnb3J5TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcclxuXHJcbm9uVGFza0RvbmUodGVtcGxhdGVUYXNrTGlzdCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0JPQsNC70L7Rh9C60LAg0Lgg0L/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0LIg0LrQsNGA0YLQvtGH0LrQtVxyXG5cclxudmFyIG9uVGFza0RvbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uICh3cmFwcGVyTm9kZSkge1xyXG5cclxuICB3cmFwcGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDQutCw0LvQvtGH0LrQuCDRgtCw0YHQutCwXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5JykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tZG9uZScpO1xyXG5cclxuICAgICAgLy8g0J/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0L/RgNC4INCy0YvQsdC+0YDQtSDRgtCw0YHQutCwXHJcbiAgICAgIHZhciBkb25lTWFyayA9IHdyYXBwZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXJlYWR5LS1kb25lJyk7XHJcblxyXG4gICAgICBpZiAoZG9uZU1hcmspIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gIH0pO1xyXG59XHJcblxyXG5vblRhc2tEb25lVGVtcGxhdGUodGVtcGxhdGVMaXN0KTtcclxuXHJcbi8vINCj0JTQkNCb0JXQndCY0JUg0KLQkNCh0JrQkCDQkiDQmtCQ0KDQotCe0KfQmtCVXHJcblxyXG5kZWxldGVJY29uVGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIHZhciB0YXNrRG9uZUFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdGVtcGxhdGVfX3Rhc2stLWRvbmUnKSk7XHJcblxyXG4gIHZhciB0ZXh0Q29udGVudEFyciA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRleHRDb250ZW50QXJyW2ldID0gdGFza0RvbmVBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKHRleHRDb250ZW50QXJyKTtcclxuXHJcbiAgdmFyIHRhc2tzQXJyID0gW10uc2xpY2UuY2FsbCh0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzaycpKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IHRhc2tzQXJyLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIGlmICh0YXNrc0FycltrXS50ZXh0Q29udGVudCA9PT0gdGFza0RvbmVBcnJbaV0udGV4dENvbnRlbnQpIHtcclxuICAgICAgICB0YXNrc0FycltrXS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcblxyXG4gIHVwZGF0ZURhdGEoKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vINCa0J7Qm9CY0KfQldCh0KLQktCeINCX0JDQlNCQ0KdcclxuIFxyXG5cclxuXHJcbnZhciB1cGRhdGVEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vINGB0L7QsdC10YDQtdC8INC4INGB0LPRgNGD0L/QuNGA0YPQtdC8INGC0LDRgdC60Lgg0L/QviDQutCw0YLQtdCz0L7RgNC40Y/QvCDQsiDQvtCx0YzQtdC60YJcclxuXHJcbiAgdmFyIHRhc2tzQXJyID0gW10uc2xpY2UuY2FsbCh0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzaycpKTtcclxuXHJcbiAgdmFyIGNhdGVnb3JpZXNBcnIgPSBbXS5zbGljZS5jYWxsKGNhdGVnb3J5TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnlfX2l0ZW0nKSk7XHJcblxyXG4gIHZhciBjYXRlZ29yaWVzSWRPYmogPSB7fTtcclxuICBcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhdGVnb3JpZXNBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIGNhdGVnb3JpZXNJZE9ialtjYXRlZ29yaWVzQXJyW2ldLmlkLnNsaWNlKDQpXSA9IDA7XHJcbiAgfVxyXG5cclxuICBcclxuICBcclxuICBcclxuICAvLyBcclxuXHJcbiAgLy8g0J/QntCU0KHQp9CV0KIg0KLQkNCh0JrQntCSINCf0J4g0JrQkNCi0JXQk9Ce0KDQmNCv0JxcclxuXHJcbiAgdmFyIGNvdW50VGFza3MgPSBmdW5jdGlvbiAoYXJyYXksIG9iaikge1xyXG4gICAgXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICBvYmouYWxsKys7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13b3JrJykpIHtcclxuICAgICAgICBvYmoud29yaysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tcGVyc29uYWwnKSl7XHJcbiAgICAgICAgb2JqLnBlcnNvbmFsKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1zaG9wcGluZycpKXtcclxuICAgICAgICBvYmouc2hvcHBpbmcrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWZhbWlseScpKXtcclxuICAgICAgICBvYmouZmFtaWx5Kys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13YXJuaW5nJykpe1xyXG4gICAgICAgIG9iai53YXJuaW5nKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICB2YXIgcmVzdWwgPSBjb3VudFRhc2tzKHRhc2tzQXJyLCBjYXRlZ29yaWVzSWRPYmopO1xyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQntCa0J7QndCn0JDQndCY0JUg0KHQm9Ce0JLQkCBcItCX0JDQlNCQ0KfQkFwiXHJcblxyXG4gIHZhciBjb21iaWVuZFRhc2tXb3JkcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFxyXG4gICAgdmFyIGN1cnJlbnRWYWx1ZUNvdW50ZXI7XHJcbiAgICB2YXIgcENvdW50ZXI7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgcENvdW50ZXIgPSBjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvcignI2NhdF8nICsga2V5ICsgJyAuY2F0ZWdvcnlfX2NvdW50Jyk7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPSBvYmpba2V5XSA7XHJcbiAgICAgIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gJ9Cd0LXRgiDQt9Cw0LTQsNGHJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDEpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQsCc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID49IDIgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSA0KXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gNSAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDIwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRhyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb21iaWVuZFRhc2tXb3JkcyhyZXN1bCk7XHJcblxyXG59XHJcblxyXG51cGRhdGVEYXRhKCk7XHJcbiAgXHJcbiAgXHJcbi8vINCe0KLQoNCY0KHQntCS0JrQkCDQntCa0J3QkCDQndCe0JLQntCT0J4g0KLQkNCh0JrQkCBcclxuXHJcbnZhciBjcmVhdGVOZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyDQvtC60L3QvlxyXG4gIHZhciBuZXdUYXNrV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3VGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG5cclxuLy8g0LrQvdC+0L/QutC4INC+0YLQvNC10L3QsCDQuCDQs9C+0YLQvtCy0L4gXHJcbiAgdmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdmFyIGJ0bkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5DYW5jZWwpO1xyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuRG9uZSk7XHJcblxyXG4vLyDRgdC/0LjRgdC+0Lot0L7QsdC10YDRgtC60LAg0Lgg0L7QtNC40L0g0YLQsNGB0LpcclxuICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0RvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0RvbmUpO1xyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tJbnB1dCk7XHJcbiAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFza0l0ZW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0J3QntCS0J7Qk9CeINCY0J3Qn9Cj0KLQkCDQlNCb0K8g0JfQkNCf0JjQodCYXHJcblxyXG52YXIgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHJcbiAgdmFyIG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBuZXdMaS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19faXRlbScpO1xyXG4gIHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX3JlYWR5Jyk7XHJcbiAgdmFyIG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuZXdJbnB1dC5pZCA9ICduZXctdGFzay0nICsgY3VycmVudDtcclxuICBuZXdJbnB1dC5uYW1lID0gJ25ldy10YXNrJztcclxuICBuZXdJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gIG5ld0lucHV0LnBsYWNlaG9sZGVyID0gJ9Cn0YLQviDQvdGD0LbQvdC+INGB0LTQtdC70LDRgtGMID8nO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3SW5wdXQpO1xyXG5cclxuICByZXR1cm4gbmV3TGk7XHJcblxyXG59O1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxudmFyIHJlbW92ZUlucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoIWUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBlLnRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbnB1dE5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgaXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbnZhciBjdXJyZW50SXRlbSA9IDE7XHJcblxyXG52YXIgYXBwZW5kSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgIWUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fbGlzdCcpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN1cnJlbnRJdGVtID0gKytjdXJyZW50SXRlbTtcclxuICAgICAgdmFyIG5ld0l0ZW1UZW1wbGF0ZSA9IGNyZWF0ZVRhc2soY3VycmVudEl0ZW0pO1xyXG4gICAgICBcclxuICAgICAgbmV3SXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW1UZW1wbGF0ZSk7XHJcbiAgICAgIHZhciB0YWJJdGVtbSA9IG5ld1Rhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0nICsgY3VycmVudEl0ZW0pO1xyXG4gICAgICB0YWJJdGVtbS5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZS50YXJnZXQudmFsdWUgPT0gMCApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gMCAmJiBlLmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbml0ZW1UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG5cclxuLy9cclxuXHJcbnZhciBuZXdUYXNrU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyk7XHJcbnZhciBmaXJzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLTEnKTtcclxudmFyIHRhc2tCdG5Eb25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19idG4tLWRvbmUnKTtcclxudmFyIHRhc2tCdG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2J0bi0tY2FuY2VsJyk7XHJcblxyXG4vL9Cf0J7Qr9CS0JvQldCd0JjQlSDQmCDQodCa0KDQq9Ci0JjQlSDQmtCd0J7Qn9Ca0JggXCLQk9Ce0KLQntCS0J5cIlxyXG5cclxuZmlyc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICB0YXNrQnRuRG9uZS5jbGFzc0xpc3QucmVtb3ZlKCduZXctdGFza19fYnRuLS1oaWRlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhc2tCdG5Eb25lLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19idG4tLWhpZGUnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbnRhc2tCdG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcblxyXG4gIHZhciB0YXNrRG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX190ZXh0Jyk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxudGFza0J0bkRvbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTsgIFxyXG5cclxuICB2YXIgYWxsTmV3SXRlbXMgPSBuZXdUYXNrU2NyZWVuLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXctdGFza19faXRlbSBpbnB1dCcpO1xyXG4gIGxldCBjYXRlZ29yeU5hbWUgPSBuZXdUYXNrU2NyZWVuLnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fY2F0LWl0ZW0gaW5wdXQ6Y2hlY2tlZCcpLnZhbHVlO1xyXG4gIHZhciBkYXRhTmV3TGlzdCA9IHt9O1xyXG5cclxuICBsZXQgdGFza3NBcnJSZW1vdmUgPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzaycpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3NBcnJSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tzQXJyUmVtb3ZlW2ldLnJlbW92ZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYWxsTmV3SXRlbXNbaV0udmFsdWUpIHtcclxuICAgICAgZGF0YU5ld0xpc3RbYWxsTmV3SXRlbXNbaV0udmFsdWVdID0gY2F0ZWdvcnlOYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBsZXQgZmluYWxMaXN0ID0gT2JqZWN0LmFzc2lnbihkYXRhTGlzdCwgZGF0YU5ld0xpc3QpO1xyXG5cclxuICBzdG9yYWdlLmRhdGEgPSBKU09OLnN0cmluZ2lmeShmaW5hbExpc3QpO1xyXG4gIG5ld1Rhc2tTY3JlZW4uY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2stLWhpZGUnKTtcclxuICByZW5kZXJNYWluTGlzdChKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSkpO1xyXG4gIHVwZGF0ZURhdGEoKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vINCh0J7QntCg0KLQmNCg0J7QktCa0JAg0JLQodCV0JPQniDQodCf0JjQodCa0JAg0J/QniDQmtCQ0KLQldCT0J7QoNCY0K/QnFxyXG5cclxuY2F0ZWdvcnlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAvLyBjb25zb2xlLmRpcihlLnRhcmdldCk7XHJcbiAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgbGV0IGNob29zZUNhdGVnb3J5ID0gdGFyZ2V0LmRhdGFzZXQuY2F0ZWdvcnk7XHJcblxyXG4gIGxldCB0YXNrc0FyciA9IHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJyk7XHJcblxyXG4gIHRhc2tzQXJyLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tZGVsZXRlJykpIHtcclxuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YXNrLS1kZWxldGUnKTtcclxuICAgIH1cclxuICAgIGlmIChlbGVtLmRhdGFzZXQuY2F0ZWdvcnkgIT09IGNob29zZUNhdGVnb3J5KSB7XHJcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgndGFzay0tZGVsZXRlJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9KVxyXG5cclxuICBpZiAoY2hvb3NlQ2F0ZWdvcnkgPT0gJ2FsbCcpIHtcclxuICAgIHRhc2tzQXJyLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1kZWxldGUnKSkge1xyXG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFzay0tZGVsZXRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5uZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5yZW1vdmUoJ25ldy10YXNrLS1oaWRlJyk7XHJcbiAgZm9ybUJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19idG4tLWFjdGl2ZScpO1xyXG4gIGJ0bkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnY3JlYXRlX19pdGVtcy0tYWN0aXZlJyk7XHJcbiAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdvdmVybGF5LS1hY3RpdmUnKTtcclxufSkiXSwiZmlsZSI6InRhc2stbWFyay1hbmltYXRlLmpzIn0=
