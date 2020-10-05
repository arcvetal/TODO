var taskList=document.querySelector(".task-list"),templateList=document.querySelector(".list-template__task-list"),deleteIcon=document.querySelector(".delete-icon"),deleteIconTemplate=document.querySelector(".delete-icon--template"),taskReadyArr=[].slice.call(taskList.querySelectorAll(".task__ready")),storage=localStorage,dataList={"Начать делать презентацию":"work","Заплатить за аренду":"personal","Купить молоко":"shopping","Не забыть забрать Мишу со школы":"family","Купить шоколад Маше":"shopping"};storage.data=JSON.stringify(dataList);var renderMainList=function(e){var t=document.createDocumentFragment();for(key in e){var a=document.createElement("div");a.classList.add("task"),a.classList.add("task--"+e[key]);var n=document.createElement("div");n.classList.add("task__ready"),a.appendChild(n);var l=document.createElement("p");l.classList.add("task__text"),l.textContent=key,a.appendChild(l),t.appendChild(a)}taskList.appendChild(t)};renderMainList(JSON.parse(storage.data));var doneMark=document.querySelector(".task__ready--done");doneMark&&deleteIcon.classList.add("delete-icon--show");var onTaskDone=function(t){t.addEventListener("click",function(e){e.target.classList.contains("task__ready")&&(e.target.classList.toggle("task__ready--done"),e.target.nextElementSibling.classList.toggle("task__text--done"),e.target.parentElement.classList.toggle("task--done"),t.querySelector(".task__ready--done")?deleteIcon.classList.add("delete-icon--show"):deleteIcon.classList.remove("delete-icon--show"))})};onTaskDone(taskList),deleteIcon.addEventListener("click",function(e){for(var t=[].slice.call(document.querySelectorAll(".task--done")),a=0;a<t.length;a++)t[a].remove();deleteIcon.classList.remove("delete-icon--show"),updateData()});var formBtn=document.querySelector(".form__btn"),btnList=document.querySelector(".create__items"),overlay=document.querySelector(".overlay");formBtn.addEventListener("click",function(e){formBtn.classList.toggle("form__btn--active"),btnList.classList.toggle("create__items--active"),overlay.classList.toggle("overlay--active")});var listTemplate=document.querySelector(".list-template"),templateTitile=listTemplate.querySelector(".list-template__title"),templateCount=listTemplate.querySelector(".list-template__count"),templateTaskList=document.querySelector(".list-template__task-list"),templateItem=document.querySelector(".list-template__task--template"),templateReady=templateItem.querySelector(".list-template__task-ready"),templateText=templateItem.querySelector(".list-template__task-text"),templateDate=templateItem.querySelector("task__date"),categoryList=document.querySelector(".category__list"),callback=function(e){var t=e.target;"LI"===event.target.parentElement.tagName&&(t=event.target.parentElement);var a=getComputedStyle(t).getPropertyValue("background-color"),n=t.firstElementChild.innerText,l=t.lastElementChild.innerText;listTemplate.style.backgroundColor=a,templateTitile.textContent=n,templateCount.textContent=l;var c=t.id.slice(4);!function(){for(var e=[].slice.call(taskList.querySelectorAll(".task--"+c)),t=document.createDocumentFragment(),a=0;a<e.length;a++){var n=document.createElement("div");n.classList.add("list-template__task"),n.classList.add("list-template__task--template");var l=document.createElement("div");l.classList.add("list-template__task-ready"),n.appendChild(l);var s=document.createElement("p");s.classList.add("list-template__task-text"),n.appendChild(s);var r=document.createElement("span");r.classList.add("list-template__task-date"),n.appendChild(r),s.textContent=e[a].textContent,t.appendChild(n)}templateTaskList.innerHTML="",templateTaskList.appendChild(t)}()};categoryList.addEventListener("click",callback),onTaskDone(templateTaskList);var onTaskDoneTemplate=function(t){t.addEventListener("click",function(e){e.target.classList.contains("list-template__task-ready")&&(e.target.classList.toggle("list-template__task-ready--done"),e.target.nextElementSibling.classList.toggle("list-template__task-text--done"),e.target.parentElement.classList.toggle("list-template__task--done"),t.querySelector(".list-template__task-ready--done")?deleteIconTemplate.classList.add("delete-icon--show"):deleteIconTemplate.classList.remove("delete-icon--show"))})};onTaskDoneTemplate(templateList),deleteIconTemplate.addEventListener("click",function(e){for(var t=[].slice.call(document.querySelectorAll(".list-template__task--done")),a=[],n=0;n<t.length;n++)a[n]=t[n].textContent,t[n].remove();console.dir(a);var l=[].slice.call(taskList.querySelectorAll(".task"));for(n=0;n<t.length;n++)for(var s=0;s<l.length;s++)l[s].textContent===t[n].textContent&&l[s].remove();deleteIconTemplate.classList.remove("delete-icon--show"),updateData()});var updateData=function(){for(var e=[].slice.call(taskList.querySelectorAll(".task")),t=[].slice.call(categoryList.querySelectorAll(".category__item")),a={},n=0;n<t.length;n++)a[t[n].id.slice(4)]=0;!function(e){var t,a;for(key in e)a=categoryList.querySelector("#cat_"+key+" .category__count"),0===(t=e[key])?a.innerText="Нет задач":1===t?a.innerText=t+" задача":2<=t&&t<=4?a.innerText=t+" задачи":5<=t&&t<=20&&(a.innerText=t+" задач")}(function(e,t){for(var a=0;a<e.length;a++)e[a].classList.contains("task--work")?t.work++:e[a].classList.contains("task--personal")?t.personal++:e[a].classList.contains("task--shopping")?t.shopping++:e[a].classList.contains("task--family")?t.family++:e[a].classList.contains("task--warning")&&t.warning++;return t}(e,a))};updateData();var createNewTask=function(){document.createElement("div").classList.add("new-task");var e=document.createElement("div"),t=document.createElement("button"),a=document.createElement("button");e.appendChild(t),e.appendChild(a);var n=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),r=document.createElement("input");l.appendChild(s),l.appendChild(r),n.appendChild(l)},createTask=function(e){var t=document.createElement("li");t.classList.add("new-task__item");var a=document.createElement("div");a.classList.add("new-task__ready");var n=document.createElement("input");return n.id="new-task-"+e,n.name="new-task",n.type="text",n.placeholder="Что нужно сделать ?",t.appendChild(a),t.appendChild(n),t},removeInput=function(e){e.target.value||e.target.remove()},inputNewTask=document.querySelector("#new-task-1"),itemTemplate=document.querySelector(".new-task__item input"),currentItem=1,appendInput=function(e){if(13===e.keyCode&&0==!e.target.value){var t=document.querySelector(".new-task__list");e.preventDefault(),currentItem=++currentItem;var a=createTask(currentItem);a.addEventListener("keydown",appendInput),t.appendChild(a),t.querySelector("#new-task-"+currentItem).focus(),e.target.removeEventListener("keydown",appendInput),e.preventDefault()}13===e.keyCode&&0==e.target.value&&e.preventDefault(),0==e.target.value&&8===e.keyCode&&(e.target.parentNode.previousElementSibling.lastElementChild.focus(),e.target.parentNode.remove())};itemTemplate.addEventListener("keydown",appendInput);var newTaskScreen=document.querySelector(".new-task"),firstInput=document.querySelector("#new-task-1"),taskBtnDone=document.querySelector(".new-task__btn--done"),taskBtnCancel=document.querySelector(".new-task__btn--cancel");firstInput.addEventListener("input",function(e){e.target.value?taskBtnDone.classList.remove("new-task__btn--hide"):taskBtnDone.classList.add("new-task__btn--hide")}),taskBtnCancel.addEventListener("click",function(e){e.preventDefault(),newTaskScreen.classList.add("new-task--hide")}),taskBtnDone.addEventListener("click",function(e){e.preventDefault();for(var t=newTaskScreen.querySelectorAll(".new-task__item input"),a=newTaskScreen.querySelector(".new-task__cat-item input:checked").value,n={},l=0;l<t.length;l++)t[l].value&&(n[t[l].value]=a);storage.data=JSON.stringify(n),newTaskScreen.classList.add("new-task--hide"),renderMainList(JSON.parse(storage.data))});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2stbWFyay1hbmltYXRlLmpzIl0sIm5hbWVzIjpbInRhc2tMaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGVtcGxhdGVMaXN0IiwiZGVsZXRlSWNvbiIsImRlbGV0ZUljb25UZW1wbGF0ZSIsInRhc2tSZWFkeUFyciIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiZGF0YUxpc3QiLCLQndCw0YfQsNGC0Ywg0LTQtdC70LDRgtGMINC/0YDQtdC30LXQvdGC0LDRhtC40Y4iLCLQl9Cw0L/Qu9Cw0YLQuNGC0Ywg0LfQsCDQsNGA0LXQvdC00YMiLCLQmtGD0L/QuNGC0Ywg0LzQvtC70L7QutC+Iiwi0J3QtSDQt9Cw0LHRi9GC0Ywg0LfQsNCx0YDQsNGC0Ywg0JzQuNGI0YMg0YHQviDRiNC60L7Qu9GLIiwi0JrRg9C/0LjRgtGMINGI0L7QutC+0LvQsNC0INCc0LDRiNC1IiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXJNYWluTGlzdCIsIm9iaiIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImtleSIsInRhc2tJdGVtIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInRhc2tJdGVtUmVhZHkiLCJhcHBlbmRDaGlsZCIsInRhc2tJdGVtVGV4dCIsInRleHRDb250ZW50IiwicGFyc2UiLCJkb25lTWFyayIsIm9uVGFza0RvbmUiLCJ3cmFwcGVyTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJ0b2dnbGUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlIiwidGFza0RvbmVBcnIiLCJpIiwibGVuZ3RoIiwidXBkYXRlRGF0YSIsImZvcm1CdG4iLCJidG5MaXN0Iiwib3ZlcmxheSIsImxpc3RUZW1wbGF0ZSIsInRlbXBsYXRlVGl0aWxlIiwidGVtcGxhdGVDb3VudCIsInRlbXBsYXRlVGFza0xpc3QiLCJ0ZW1wbGF0ZUl0ZW0iLCJ0ZW1wbGF0ZVJlYWR5IiwidGVtcGxhdGVUZXh0IiwidGVtcGxhdGVEYXRlIiwiY2F0ZWdvcnlMaXN0IiwiY2FsbGJhY2siLCJ0YXJnIiwiZXZlbnQiLCJ0YWdOYW1lIiwiY29sb3JUYXJnZXQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInRpdGxlVGFyZ2V0IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJpbm5lclRleHQiLCJjb3VudGVyVGFyZ2V0IiwibGFzdEVsZW1lbnRDaGlsZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiaWRDYXRlZ29yeSIsImlkIiwidGVtcGxhdGVUYXNrQXJyIiwibmV3SXRlbSIsIm5ld0l0ZW1SZWFkeSIsIm5ld0l0ZW1UZXh0IiwibmV3SXRlbURhdGUiLCJpbm5lckhUTUwiLCJjcmVhdGVUYXNrRWxlbSIsIm9uVGFza0RvbmVUZW1wbGF0ZSIsInRleHRDb250ZW50QXJyIiwiY29uc29sZSIsImRpciIsInRhc2tzQXJyIiwiayIsImNhdGVnb3JpZXNBcnIiLCJjYXRlZ29yaWVzSWRPYmoiLCJjdXJyZW50VmFsdWVDb3VudGVyIiwicENvdW50ZXIiLCJjb21iaWVuZFRhc2tXb3JkcyIsImFycmF5Iiwid29yayIsInBlcnNvbmFsIiwic2hvcHBpbmciLCJmYW1pbHkiLCJ3YXJuaW5nIiwiY291bnRUYXNrcyIsImNyZWF0ZU5ld1Rhc2siLCJidG5XcmFwcGVyIiwiYnRuQ2FuY2VsIiwiYnRuRG9uZSIsIm5ld1Rhc2tMaXN0IiwibmV3VGFza0l0ZW0iLCJuZXdUYXNrRG9uZSIsIm5ld1Rhc2tJbnB1dCIsImNyZWF0ZVRhc2siLCJjdXJyZW50IiwibmV3TGkiLCJuZXdEaXYiLCJuZXdJbnB1dCIsIm5hbWUiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJyZW1vdmVJbnB1dCIsInZhbHVlIiwiaW5wdXROZXdUYXNrIiwiaXRlbVRlbXBsYXRlIiwiY3VycmVudEl0ZW0iLCJhcHBlbmRJbnB1dCIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIm5ld0l0ZW1UZW1wbGF0ZSIsImZvY3VzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibmV3VGFza1NjcmVlbiIsImZpcnN0SW5wdXQiLCJ0YXNrQnRuRG9uZSIsInRhc2tCdG5DYW5jZWwiLCJhbGxOZXdJdGVtcyIsImNhdGVnb3J5TmFtZSIsImRhdGFOZXdMaXN0Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxTQUFXQyxTQUFTQyxjQUFjLGNBQ2xDQyxhQUFlRixTQUFTQyxjQUFjLDZCQUN0Q0UsV0FBYUgsU0FBU0MsY0FBYyxnQkFDcENHLG1CQUFxQkosU0FBU0MsY0FBYywwQkFDNUNJLGFBQWUsR0FBR0MsTUFBTUMsS0FBS1IsU0FBU1MsaUJBQWlCLGlCQUV2REMsUUFBVUMsYUFFVkMsU0FBVyxDQUNiQyw0QkFBNkIsT0FDN0JDLHNCQUF1QixXQUN2QkMsZ0JBQWlCLFdBQ2pCQyxrQ0FBbUMsU0FDbkNDLHNCQUF1QixZQUl6QlAsUUFBUVEsS0FBT0MsS0FBS0MsVUFBVVIsVUFTOUIsSUFBSVMsZUFBaUIsU0FBVUMsR0FDN0IsSUFBSUMsRUFBV3RCLFNBQVN1Qix5QkFFeEIsSUFBS0MsT0FBT0gsRUFBSyxDQUVmLElBQUlJLEVBQVd6QixTQUFTMEIsY0FBYyxPQUN0Q0QsRUFBU0UsVUFBVUMsSUFBSSxRQUN2QkgsRUFBU0UsVUFBVUMsSUFBSSxTQUFXUCxFQUFJRyxNQUV0QyxJQUFJSyxFQUFnQjdCLFNBQVMwQixjQUFjLE9BQzNDRyxFQUFjRixVQUFVQyxJQUFJLGVBQzVCSCxFQUFTSyxZQUFZRCxHQUVyQixJQUFJRSxFQUFlL0IsU0FBUzBCLGNBQWMsS0FDMUNLLEVBQWFKLFVBQVVDLElBQUksY0FDM0JHLEVBQWFDLFlBQWNSLElBQzNCQyxFQUFTSyxZQUFZQyxHQUVyQlQsRUFBU1EsWUFBWUwsR0FHdkIxQixTQUFTK0IsWUFBWVIsSUFJdkJGLGVBQWVGLEtBQUtlLE1BQU14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ay1hbmltYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbGlzdCcpO1xyXG52YXIgdGVtcGxhdGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stbGlzdCcpO1xyXG52YXIgZGVsZXRlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbicpO1xyXG52YXIgZGVsZXRlSWNvblRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1pY29uLS10ZW1wbGF0ZScpO1xyXG52YXIgdGFza1JlYWR5QXJyID0gW10uc2xpY2UuY2FsbCh0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza19fcmVhZHknKSk7XHJcblxyXG52YXIgc3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcclxuXHJcbnZhciBkYXRhTGlzdCA9IHtcclxuICBcItCd0LDRh9Cw0YLRjCDQtNC10LvQsNGC0Ywg0L/RgNC10LfQtdC90YLQsNGG0LjRjlwiOiBcIndvcmtcIixcclxuICBcItCX0LDQv9C70LDRgtC40YLRjCDQt9CwINCw0YDQtdC90LTRg1wiOiBcInBlcnNvbmFsXCIsXHJcbiAgXCLQmtGD0L/QuNGC0Ywg0LzQvtC70L7QutC+XCI6IFwic2hvcHBpbmdcIixcclxuICBcItCd0LUg0LfQsNCx0YvRgtGMINC30LDQsdGA0LDRgtGMINCc0LjRiNGDINGB0L4g0YjQutC+0LvRi1wiOiBcImZhbWlseVwiLFxyXG4gIFwi0JrRg9C/0LjRgtGMINGI0L7QutC+0LvQsNC0INCc0LDRiNC1XCI6IFwic2hvcHBpbmdcIlxyXG5cclxufTtcclxuXHJcbnN0b3JhZ2UuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGFMaXN0KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0KTQntCg0JzQmNCg0J7QktCQ0J3QmNCVINCh0KLQkNCg0KLQntCS0J7Qk9CeINCh0J/QmNCh0JrQkFxyXG5cclxudmFyIHJlbmRlck1haW5MaXN0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgZm9yIChrZXkgaW4gb2JqKSB7XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLS0nICsgb2JqW2tleV0pO1xyXG5cclxuICAgIHZhciB0YXNrSXRlbVJlYWR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrSXRlbVJlYWR5LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3JlYWR5Jyk7XHJcbiAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbVJlYWR5KTtcclxuXHJcbiAgICB2YXIgdGFza0l0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGFza0l0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2tfX3RleHQnKTtcclxuICAgIHRhc2tJdGVtVGV4dC50ZXh0Q29udGVudCA9IGtleTtcclxuICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tJdGVtVGV4dCk7XHJcblxyXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG4gIH1cclxuXHJcbiAgdGFza0xpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cclxufTtcclxuXHJcbnJlbmRlck1haW5MaXN0KEpTT04ucGFyc2Uoc3RvcmFnZS5kYXRhKSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyDQk9CQ0JvQntCn0JrQkCDQmCDQl9CQ0KfQldCg0JrQmNCS0JDQndCY0JUg0KLQkNCh0JrQkFxyXG5cclxudmFyIGRvbmVNYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfX3JlYWR5LS1kb25lJyk7XHJcblxyXG5pZiAoZG9uZU1hcmspIHtcclxuICBkZWxldGVJY29uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbn1cclxuXHJcblxyXG52YXIgb25UYXNrRG9uZSA9IGZ1bmN0aW9uICh3cmFwcGVyTm9kZSkge1xyXG5cclxuICB3cmFwcGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDQutCw0LvQvtGH0LrQuCDRgtCw0YHQutCwXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrX19yZWFkeScpKSB7XHJcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX3JlYWR5LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX190ZXh0LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgndGFzay0tZG9uZScpO1xyXG5cclxuICAgICAgLy8g0J/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0L/RgNC4INCy0YvQsdC+0YDQtSDRgtCw0YHQutCwXHJcbiAgICAgIHZhciBkb25lTWFyayA9IHdyYXBwZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy50YXNrX19yZWFkeS0tZG9uZScpO1xyXG5cclxuICAgICAgaWYgKGRvbmVNYXJrKSB7XHJcbiAgICAgICAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gIH0pO1xyXG59XHJcblxyXG5vblRhc2tEb25lKHRhc2tMaXN0KTtcclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vINCj0JTQkNCb0JXQndCY0JUg0KLQkNCh0JrQkFxyXG5cclxuXHJcbmRlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIHZhciB0YXNrRG9uZUFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stLWRvbmUnKSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tEb25lQXJyW2ldLnJlbW92ZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBkZWxldGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcblxyXG4gIHVwZGF0ZURhdGEoKTtcclxuXHJcbn0pO1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxuXHJcbi8vIGJ0bi1wbHVzXHJcblxyXG52YXIgZm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKTtcclxudmFyIGJ0bkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlX19pdGVtcycpO1xyXG52YXIgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5Jyk7XHJcblxyXG5mb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgZm9ybUJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19idG4tLWFjdGl2ZScpO1xyXG4gIGJ0bkxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnY3JlYXRlX19pdGVtcy0tYWN0aXZlJyk7XHJcbiAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdvdmVybGF5LS1hY3RpdmUnKTtcclxufSk7XHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG5cclxuLy8gbGlzdC10ZW1wbGF0ZVxyXG5cclxuLy8g0KHQntCX0JTQkNCd0JjQlSDQl9CQ0JPQntCb0J7QktCa0JAg0Jgg0KbQktCV0KLQkCDQmtCQ0KDQotCe0KfQmtCYXHJcbnZhciBsaXN0VGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGVUaXRpbGUgPSBsaXN0VGVtcGxhdGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3RpdGxlJyk7XHJcbnZhciB0ZW1wbGF0ZUNvdW50ID0gbGlzdFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX19jb3VudCcpO1xyXG5cclxuLy8gdGVtcGxhdGUtbGlzdFxyXG52YXIgdGVtcGxhdGVUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLS10ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGVSZWFkeSA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeScpO1xyXG52YXIgdGVtcGxhdGVUZXh0ID0gdGVtcGxhdGVJdGVtLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXRleHQnKTtcclxudmFyIHRlbXBsYXRlRGF0ZSA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCd0YXNrX19kYXRlJyk7XHJcblxyXG5cclxudmFyIGNhdGVnb3J5TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yeV9fbGlzdCcpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbnZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpe1xyXG4gIHZhciB0YXJnID0gZS50YXJnZXQ7XHJcblxyXG4gIC8vINGE0LjQutGBINCy0YvQsdC+0YDQsCDQutCw0YDRgtC+0YfQutC4XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnRhZ05hbWUgPT09ICdMSScpIHtcclxuICAgdGFyZyA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuICBcclxuXHJcblxyXG5cclxuICAvLyDQv9C+0LvRg9GH0LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YLQtdCz0L7RgNC40LhcclxuICB2YXIgY29sb3JUYXJnZXQgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmcpLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICB2YXIgdGl0bGVUYXJnZXQgPSB0YXJnLmZpcnN0RWxlbWVudENoaWxkLmlubmVyVGV4dDtcclxuICB2YXIgY291bnRlclRhcmdldCA9IHRhcmcubGFzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcblxyXG5cclxuICAvL9C30LDQtNCw0LTQuNC8INGG0LLQtdGCLCDQt9Cw0LPQvtC70L7QstC+0LosINGB0YfQtdGC0YfQuNC6INC60LDRgNGC0L7Rh9C60LhcclxuICBsaXN0VGVtcGxhdGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUYXJnZXQ7XHJcbiAgdGVtcGxhdGVUaXRpbGUudGV4dENvbnRlbnQgPSAgdGl0bGVUYXJnZXQ7XHJcbiAgdGVtcGxhdGVDb3VudC50ZXh0Q29udGVudCA9IGNvdW50ZXJUYXJnZXQ7XHJcblxyXG5cclxuXHJcbiAgLy8gXHJcbiAgLy8gXHJcblxyXG4gIC8vINGB0L7QsdC10YDQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXHJcbiAgdmFyIGlkQ2F0ZWdvcnkgPSB0YXJnLmlkLnNsaWNlKDQpO1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW0oKSB7XHJcblxyXG4gICAgdmFyIHRlbXBsYXRlVGFza0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2stLScgKyBpZENhdGVnb3J5KSk7XHJcblxyXG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZVRhc2tBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIG5ld0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrJyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtUmVhZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgbmV3SXRlbVJlYWR5LmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtUmVhZHkpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBuZXdJdGVtVGV4dC5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXRleHQnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtVGV4dCk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIG5ld0l0ZW1EYXRlLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stZGF0ZScpO1xyXG4gICAgICBuZXdJdGVtLmFwcGVuZENoaWxkKG5ld0l0ZW1EYXRlKTtcclxuICAgICAgbmV3SXRlbVRleHQudGV4dENvbnRlbnQgPSB0ZW1wbGF0ZVRhc2tBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5ld0l0ZW0pO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5pbm5lckhUTUw9ICcnO1xyXG4gICAgdGVtcGxhdGVUYXNrTGlzdC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgY3JlYXRlVGFza0VsZW0oKTtcclxuICBcclxuXHJcbiAgXHJcbn07XHJcblxyXG5jYXRlZ29yeUxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYWxsYmFjayk7XHJcblxyXG5vblRhc2tEb25lKHRlbXBsYXRlVGFza0xpc3QpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQk9Cw0LvQvtGH0LrQsCDQuCDQv9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQsiDQutCw0YDRgtC+0YfQutC1XHJcblxyXG52YXIgb25UYXNrRG9uZVRlbXBsYXRlID0gZnVuY3Rpb24gKHdyYXBwZXJOb2RlKSB7XHJcblxyXG4gIHdyYXBwZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINC60LDQu9C+0YfQutC4INGC0LDRgdC60LBcclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKSkge1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLXRleHQtLWRvbmUnKTtcclxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0LXRlbXBsYXRlX190YXNrLS1kb25lJyk7XHJcblxyXG4gICAgICAvLyDQn9C+0Y/QstC70LXQvdC40LUg0LrQvtGA0LfQuNC90LrQuCDQv9GA0Lgg0LLRi9Cx0L7RgNC1INGC0LDRgdC60LBcclxuICAgICAgdmFyIGRvbmVNYXJrID0gd3JhcHBlck5vZGUucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHktLWRvbmUnKTtcclxuXHJcbiAgICAgIGlmIChkb25lTWFyaykge1xyXG4gICAgICAgIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbm9uVGFza0RvbmVUZW1wbGF0ZSh0ZW1wbGF0ZUxpc3QpO1xyXG5cclxuLy8g0KPQlNCQ0JvQldCd0JjQlSDQotCQ0KHQmtCQINCSINCa0JDQoNCi0J7Qp9Ca0JVcclxuXHJcbmRlbGV0ZUljb25UZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgdmFyIHRhc2tEb25lQXJyID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdC10ZW1wbGF0ZV9fdGFzay0tZG9uZScpKTtcclxuXHJcbiAgdmFyIHRleHRDb250ZW50QXJyID0gW107XHJcbiAgXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgdGV4dENvbnRlbnRBcnJbaV0gPSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudDtcclxuICAgIHRhc2tEb25lQXJyW2ldLnJlbW92ZSgpO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmRpcih0ZXh0Q29udGVudEFycik7XHJcblxyXG5cclxuXHJcbiAgdmFyIHRhc2tzQXJyID0gW10uc2xpY2UuY2FsbCh0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzaycpKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrRG9uZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgXHJcblxyXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCB0YXNrc0Fyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICBpZiAodGFza3NBcnJba10udGV4dENvbnRlbnQgPT09IHRhc2tEb25lQXJyW2ldLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgdGFza3NBcnJba10ucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG5cclxuXHJcbiAgZGVsZXRlSWNvblRlbXBsYXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcblxyXG5cclxuICB1cGRhdGVEYXRhKCk7XHJcblxyXG59KTtcclxuXHJcblxyXG4vLyDQmtCe0JvQmNCn0JXQodCi0JLQniDQl9CQ0JTQkNCnXHJcbiBcclxuXHJcblxyXG52YXIgdXBkYXRlRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyDRgdC+0LHQtdGA0LXQvCDQuCDRgdCz0YDRg9C/0LjRgNGD0LXQvCDRgtCw0YHQutC4INC/0L4g0LrQsNGC0LXQs9C+0YDQuNGP0Lwg0LIg0L7QsdGM0LXQutGCXHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcblxyXG4gIHZhciBjYXRlZ29yaWVzQXJyID0gW10uc2xpY2UuY2FsbChjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmNhdGVnb3J5X19pdGVtJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0lkT2JqID0ge307XHJcbiAgXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRlZ29yaWVzQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYXRlZ29yaWVzSWRPYmpbY2F0ZWdvcmllc0FycltpXS5pZC5zbGljZSg0KV0gPSAwO1xyXG4gIH1cclxuICBcclxuXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLy8gXHJcblxyXG4gIC8vINCf0J7QlNCh0KfQldCiINCi0JDQodCa0J7QkiDQn9CeINCa0JDQotCV0JPQntCg0JjQr9CcXHJcblxyXG4gIHZhciBjb3VudFRhc2tzID0gZnVuY3Rpb24gKGFycmF5LCBvYmopIHtcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgXHJcbiAgICAgIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLXdvcmsnKSkge1xyXG4gICAgICAgIG9iai53b3JrKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1wZXJzb25hbCcpKXtcclxuICAgICAgICBvYmoucGVyc29uYWwrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLXNob3BwaW5nJykpe1xyXG4gICAgICAgIG9iai5zaG9wcGluZysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tZmFtaWx5Jykpe1xyXG4gICAgICAgIG9iai5mYW1pbHkrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLXdhcm5pbmcnKSl7XHJcbiAgICAgICAgb2JqLndhcm5pbmcrKztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG5cclxuXHJcbiAgXHJcblxyXG4gIHZhciByZXN1bCA9IGNvdW50VGFza3ModGFza3NBcnIsIGNhdGVnb3JpZXNJZE9iaik7XHJcbiAgXHJcbiAgLy8gXHJcblxyXG4gIC8vINCe0JrQntCd0KfQkNCd0JjQlSDQodCb0J7QktCQIFwi0JfQkNCU0JDQp9CQXCJcclxuXHJcbiAgdmFyIGNvbWJpZW5kVGFza1dvcmRzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgXHJcbiAgICB2YXIgY3VycmVudFZhbHVlQ291bnRlcjtcclxuICAgIHZhciBwQ291bnRlcjtcclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICBwQ291bnRlciA9IGNhdGVnb3J5TGlzdC5xdWVyeVNlbGVjdG9yKCcjY2F0XycgKyBrZXkgKyAnIC5jYXRlZ29yeV9fY291bnQnKTtcclxuICAgICAgY3VycmVudFZhbHVlQ291bnRlciA9IG9ialtrZXldIDtcclxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSAn0J3QtdGCINC30LDQtNCw0YcnO1xyXG4gICAgICB9IGVsc2UgaWYoY3VycmVudFZhbHVlQ291bnRlciA9PT0gMSl7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRh9CwJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gMiAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDQpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQuCc7XHJcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlQ291bnRlciA+PSA1ICYmIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPD0gMjApIHtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGHJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNvbWJpZW5kVGFza1dvcmRzKHJlc3VsKTtcclxuXHJcbn1cclxuXHJcbnVwZGF0ZURhdGEoKTtcclxuICBcclxuICBcclxuLy8g0J7QotCg0JjQodCe0JLQmtCQINCe0JrQndCQINCd0J7QktCe0JPQniDQotCQ0KHQmtCQIFxyXG5cclxudmFyIGNyZWF0ZU5ld1Rhc2sgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vINC+0LrQvdC+XHJcbiAgdmFyIG5ld1Rhc2tXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdUYXNrV2luZG93LmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrJyk7XHJcblxyXG4vLyDQutC90L7Qv9C60Lgg0L7RgtC80LXQvdCwINC4INCz0L7RgtC+0LLQviBcclxuICB2YXIgYnRuV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBidG5DYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICB2YXIgYnRuRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICBidG5XcmFwcGVyLmFwcGVuZENoaWxkKGJ0bkNhbmNlbCk7XHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5Eb25lKTtcclxuXHJcbi8vINGB0L/QuNGB0L7Qui3QvtCx0LXRgNGC0LrQsCDQuCDQvtC00LjQvSDRgtCw0YHQulxyXG4gIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBuZXdUYXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBuZXdUYXNrRG9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHZhciBuZXdUYXNrSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cclxuICBuZXdUYXNrSXRlbS5hcHBlbmRDaGlsZChuZXdUYXNrRG9uZSk7XHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0lucHV0KTtcclxuICBuZXdUYXNrTGlzdC5hcHBlbmRDaGlsZChuZXdUYXNrSXRlbSk7XHJcbn1cclxuXHJcblxyXG5cclxuLy8g0KHQntCX0JTQkNCd0JjQlSDQndCe0JLQntCT0J4g0JjQndCf0KPQotCQINCU0JvQryDQl9CQ0J/QmNCh0JhcclxuXHJcbnZhciBjcmVhdGVUYXNrID0gZnVuY3Rpb24oY3VycmVudCkge1xyXG5cclxuICB2YXIgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIG5ld0xpLmNsYXNzTGlzdC5hZGQoJ25ldy10YXNrX19pdGVtJyk7XHJcbiAgdmFyIG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKCduZXctdGFza19fcmVhZHknKTtcclxuICB2YXIgbmV3SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIG5ld0lucHV0LmlkID0gJ25ldy10YXNrLScgKyBjdXJyZW50O1xyXG4gIG5ld0lucHV0Lm5hbWUgPSAnbmV3LXRhc2snO1xyXG4gIG5ld0lucHV0LnR5cGUgPSAndGV4dCc7XHJcbiAgbmV3SW5wdXQucGxhY2Vob2xkZXIgPSAn0KfRgtC+INC90YPQttC90L4g0YHQtNC10LvQsNGC0YwgPyc7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICBuZXdMaS5hcHBlbmRDaGlsZChuZXdJbnB1dCk7XHJcblxyXG4gIHJldHVybiBuZXdMaTtcclxuXHJcbn07XHJcblxyXG4vLyBcclxuLy8gXHJcblxyXG52YXIgcmVtb3ZlSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gIGlmICghZS50YXJnZXQudmFsdWUpIHtcclxuICAgIGUudGFyZ2V0LnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIGlucHV0TmV3VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0xJyk7XHJcbnZhciBpdGVtVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2l0ZW0gaW5wdXQnKTtcclxudmFyIGN1cnJlbnRJdGVtID0gMTtcclxuXHJcbnZhciBhcHBlbmRJbnB1dCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiAhZS50YXJnZXQudmFsdWUgPT0gMCApIHtcclxuICAgICAgdmFyIG5ld1Rhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19saXN0Jyk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY3VycmVudEl0ZW0gPSArK2N1cnJlbnRJdGVtO1xyXG4gICAgICB2YXIgbmV3SXRlbVRlbXBsYXRlID0gY3JlYXRlVGFzayhjdXJyZW50SXRlbSk7XHJcbiAgICAgIFxyXG4gICAgICBuZXdJdGVtVGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFwcGVuZElucHV0KTtcclxuICAgICAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3SXRlbVRlbXBsYXRlKTtcclxuICAgICAgdmFyIHRhYkl0ZW1tID0gbmV3VGFza0xpc3QucXVlcnlTZWxlY3RvcignI25ldy10YXNrLScgKyBjdXJyZW50SXRlbSk7XHJcbiAgICAgIHRhYkl0ZW1tLmZvY3VzKCk7XHJcbiAgICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBlLnRhcmdldC52YWx1ZSA9PSAwICkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAwICYmIGUua2V5Q29kZSA9PT0gOCkge1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcubGFzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuaXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcblxyXG4vL1xyXG5cclxudmFyIG5ld1Rhc2tTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2snKTtcclxudmFyIGZpcnN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgdGFza0J0bkRvbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2J0bi0tZG9uZScpO1xyXG52YXIgdGFza0J0bkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fYnRuLS1jYW5jZWwnKTtcclxuXHJcbi8v0J/QntCv0JLQm9CV0J3QmNCVINCYINCh0JrQoNCr0KLQmNCVINCa0J3QntCf0JrQmCBcItCT0J7QotCe0JLQnlwiXHJcblxyXG5maXJzdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoZS50YXJnZXQudmFsdWUpIHtcclxuICAgIHRhc2tCdG5Eb25lLmNsYXNzTGlzdC5yZW1vdmUoJ25ldy10YXNrX19idG4tLWhpZGUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGFza0J0bkRvbmUuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX2J0bi0taGlkZScpO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxudGFza0J0bkNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIG5ld1Rhc2tTY3JlZW4uY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2stLWhpZGUnKTtcclxufSk7XHJcblxyXG5cclxuXHJcbnRhc2tCdG5Eb25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7ICBcclxuXHJcbiAgdmFyIGFsbE5ld0l0ZW1zID0gbmV3VGFza1NjcmVlbi5xdWVyeVNlbGVjdG9yQWxsKCcubmV3LXRhc2tfX2l0ZW0gaW5wdXQnKTtcclxuICB2YXIgY3VycmVudENhdGVnb3J5ID0gbmV3VGFza1NjcmVlbi5xdWVyeVNlbGVjdG9yKCcubmV3LXRhc2tfX2NhdC1pdGVtIGlucHV0OmNoZWNrZWQnKTtcclxuICB2YXIgY2F0ZWdvcnlOYW1lID0gY3VycmVudENhdGVnb3J5LnZhbHVlO1xyXG4gIHZhciBkYXRhTmV3TGlzdCA9IHt9O1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbE5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoYWxsTmV3SXRlbXNbaV0udmFsdWUpIHtcclxuICAgICAgZGF0YU5ld0xpc3RbYWxsTmV3SXRlbXNbaV0udmFsdWVdID0gY2F0ZWdvcnlOYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gXHJcbiAgc3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YU5ld0xpc3QpO1xyXG4gIG5ld1Rhc2tTY3JlZW4uY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2stLWhpZGUnKTtcclxuICByZW5kZXJNYWluTGlzdChKU09OLnBhcnNlKHN0b3JhZ2UuZGF0YSkpO1xyXG5cclxufSkiXX0=
