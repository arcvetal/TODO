const taskList = document.querySelector('.task-list');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YXNrLW1hcmstYW5pbWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIGRlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24nKTtcclxudmFyIGRlbGV0ZUljb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbi0tdGVtcGxhdGUnKTtcclxudmFyIHRhc2tSZWFkeUFyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfX3JlYWR5JykpO1xyXG5cclxuXHJcbnZhciBzdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG5cclxubGV0IHN0YXJ0TGlzdCA9IHtcclxuICBcItCd0LDRh9Cw0YLRjCDQtNC10LvQsNGC0Ywg0L/RgNC10LfQtdC90YLQsNGG0LjRjlwiOiBcIndvcmtcIixcclxuICBcItCX0LDQv9C70LDRgtC40YLRjCDQt9CwINCw0YDQtdC90LTRg1wiOiBcInBlcnNvbmFsXCIsXHJcbiAgXCLQmtGD0L/QuNGC0Ywg0LzQvtC70L7QutC+XCI6IFwic2hvcHBpbmdcIixcclxuICBcItCd0LUg0LfQsNCx0YvRgtGMINC30LDQsdGA0LDRgtGMINCc0LjRiNGDINGB0L4g0YjQutC+0LvRi1wiOiBcImZhbWlseVwiLFxyXG4gIFwi0JrRg9C/0LjRgtGMINGI0L7QutC+0LvQsNC0INCc0LDRiNC1XCI6IFwic2hvcHBpbmdcIlxyXG59O1xyXG5cclxudmFyIGRhdGFMaXN0ID0gT2JqZWN0LmFzc2lnbihzdGFydExpc3QpO1xyXG5cclxuc3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YUxpc3QpO1xyXG5cclxuXHJcbi8vINCk0J7QoNCc0JjQoNCe0JLQkNCd0JjQlSDQodCi0JDQoNCi0J7QktCe0JPQniDQodCf0JjQodCa0JBcclxuXHJcbnZhciByZW5kZXJNYWluTGlzdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gIGZvciAoa2V5IGluIG9iaikge1xyXG5cclxuICAgIHZhciB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay0tJyArIG9ialtrZXldKTtcclxuXHJcbiAgICB2YXIgdGFza0l0ZW1SZWFkeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0l0ZW1SZWFkeS5jbGFzc0xpc3QuYWRkKCd0YXNrX19yZWFkeScpO1xyXG4gICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW1SZWFkeSk7XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRhc2tJdGVtVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrX190ZXh0Jyk7XHJcbiAgICB0YXNrSXRlbVRleHQudGV4dENvbnRlbnQgPSBrZXk7XHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbVRleHQpO1xyXG5cclxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcclxuICB9XHJcblxyXG4gIHRhc2tMaXN0LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHJcbn07XHJcblxyXG5yZW5kZXJNYWluTGlzdChKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQk9CQ0JvQntCn0JrQkCDQmCDQl9CQ0KfQldCg0JrQmNCS0JDQndCY0JUg0KLQkNCh0JrQkFxyXG5cclxudmFyIGRvbmVNYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfX3JlYWR5LS1kb25lJyk7XHJcblxyXG5pZiAoZG9uZU1hcmspIHtcclxuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbn1cclxuXHJcblxyXG52YXIgb25UYXNrRG9uZSA9IGZ1bmN0aW9uICh3cmFwcGVyTm9kZSkge1xyXG5cclxuICB3cmFwcGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDQutCw0LvQvtGH0LrQuCDRgtCw0YHQutCwXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrX19yZWFkeScpKSB7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX3JlYWR5LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX190ZXh0LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgndGFzay0tZG9uZScpO1xyXG5cclxuICAgICAgLy8g0J/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0L/RgNC4INCy0YvQsdC+0YDQtSDRgtCw0YHQutCwXHJcbiAgICAgIHZhciBkb25lTWFyayA9IHdyYXBwZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50YXNrX19yZWFkeS0tZG9uZScpO1xyXG5cclxuICAgICAgaWYgKGRvbmVNYXJrKSB7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gIH0pO1xyXG59XHJcblxyXG5vblRhc2tEb25lKHRhc2tMaXN0KTtcclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vINCj0JTQkNCb0JXQndCY0JUg0KLQkNCh0JrQkFxyXG5cclxuXHJcbmRlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIHZhciB0YXNrRG9uZUFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stLWRvbmUnKSk7XHJcblxyXG5cclxuLy8g0J/QoNCYINCj0JTQkNCb0JXQndCY0Jgg0KLQkNCh0JrQkCDQo9CU0JDQm9Cv0JXQotCh0K8g0JfQkNCf0JjQodCsINCSIGxvY2FsU3RvcmFnZVxyXG4gIHZhciB0YXNrRG9uZVRleHRBcnIgPSBbXTtcclxuICBmb3IobGV0IGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tEb25lVGV4dEFycltpXSA9IHRhc2tEb25lQXJyW2ldLmxhc3RDaGlsZC50ZXh0Q29udGVudDtcclxuICB9XHJcbiBcclxuXHJcbiAgbGV0IHN0b3JhZ2VPYmogPSBKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSk7XHJcbiBcclxuXHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRhc2tEb25lVGV4dEFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgIGlmIChzdG9yYWdlT2JqLmhhc093blByb3BlcnR5KHRhc2tEb25lVGV4dEFycltpbmRleF0pICkge1xyXG4gICAgICBkZWxldGUgc3RvcmFnZU9ialt0YXNrRG9uZVRleHRBcnJbaW5kZXhdXTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgc3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkoc3RvcmFnZU9iaik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tEb25lQXJyW2ldLnJlbW92ZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBkZWxldGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcblxyXG4gIHVwZGF0ZURhdGEoKTtcclxuXHJcbn0pO1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcbi8vIGJ0bi1wbHVzXHJcblxyXG52YXIgZm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKTtcclxudmFyIGJ0bkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlX19pdGVtcycpO1xyXG52YXIgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcblxyXG5mb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgZm9ybUJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19idG4tLWFjdGl2ZScpO1xyXG4gIGJ0bkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnY3JlYXRlX19pdGVtcy0tYWN0aXZlJyk7XHJcbiAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdvdmVybGF5LS1hY3RpdmUnKTtcclxufSk7XHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG5cclxuLy8gbGlzdC10ZW1wbGF0ZVxyXG5cclxuLy8g0KHQntCX0JTQkNCd0JjQlSDQl9CQ0JPQntCb0J7QktCa0JAg0Jgg0KbQktCV0KLQkCDQmtCQ0KDQotCe0KfQmtCYXHJcbnZhciBsaXN0VGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGVUaXRpbGUgPSBsaXN0VGVtcGxhdGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3RpdGxlJyk7XHJcbnZhciB0ZW1wbGF0ZUNvdW50ID0gbGlzdFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX19jb3VudCcpO1xyXG5cclxuLy8gdGVtcGxhdGUtbGlzdFxyXG52YXIgdGVtcGxhdGVUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLS10ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGVSZWFkeSA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeScpO1xyXG52YXIgdGVtcGxhdGVUZXh0ID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXRleHQnKTtcclxudmFyIHRlbXBsYXRlRGF0ZSA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCd0YXNrX19kYXRlJyk7XHJcblxyXG5cclxudmFyIGNhdGVnb3J5TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yeV9fbGlzdCcpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbnZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpe1xyXG4gIHZhciB0YXJnID0gZS50YXJnZXQ7XHJcblxyXG4gIC8vINGE0LjQutGBINCy0YvQsdC+0YDQsCDQutCw0YDRgtC+0YfQutC4XHJcbiAgaWYgKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQudGFnTmFtZSA9PT0gJ0xJJykge1xyXG4gICB0YXJnID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgXHJcblxyXG5cclxuXHJcbiAgLy8g0L/QvtC70YPRh9C40Lwg0YbQstC10YIsINC30LDQs9C+0LvQvtCy0L7Quiwg0YHRh9C10YLRh9C40Log0LrQsNGC0LXQs9C+0YDQuNC4XHJcbiAgdmFyIGNvbG9yVGFyZ2V0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgdmFyIHRpdGxlVGFyZ2V0ID0gdGFyZy5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcbiAgdmFyIGNvdW50ZXJUYXJnZXQgPSB0YXJnLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0O1xyXG5cclxuXHJcbiAgLy/Qt9Cw0LTQsNC00LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YDRgtC+0YfQutC4XHJcbiAgbGlzdFRlbXBsYXRlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yVGFyZ2V0O1xyXG4gIHRlbXBsYXRlVGl0aWxlLnRleHRDb250ZW50ID0gIHRpdGxlVGFyZ2V0O1xyXG4gIHRlbXBsYXRlQ291bnQudGV4dENvbnRlbnQgPSBjb3VudGVyVGFyZ2V0O1xyXG5cclxuXHJcblxyXG4gIC8vIFxyXG4gIC8vIFxyXG5cclxuICAvLyDRgdC+0LHQtdGA0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xyXG4gIHZhciBpZENhdGVnb3J5ID0gdGFyZy5pZC5zbGljZSg0KTtcclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtKCkge1xyXG5cclxuICAgIHZhciB0ZW1wbGF0ZVRhc2tBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS0nICsgaWRDYXRlZ29yeSkpO1xyXG5cclxuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVUYXNrQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzaycpO1xyXG4gICAgICBuZXdJdGVtLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stLXRlbXBsYXRlJyk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbVJlYWR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW1SZWFkeS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVJlYWR5KTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgbmV3SXRlbVRleHQuY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVRleHQpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1EYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBuZXdJdGVtRGF0ZS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLWRhdGUnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtRGF0ZSk7XHJcbiAgICAgIG5ld0l0ZW1UZXh0LnRleHRDb250ZW50ID0gdGVtcGxhdGVUYXNrQXJyW2ldLnRleHRDb250ZW50O1xyXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuaW5uZXJIVE1MPSAnJztcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZVRhc2tFbGVtKCk7XHJcbiAgXHJcblxyXG4gIFxyXG59O1xyXG5cclxuY2F0ZWdvcnlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xyXG5cclxub25UYXNrRG9uZSh0ZW1wbGF0ZVRhc2tMaXN0KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQk9Cw0LvQvtGH0LrQsCDQuCDQv9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQsiDQutCw0YDRgtC+0YfQutC1XHJcblxyXG52YXIgb25UYXNrRG9uZVRlbXBsYXRlID0gZnVuY3Rpb24gKHdyYXBwZXJOb2RlKSB7XHJcblxyXG4gIHdyYXBwZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINC60LDQu9C+0YfQutC4INGC0LDRgdC60LBcclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKSkge1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLXRleHQtLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLS1kb25lJyk7XHJcblxyXG4gICAgICAvLyDQn9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQv9GA0Lgg0LLRi9Cx0L7RgNC1INGC0LDRgdC60LBcclxuICAgICAgdmFyIGRvbmVNYXJrID0gd3JhcHBlck5vZGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHktLWRvbmUnKTtcclxuXHJcbiAgICAgIGlmIChkb25lTWFyaykge1xyXG4gICAgICAgIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbm9uVGFza0RvbmVUZW1wbGF0ZSh0ZW1wbGF0ZUxpc3QpO1xyXG5cclxuLy8g0KPQlNCQ0JvQldCd0JjQlSDQotCQ0KHQmtCQINCSINCa0JDQoNCi0J7Qp9Ca0JVcclxuXHJcbmRlbGV0ZUljb25UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgdmFyIHRhc2tEb25lQXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdC10ZW1wbGF0ZV9fdGFzay0tZG9uZScpKTtcclxuXHJcbiAgdmFyIHRleHRDb250ZW50QXJyID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGV4dENvbnRlbnRBcnJbaV0gPSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudDtcclxuICAgIHRhc2tEb25lQXJyW2ldLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2codGV4dENvbnRlbnRBcnIpO1xyXG5cclxuICB2YXIgdGFza3NBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJykpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGFza3NBcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgaWYgKHRhc2tzQXJyW2tdLnRleHRDb250ZW50ID09PSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIHRhc2tzQXJyW2tdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy8g0JrQntCb0JjQp9CV0KHQotCS0J4g0JfQkNCU0JDQp1xyXG4gXHJcblxyXG5cclxudmFyIHVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0YHQvtCx0LXRgNC10Lwg0Lgg0YHQs9GA0YPQv9C40YDRg9C10Lwg0YLQsNGB0LrQuCDQv9C+INC60LDRgtC10LPQvtGA0LjRj9C8INCyINC+0LHRjNC10LrRglxyXG5cclxuICB2YXIgdGFza3NBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0FyciA9IFtdLnNsaWNlLmNhbGwoY2F0ZWdvcnlMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeV9faXRlbScpKTtcclxuXHJcbiAgdmFyIGNhdGVnb3JpZXNJZE9iaiA9IHt9O1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0ZWdvcmllc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY2F0ZWdvcmllc0lkT2JqW2NhdGVnb3JpZXNBcnJbaV0uaWQuc2xpY2UoNCldID0gMDtcclxuICB9XHJcbiAgXHJcblxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQn9Ce0JTQodCn0JXQoiDQotCQ0KHQmtCe0JIg0J/QniDQmtCQ0KLQldCT0J7QoNCY0K/QnFxyXG5cclxuICB2YXIgY291bnRUYXNrcyA9IGZ1bmN0aW9uIChhcnJheSwgb2JqKSB7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIFxyXG4gICAgICBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13b3JrJykpIHtcclxuICAgICAgICBvYmoud29yaysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tcGVyc29uYWwnKSl7XHJcbiAgICAgICAgb2JqLnBlcnNvbmFsKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1zaG9wcGluZycpKXtcclxuICAgICAgICBvYmouc2hvcHBpbmcrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWZhbWlseScpKXtcclxuICAgICAgICBvYmouZmFtaWx5Kys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13YXJuaW5nJykpe1xyXG4gICAgICAgIG9iai53YXJuaW5nKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICB2YXIgcmVzdWwgPSBjb3VudFRhc2tzKHRhc2tzQXJyLCBjYXRlZ29yaWVzSWRPYmopO1xyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQntCa0J7QndCn0JDQndCY0JUg0KHQm9Ce0JLQkCBcItCX0JDQlNCQ0KfQkFwiXHJcblxyXG4gIHZhciBjb21iaWVuZFRhc2tXb3JkcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFxyXG4gICAgdmFyIGN1cnJlbnRWYWx1ZUNvdW50ZXI7XHJcbiAgICB2YXIgcENvdW50ZXI7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgcENvdW50ZXIgPSBjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvcignI2NhdF8nICsga2V5ICsgJyAuY2F0ZWdvcnlfX2NvdW50Jyk7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPSBvYmpba2V5XSA7XHJcbiAgICAgIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gJ9Cd0LXRgiDQt9Cw0LTQsNGHJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDEpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQsCc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID49IDIgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSA0KXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gNSAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDIwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRhyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb21iaWVuZFRhc2tXb3JkcyhyZXN1bCk7XHJcblxyXG59XHJcblxyXG51cGRhdGVEYXRhKCk7XHJcbiAgXHJcbiAgXHJcbi8vINCe0KLQoNCY0KHQntCS0JrQkCDQntCa0J3QkCDQndCe0JLQntCT0J4g0KLQkNCh0JrQkCBcclxuXHJcbnZhciBjcmVhdGVOZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyDQvtC60L3QvlxyXG4gIHZhciBuZXdUYXNrV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3VGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG5cclxuLy8g0LrQvdC+0L/QutC4INC+0YLQvNC10L3QsCDQuCDQs9C+0YLQvtCy0L4gXHJcbiAgdmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdmFyIGJ0bkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5DYW5jZWwpO1xyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuRG9uZSk7XHJcblxyXG4vLyDRgdC/0LjRgdC+0Lot0L7QsdC10YDRgtC60LAg0Lgg0L7QtNC40L0g0YLQsNGB0LpcclxuICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0RvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0RvbmUpO1xyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tJbnB1dCk7XHJcbiAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFza0l0ZW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0J3QntCS0J7Qk9CeINCY0J3Qn9Cj0KLQkCDQlNCb0K8g0JfQkNCf0JjQodCYXHJcblxyXG52YXIgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHJcbiAgdmFyIG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBuZXdMaS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19faXRlbScpO1xyXG4gIHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX3JlYWR5Jyk7XHJcbiAgdmFyIG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuZXdJbnB1dC5pZCA9ICduZXctdGFzay0nICsgY3VycmVudDtcclxuICBuZXdJbnB1dC5uYW1lID0gJ25ldy10YXNrJztcclxuICBuZXdJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gIG5ld0lucHV0LnBsYWNlaG9sZGVyID0gJ9Cn0YLQviDQvdGD0LbQvdC+INGB0LTQtdC70LDRgtGMID8nO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3SW5wdXQpO1xyXG5cclxuICByZXR1cm4gbmV3TGk7XHJcblxyXG59O1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxudmFyIHJlbW92ZUlucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoIWUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBlLnRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbnB1dE5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgaXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbnZhciBjdXJyZW50SXRlbSA9IDE7XHJcblxyXG52YXIgYXBwZW5kSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgIWUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fbGlzdCcpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN1cnJlbnRJdGVtID0gKytjdXJyZW50SXRlbTtcclxuICAgICAgdmFyIG5ld0l0ZW1UZW1wbGF0ZSA9IGNyZWF0ZVRhc2soY3VycmVudEl0ZW0pO1xyXG4gICAgICBcclxuICAgICAgbmV3SXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW1UZW1wbGF0ZSk7XHJcbiAgICAgIHZhciB0YWJJdGVtbSA9IG5ld1Rhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0nICsgY3VycmVudEl0ZW0pO1xyXG4gICAgICB0YWJJdGVtbS5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZS50YXJnZXQudmFsdWUgPT0gMCApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gMCAmJiBlLmtleUNvZGUgPT09IDgpIHtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmxhc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbml0ZW1UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG5cclxuLy9cclxuXHJcbnZhciBuZXdUYXNrU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyk7XHJcbnZhciBmaXJzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLTEnKTtcclxudmFyIHRhc2tCdG5Eb25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19idG4tLWRvbmUnKTtcclxudmFyIHRhc2tCdG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2J0bi0tY2FuY2VsJyk7XHJcblxyXG4vL9Cf0J7Qr9CS0JvQldCd0JjQlSDQmCDQodCa0KDQq9Ci0JjQlSDQmtCd0J7Qn9Ca0JggXCLQk9Ce0KLQntCS0J5cIlxyXG5cclxuZmlyc3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICB0YXNrQnRuRG9uZS5jbGFzc0xpc3QucmVtb3ZlKCduZXctdGFza19fYnRuLS1oaWRlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhc2tCdG5Eb25lLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19idG4tLWhpZGUnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbnRhc2tCdG5DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBuZXdUYXNrU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrLS1oaWRlJyk7XHJcblxyXG4gIHZhciB0YXNrRG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX190ZXh0Jyk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxudGFza0J0bkRvbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTsgIFxyXG5cclxuICB2YXIgYWxsTmV3SXRlbXMgPSBuZXdUYXNrU2NyZWVuLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXctdGFza19faXRlbSBpbnB1dCcpO1xyXG4gIGxldCBjYXRlZ29yeU5hbWUgPSBuZXdUYXNrU2NyZWVuLnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fY2F0LWl0ZW0gaW5wdXQ6Y2hlY2tlZCcpLnZhbHVlO1xyXG4gIHZhciBkYXRhTmV3TGlzdCA9IHt9O1xyXG5cclxuICBsZXQgdGFza3NBcnJSZW1vdmUgPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzaycpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3NBcnJSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tzQXJyUmVtb3ZlW2ldLnJlbW92ZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYWxsTmV3SXRlbXNbaV0udmFsdWUpIHtcclxuICAgICAgZGF0YU5ld0xpc3RbYWxsTmV3SXRlbXNbaV0udmFsdWVdID0gY2F0ZWdvcnlOYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBsZXQgZmluYWxMaXN0ID0gT2JqZWN0LmFzc2lnbihkYXRhTGlzdCwgZGF0YU5ld0xpc3QpO1xyXG5cclxuICBzdG9yYWdlLmRhdGEgPSBKU09OLnN0cmluZ2lmeShmaW5hbExpc3QpO1xyXG4gIG5ld1Rhc2tTY3JlZW4uY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2stLWhpZGUnKTtcclxuICByZW5kZXJNYWluTGlzdChKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSkpO1xyXG4gIHVwZGF0ZURhdGEoKTtcclxuXHJcbn0pOyJdLCJmaWxlIjoidGFzay1tYXJrLWFuaW1hdGUuanMifQ==
