var taskList=document.querySelector(".task-list"),templateList=document.querySelector(".list-template__task-list"),deleteIcon=document.querySelector(".delete-icon"),deleteIconTemplate=document.querySelector(".delete-icon--template"),taskReadyArr=[].slice.call(taskList.querySelectorAll(".task__ready")),doneMark=document.querySelector(".task__ready--done");doneMark&&deleteIcon.classList.add("delete-icon--show");var onTaskDone=function(t){t.addEventListener("click",function(e){e.target.classList.contains("task__ready")&&(e.target.classList.toggle("task__ready--done"),e.target.nextElementSibling.classList.toggle("task__text--done"),e.target.parentElement.classList.toggle("task--done"),t.querySelector(".task__ready--done")?deleteIcon.classList.add("delete-icon--show"):deleteIcon.classList.remove("delete-icon--show"))})};onTaskDone(taskList),deleteIcon.addEventListener("click",function(e){for(var t=[].slice.call(document.querySelectorAll(".task--done")),a=0;a<t.length;a++)t[a].remove();deleteIcon.classList.remove("delete-icon--show"),updateData()});var formBtn=document.querySelector(".form__btn"),btnList=document.querySelector(".create__items"),overlay=document.querySelector(".overlay");formBtn.addEventListener("click",function(e){formBtn.classList.toggle("form__btn--active"),btnList.classList.toggle("create__items--active"),overlay.classList.toggle("overlay--active")});var listTemplate=document.querySelector(".list-template"),templateTitile=listTemplate.querySelector(".list-template__title"),templateCount=listTemplate.querySelector(".list-template__count"),templateTaskList=document.querySelector(".list-template__task-list"),templateItem=document.querySelector(".list-template__task--template"),templateReady=templateItem.querySelector(".list-template__task-ready"),templateText=templateItem.querySelector(".list-template__task-text"),templateDate=templateItem.querySelector("task__date"),categoryList=document.querySelector(".category__list"),callback=function(e){var t=e.target;"LI"===event.target.parentElement.tagName&&(t=event.target.parentElement);var a=getComputedStyle(t).getPropertyValue("background-color"),l=t.firstElementChild.innerText,n=t.lastElementChild.innerText;listTemplate.style.backgroundColor=a,templateTitile.textContent=l,templateCount.textContent=n;var o=t.id.slice(4);!function(){for(var e=[].slice.call(taskList.querySelectorAll(".task--"+o)),t=document.createDocumentFragment(),a=0;a<e.length;a++){var l=document.createElement("div");l.classList.add("list-template__task"),l.classList.add("list-template__task--template");var n=document.createElement("div");n.classList.add("list-template__task-ready"),l.appendChild(n);var s=document.createElement("p");s.classList.add("list-template__task-text"),l.appendChild(s);var r=document.createElement("span");r.classList.add("list-template__task-date"),l.appendChild(r),s.textContent=e[a].textContent,t.appendChild(l)}templateTaskList.innerHTML="",templateTaskList.appendChild(t)}()};categoryList.addEventListener("click",callback),onTaskDone(templateTaskList);var onTaskDoneTemplate=function(t){t.addEventListener("click",function(e){e.target.classList.contains("list-template__task-ready")&&(e.target.classList.toggle("list-template__task-ready--done"),e.target.nextElementSibling.classList.toggle("list-template__task-text--done"),e.target.parentElement.classList.toggle("list-template__task--done"),t.querySelector(".list-template__task-ready--done")?deleteIconTemplate.classList.add("delete-icon--show"):deleteIconTemplate.classList.remove("delete-icon--show"))})};onTaskDoneTemplate(templateList),deleteIconTemplate.addEventListener("click",function(e){for(var t=[].slice.call(document.querySelectorAll(".list-template__task--done")),a=[],l=0;l<t.length;l++)a[l]=t[l].textContent,t[l].remove();console.dir(a);var n=[].slice.call(taskList.querySelectorAll(".task"));for(l=0;l<t.length;l++)for(var s=0;s<n.length;s++)n[s].textContent===t[l].textContent&&n[s].remove();deleteIconTemplate.classList.remove("delete-icon--show"),updateData()});var updateData=function(){for(var e=[].slice.call(taskList.querySelectorAll(".task")),t=[].slice.call(categoryList.querySelectorAll(".category__item")),a={},l=0;l<t.length;l++)a[t[l].id.slice(4)]=0;!function(e){var t,a;for(key in e)a=categoryList.querySelector("#cat_"+key+" .category__count"),0===(t=e[key])?a.innerText="Нет задач":1===t?a.innerText=t+" задача":2<=t&&t<=4?a.innerText=t+" задачи":5<=t&&t<=20&&(a.innerText=t+" задач")}(function(e,t){for(var a=0;a<e.length;a++)e[a].classList.contains("task--work")?t.work++:e[a].classList.contains("task--personal")?t.personal++:e[a].classList.contains("task--shopping")?t.shopping++:e[a].classList.contains("task--family")?t.family++:e[a].classList.contains("task--warning")&&t.warning++;return t}(e,a))};updateData();var createNewTask=function(){document.createElement("div").classList.add("new-task");var e=document.createElement("div"),t=document.createElement("button"),a=document.createElement("button");e.appendChild(t),e.appendChild(a);var l=document.createElement("div"),n=document.createElement("div"),s=document.createElement("div"),r=document.createElement("input");n.appendChild(s),n.appendChild(r),l.appendChild(n)},createTask=function(e){var t=document.createElement("li");t.classList.add("new-task__item");var a=document.createElement("div");a.classList.add("new-task__ready");var l=document.createElement("input");return l.id="new-task-"+e,l.name="new-task",l.type="text",l.placeholder="Что нужно сделать ?",t.appendChild(a),t.appendChild(l),t},removeInput=function(e){e.target.value||e.target.remove()},inputNewTask=document.querySelector("#new-task-1"),itemTemplate=document.querySelector(".new-task__item input"),currentItem=1,appendInput=function(e){if(13===e.keyCode&&0==!e.target.value){var t=document.querySelector(".new-task__list");e.preventDefault(),currentItem=++currentItem;var a=createTask(currentItem);a.addEventListener("keydown",appendInput),t.appendChild(a),t.querySelector("#new-task-"+currentItem).focus(),e.target.removeEventListener("keydown",appendInput),e.preventDefault()}0==e.target.value&&8===e.keyCode&&(e.target.parentNode.previousElementSibling.lastElementChild.focus(),e.target.parentNode.remove())};itemTemplate.addEventListener("keydown",appendInput);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2stbWFyay1hbmltYXRlLmpzIl0sIm5hbWVzIjpbInRhc2tMaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGVtcGxhdGVMaXN0IiwiZGVsZXRlSWNvbiIsImRlbGV0ZUljb25UZW1wbGF0ZSIsInRhc2tSZWFkeUFyciIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkb25lTWFyayIsImNsYXNzTGlzdCIsImFkZCIsIm9uVGFza0RvbmUiLCJ3cmFwcGVyTm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJ0b2dnbGUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlIiwidGFza0RvbmVBcnIiLCJpIiwibGVuZ3RoIiwidXBkYXRlRGF0YSIsImZvcm1CdG4iLCJidG5MaXN0Iiwib3ZlcmxheSIsImxpc3RUZW1wbGF0ZSIsInRlbXBsYXRlVGl0aWxlIiwidGVtcGxhdGVDb3VudCIsInRlbXBsYXRlVGFza0xpc3QiLCJ0ZW1wbGF0ZUl0ZW0iLCJ0ZW1wbGF0ZVJlYWR5IiwidGVtcGxhdGVUZXh0IiwidGVtcGxhdGVEYXRlIiwiY2F0ZWdvcnlMaXN0IiwiY2FsbGJhY2siLCJ0YXJnIiwiZXZlbnQiLCJ0YWdOYW1lIiwiY29sb3JUYXJnZXQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInRpdGxlVGFyZ2V0IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJpbm5lclRleHQiLCJjb3VudGVyVGFyZ2V0IiwibGFzdEVsZW1lbnRDaGlsZCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidGV4dENvbnRlbnQiLCJpZENhdGVnb3J5IiwiaWQiLCJ0ZW1wbGF0ZVRhc2tBcnIiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJuZXdJdGVtIiwiY3JlYXRlRWxlbWVudCIsIm5ld0l0ZW1SZWFkeSIsImFwcGVuZENoaWxkIiwibmV3SXRlbVRleHQiLCJuZXdJdGVtRGF0ZSIsImlubmVySFRNTCIsImNyZWF0ZVRhc2tFbGVtIiwib25UYXNrRG9uZVRlbXBsYXRlIiwidGV4dENvbnRlbnRBcnIiLCJjb25zb2xlIiwiZGlyIiwidGFza3NBcnIiLCJrIiwiY2F0ZWdvcmllc0FyciIsImNhdGVnb3JpZXNJZE9iaiIsIm9iaiIsImN1cnJlbnRWYWx1ZUNvdW50ZXIiLCJwQ291bnRlciIsImtleSIsImNvbWJpZW5kVGFza1dvcmRzIiwiYXJyYXkiLCJ3b3JrIiwicGVyc29uYWwiLCJzaG9wcGluZyIsImZhbWlseSIsIndhcm5pbmciLCJjb3VudFRhc2tzIiwiY3JlYXRlTmV3VGFzayIsImJ0bldyYXBwZXIiLCJidG5DYW5jZWwiLCJidG5Eb25lIiwibmV3VGFza0xpc3QiLCJuZXdUYXNrSXRlbSIsIm5ld1Rhc2tEb25lIiwibmV3VGFza0lucHV0IiwiY3JlYXRlVGFzayIsImN1cnJlbnQiLCJuZXdMaSIsIm5ld0RpdiIsIm5ld0lucHV0IiwibmFtZSIsInR5cGUiLCJwbGFjZWhvbGRlciIsInJlbW92ZUlucHV0IiwidmFsdWUiLCJpbnB1dE5ld1Rhc2siLCJpdGVtVGVtcGxhdGUiLCJjdXJyZW50SXRlbSIsImFwcGVuZElucHV0Iiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwibmV3SXRlbVRlbXBsYXRlIiwiZm9jdXMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFNBQVdDLFNBQVNDLGNBQWMsY0FDbENDLGFBQWVGLFNBQVNDLGNBQWMsNkJBQ3RDRSxXQUFhSCxTQUFTQyxjQUFjLGdCQUNwQ0csbUJBQXFCSixTQUFTQyxjQUFjLDBCQUM1Q0ksYUFBZSxHQUFHQyxNQUFNQyxLQUFLUixTQUFTUyxpQkFBaUIsaUJBSXZEQyxTQUFXVCxTQUFTQyxjQUFjLHNCQUVsQ1EsVUFDRk4sV0FBV08sVUFBVUMsSUFBSSxxQkFJM0IsSUFBSUMs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QkFBdUJqRSxpQkFBaUI4RCxRQUM1RGhHLEVBQUVDLE9BQU9pRyxXQUFXNUYsV0FLMUJvRixhQUFhM0YsaUJBQWlCLFVBQVc2RiIsImZpbGUiOiJ0YXNrLW1hcmstYW5pbWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWxpc3QnKTtcclxudmFyIHRlbXBsYXRlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLWxpc3QnKTtcclxudmFyIGRlbGV0ZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWljb24nKTtcclxudmFyIGRlbGV0ZUljb25UZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtaWNvbi0tdGVtcGxhdGUnKTtcclxudmFyIHRhc2tSZWFkeUFyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfX3JlYWR5JykpO1xyXG5cclxuLy8g0JPQkNCb0J7Qp9Ca0JAg0Jgg0JfQkNCn0JXQoNCa0JjQktCQ0J3QmNCVINCi0JDQodCa0JBcclxuXHJcbnZhciBkb25lTWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX19yZWFkeS0tZG9uZScpO1xyXG5cclxuaWYgKGRvbmVNYXJrKSB7XHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG59XHJcblxyXG5cclxudmFyIG9uVGFza0RvbmUgPSBmdW5jdGlvbiAod3JhcHBlck5vZGUpIHtcclxuXHJcbiAgd3JhcHBlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuXHJcbiAgICAvLyDQo9GB0YLQsNC90L7QstC60LAg0LrQsNC70L7Rh9C60Lgg0YLQsNGB0LrQsFxyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFza19fcmVhZHknKSkge1xyXG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fdGV4dC0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2stLWRvbmUnKTtcclxuXHJcbiAgICAgIC8vINCf0L7Rj9Cy0LvQtdC90LjQtSDQutC+0YDQt9C40L3QutC4INC/0YDQuCDQstGL0LHQvtGA0LUg0YLQsNGB0LrQsFxyXG4gICAgICB2YXIgZG9uZU1hcmsgPSB3cmFwcGVyTm9kZS5xdWVyeVNlbGVjdG9yKCcudGFza19fcmVhZHktLWRvbmUnKTtcclxuXHJcbiAgICAgIGlmIChkb25lTWFyaykge1xyXG4gICAgICAgIGRlbGV0ZUljb24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2RlbGV0ZS1pY29uLS1zaG93Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBcclxuICB9KTtcclxufVxyXG5cclxub25UYXNrRG9uZSh0YXNrTGlzdCk7XHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyDQo9CU0JDQm9CV0J3QmNCVINCi0JDQodCa0JBcclxuXHJcblxyXG5kZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICB2YXIgdGFza0RvbmVBcnIgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS1kb25lJykpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tEb25lQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZGVsZXRlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuICB1cGRhdGVEYXRhKCk7XHJcblxyXG59KTtcclxuXHJcbi8vIFxyXG4vLyBcclxuXHJcblxyXG4vLyBidG4tcGx1c1xyXG5cclxudmFyIGZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnRuJyk7XHJcbnZhciBidG5MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZV9faXRlbXMnKTtcclxudmFyIG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpO1xyXG5cclxuZm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gIGZvcm1CdG4uY2xhc3NMaXN0LnRvZ2dsZSgnZm9ybV9fYnRuLS1hY3RpdmUnKTtcclxuICBidG5MaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NyZWF0ZV9faXRlbXMtLWFjdGl2ZScpO1xyXG4gIG92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnb3ZlcmxheS0tYWN0aXZlJyk7XHJcbn0pO1xyXG4vLyBcclxuLy8gXHJcblxyXG5cclxuXHJcbi8vIGxpc3QtdGVtcGxhdGVcclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0JfQkNCT0J7Qm9Ce0JLQmtCQINCYINCm0JLQldCi0JAg0JrQkNCg0KLQntCn0JrQmFxyXG52YXIgbGlzdFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlVGl0aWxlID0gbGlzdFRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190aXRsZScpO1xyXG52YXIgdGVtcGxhdGVDb3VudCA9IGxpc3RUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fY291bnQnKTtcclxuXHJcbi8vIHRlbXBsYXRlLWxpc3RcclxudmFyIHRlbXBsYXRlVGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay1saXN0Jyk7XHJcbnZhciB0ZW1wbGF0ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay0tdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlUmVhZHkgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcignLmxpc3QtdGVtcGxhdGVfX3Rhc2stcmVhZHknKTtcclxudmFyIHRlbXBsYXRlVGV4dCA9IHRlbXBsYXRlSXRlbS5xdWVyeVNlbGVjdG9yKCcubGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbnZhciB0ZW1wbGF0ZURhdGUgPSB0ZW1wbGF0ZUl0ZW0ucXVlcnlTZWxlY3RvcigndGFza19fZGF0ZScpO1xyXG5cclxuXHJcbnZhciBjYXRlZ29yeUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcnlfX2xpc3QnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG52YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihlKXtcclxuICB2YXIgdGFyZyA9IGUudGFyZ2V0O1xyXG5cclxuICAvLyDRhNC40LrRgSDQstGL0LHQvtGA0LAg0LrQsNGA0YLQvtGH0LrQuFxyXG4gIGlmIChldmVudC50YXJnZXQucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnTEknKSB7XHJcbiAgIHRhcmcgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgXHJcblxyXG5cclxuXHJcbiAgLy8g0L/QvtC70YPRh9C40Lwg0YbQstC10YIsINC30LDQs9C+0LvQvtCy0L7Quiwg0YHRh9C10YLRh9C40Log0LrQsNGC0LXQs9C+0YDQuNC4XHJcbiAgdmFyIGNvbG9yVGFyZ2V0ID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgdmFyIHRpdGxlVGFyZ2V0ID0gdGFyZy5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQ7XHJcbiAgdmFyIGNvdW50ZXJUYXJnZXQgPSB0YXJnLmxhc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0O1xyXG5cclxuXHJcbiAgLy/Qt9Cw0LTQsNC00LjQvCDRhtCy0LXRgiwg0LfQsNCz0L7Qu9C+0LLQvtC6LCDRgdGH0LXRgtGH0LjQuiDQutCw0YDRgtC+0YfQutC4XHJcbiAgbGlzdFRlbXBsYXRlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yVGFyZ2V0O1xyXG4gIHRlbXBsYXRlVGl0aWxlLnRleHRDb250ZW50ID0gIHRpdGxlVGFyZ2V0O1xyXG4gIHRlbXBsYXRlQ291bnQudGV4dENvbnRlbnQgPSBjb3VudGVyVGFyZ2V0O1xyXG5cclxuXHJcblxyXG4gIC8vIFxyXG4gIC8vIFxyXG5cclxuICAvLyDRgdC+0LHQtdGA0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xyXG4gIHZhciBpZENhdGVnb3J5ID0gdGFyZy5pZC5zbGljZSg0KTtcclxuXHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtKCkge1xyXG5cclxuICAgIHZhciB0ZW1wbGF0ZVRhc2tBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrLS0nICsgaWRDYXRlZ29yeSkpO1xyXG5cclxuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVUYXNrQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzaycpO1xyXG4gICAgICBuZXdJdGVtLmNsYXNzTGlzdC5hZGQoJ2xpc3QtdGVtcGxhdGVfX3Rhc2stLXRlbXBsYXRlJyk7XHJcblxyXG4gICAgICB2YXIgbmV3SXRlbVJlYWR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIG5ld0l0ZW1SZWFkeS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVJlYWR5KTtcclxuXHJcbiAgICAgIHZhciBuZXdJdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgbmV3SXRlbVRleHQuY2xhc3NMaXN0LmFkZCgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0Jyk7XHJcbiAgICAgIG5ld0l0ZW0uYXBwZW5kQ2hpbGQobmV3SXRlbVRleHQpO1xyXG5cclxuICAgICAgdmFyIG5ld0l0ZW1EYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICBuZXdJdGVtRGF0ZS5jbGFzc0xpc3QuYWRkKCdsaXN0LXRlbXBsYXRlX190YXNrLWRhdGUnKTtcclxuICAgICAgbmV3SXRlbS5hcHBlbmRDaGlsZChuZXdJdGVtRGF0ZSk7XHJcbiAgICAgIG5ld0l0ZW1UZXh0LnRleHRDb250ZW50ID0gdGVtcGxhdGVUYXNrQXJyW2ldLnRleHRDb250ZW50O1xyXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuaW5uZXJIVE1MPSAnJztcclxuICAgIHRlbXBsYXRlVGFza0xpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxuXHJcblxyXG4gIGNyZWF0ZVRhc2tFbGVtKCk7XHJcbiAgXHJcblxyXG4gIFxyXG59O1xyXG5cclxuY2F0ZWdvcnlMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2FsbGJhY2spO1xyXG5cclxub25UYXNrRG9uZSh0ZW1wbGF0ZVRhc2tMaXN0KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8g0JPQsNC70L7Rh9C60LAg0Lgg0L/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0LIg0LrQsNGA0YLQvtGH0LrQtVxyXG5cclxudmFyIG9uVGFza0RvbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uICh3cmFwcGVyTm9kZSkge1xyXG5cclxuICB3cmFwcGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIC8vINCj0YHRgtCw0L3QvtCy0LrQsCDQutCw0LvQvtGH0LrQuCDRgtCw0YHQutCwXHJcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaXN0LXRlbXBsYXRlX190YXNrLXJlYWR5JykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay1yZWFkeS0tZG9uZScpO1xyXG4gICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay10ZXh0LS1kb25lJyk7XHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdC10ZW1wbGF0ZV9fdGFzay0tZG9uZScpO1xyXG5cclxuICAgICAgLy8g0J/QvtGP0LLQu9C10L3QuNC1INC60L7RgNC30LjQvdC60Lgg0L/RgNC4INCy0YvQsdC+0YDQtSDRgtCw0YHQutCwXHJcbiAgICAgIHZhciBkb25lTWFyayA9IHdyYXBwZXJOb2RlLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXRlbXBsYXRlX190YXNrLXJlYWR5LS1kb25lJyk7XHJcblxyXG4gICAgICBpZiAoZG9uZU1hcmspIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxldGVJY29uVGVtcGxhdGUuY2xhc3NMaXN0LnJlbW92ZSgnZGVsZXRlLWljb24tLXNob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gIH0pO1xyXG59XHJcblxyXG5vblRhc2tEb25lVGVtcGxhdGUodGVtcGxhdGVMaXN0KTtcclxuXHJcbi8vINCj0JTQkNCb0JXQndCY0JUg0KLQkNCh0JrQkCDQkiDQmtCQ0KDQotCe0KfQmtCVXHJcblxyXG5kZWxldGVJY29uVGVtcGxhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gIHZhciB0YXNrRG9uZUFyciA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtdGVtcGxhdGVfX3Rhc2stLWRvbmUnKSk7XHJcblxyXG4gIHZhciB0ZXh0Q29udGVudEFyciA9IFtdO1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIHRleHRDb250ZW50QXJyW2ldID0gdGFza0RvbmVBcnJbaV0udGV4dENvbnRlbnQ7XHJcbiAgICB0YXNrRG9uZUFycltpXS5yZW1vdmUoKTtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgY29uc29sZS5kaXIodGV4dENvbnRlbnRBcnIpO1xyXG5cclxuXHJcblxyXG4gIHZhciB0YXNrc0FyciA9IFtdLnNsaWNlLmNhbGwodGFza0xpc3QucXVlcnlTZWxlY3RvckFsbCgnLnRhc2snKSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0RvbmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgIFxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGFza3NBcnIubGVuZ3RoOyBrKyspIHtcclxuICAgICAgaWYgKHRhc2tzQXJyW2tdLnRleHRDb250ZW50ID09PSB0YXNrRG9uZUFycltpXS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgIHRhc2tzQXJyW2tdLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIGRlbGV0ZUljb25UZW1wbGF0ZS5jbGFzc0xpc3QucmVtb3ZlKCdkZWxldGUtaWNvbi0tc2hvdycpO1xyXG5cclxuXHJcbiAgdXBkYXRlRGF0YSgpO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy8g0JrQntCb0JjQp9CV0KHQotCS0J4g0JfQkNCU0JDQp1xyXG4gXHJcblxyXG5cclxudmFyIHVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8g0YHQvtCx0LXRgNC10Lwg0Lgg0YHQs9GA0YPQv9C40YDRg9C10Lwg0YLQsNGB0LrQuCDQv9C+INC60LDRgtC10LPQvtGA0LjRj9C8INCyINC+0LHRjNC10LrRglxyXG5cclxuICB2YXIgdGFza3NBcnIgPSBbXS5zbGljZS5jYWxsKHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrJykpO1xyXG5cclxuICB2YXIgY2F0ZWdvcmllc0FyciA9IFtdLnNsaWNlLmNhbGwoY2F0ZWdvcnlMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeV9faXRlbScpKTtcclxuXHJcbiAgdmFyIGNhdGVnb3JpZXNJZE9iaiA9IHt9O1xyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0ZWdvcmllc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgY2F0ZWdvcmllc0lkT2JqW2NhdGVnb3JpZXNBcnJbaV0uaWQuc2xpY2UoNCldID0gMDtcclxuICB9XHJcbiAgXHJcblxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQn9Ce0JTQodCn0JXQoiDQotCQ0KHQmtCe0JIg0J/QniDQmtCQ0KLQldCT0J7QoNCY0K/QnFxyXG5cclxuICB2YXIgY291bnRUYXNrcyA9IGZ1bmN0aW9uIChhcnJheSwgb2JqKSB7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIFxyXG4gICAgICBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13b3JrJykpIHtcclxuICAgICAgICBvYmoud29yaysrO1xyXG4gICAgICB9IGVsc2UgaWYgKGFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygndGFzay0tcGVyc29uYWwnKSl7XHJcbiAgICAgICAgb2JqLnBlcnNvbmFsKys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS1zaG9wcGluZycpKXtcclxuICAgICAgICBvYmouc2hvcHBpbmcrKztcclxuICAgICAgfSBlbHNlIGlmIChhcnJheVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stLWZhbWlseScpKXtcclxuICAgICAgICBvYmouZmFtaWx5Kys7XHJcbiAgICAgIH0gZWxzZSBpZiAoYXJyYXlbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLS13YXJuaW5nJykpe1xyXG4gICAgICAgIG9iai53YXJuaW5nKys7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICB2YXIgcmVzdWwgPSBjb3VudFRhc2tzKHRhc2tzQXJyLCBjYXRlZ29yaWVzSWRPYmopO1xyXG4gIFxyXG4gIC8vIFxyXG5cclxuICAvLyDQntCa0J7QndCn0JDQndCY0JUg0KHQm9Ce0JLQkCBcItCX0JDQlNCQ0KfQkFwiXHJcblxyXG4gIHZhciBjb21iaWVuZFRhc2tXb3JkcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIFxyXG4gICAgdmFyIGN1cnJlbnRWYWx1ZUNvdW50ZXI7XHJcbiAgICB2YXIgcENvdW50ZXI7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgcENvdW50ZXIgPSBjYXRlZ29yeUxpc3QucXVlcnlTZWxlY3RvcignI2NhdF8nICsga2V5ICsgJyAuY2F0ZWdvcnlfX2NvdW50Jyk7XHJcbiAgICAgIGN1cnJlbnRWYWx1ZUNvdW50ZXIgPSBvYmpba2V5XSA7XHJcbiAgICAgIGlmIChjdXJyZW50VmFsdWVDb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gJ9Cd0LXRgiDQt9Cw0LTQsNGHJztcclxuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPT09IDEpe1xyXG4gICAgICAgIHBDb3VudGVyLmlubmVyVGV4dCA9IGN1cnJlbnRWYWx1ZUNvdW50ZXIgKyAnINC30LDQtNCw0YfQsCc7XHJcbiAgICAgIH0gZWxzZSBpZihjdXJyZW50VmFsdWVDb3VudGVyID49IDIgJiYgY3VycmVudFZhbHVlQ291bnRlciA8PSA0KXtcclxuICAgICAgICBwQ291bnRlci5pbm5lclRleHQgPSBjdXJyZW50VmFsdWVDb3VudGVyICsgJyDQt9Cw0LTQsNGH0LgnO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZUNvdW50ZXIgPj0gNSAmJiBjdXJyZW50VmFsdWVDb3VudGVyIDw9IDIwKSB7XHJcbiAgICAgICAgcENvdW50ZXIuaW5uZXJUZXh0ID0gY3VycmVudFZhbHVlQ291bnRlciArICcg0LfQsNC00LDRhyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb21iaWVuZFRhc2tXb3JkcyhyZXN1bCk7XHJcblxyXG59XHJcblxyXG51cGRhdGVEYXRhKCk7XHJcbiAgXHJcbiAgXHJcbi8vINCe0KLQoNCY0KHQntCS0JrQkCDQntCa0J3QkCDQndCe0JLQntCT0J4g0KLQkNCh0JrQkCBcclxuXHJcbnZhciBjcmVhdGVOZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcblxyXG4vLyDQvtC60L3QvlxyXG4gIHZhciBuZXdUYXNrV2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmV3VGFza1dpbmRvdy5jbGFzc0xpc3QuYWRkKCduZXctdGFzaycpO1xyXG5cclxuLy8g0LrQvdC+0L/QutC4INC+0YLQvNC10L3QsCDQuCDQs9C+0YLQvtCy0L4gXHJcbiAgdmFyIGJ0bldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgYnRuQ2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgdmFyIGJ0bkRvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG5DYW5jZWwpO1xyXG4gIGJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuRG9uZSk7XHJcblxyXG4vLyDRgdC/0LjRgdC+0Lot0L7QsdC10YDRgtC60LAg0Lgg0L7QtNC40L0g0YLQsNGB0LpcclxuICB2YXIgbmV3VGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0RvbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB2YXIgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgbmV3VGFza0l0ZW0uYXBwZW5kQ2hpbGQobmV3VGFza0RvbmUpO1xyXG4gIG5ld1Rhc2tJdGVtLmFwcGVuZENoaWxkKG5ld1Rhc2tJbnB1dCk7XHJcbiAgbmV3VGFza0xpc3QuYXBwZW5kQ2hpbGQobmV3VGFza0l0ZW0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vINCh0J7Ql9CU0JDQndCY0JUg0J3QntCS0J7Qk9CeINCY0J3Qn9Cj0KLQkCDQlNCb0K8g0JfQkNCf0JjQodCYXHJcblxyXG52YXIgY3JlYXRlVGFzayA9IGZ1bmN0aW9uKGN1cnJlbnQpIHtcclxuXHJcbiAgdmFyIG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBuZXdMaS5jbGFzc0xpc3QuYWRkKCduZXctdGFza19faXRlbScpO1xyXG4gIHZhciBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LXRhc2tfX3JlYWR5Jyk7XHJcbiAgdmFyIG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBuZXdJbnB1dC5pZCA9ICduZXctdGFzay0nICsgY3VycmVudDtcclxuICBuZXdJbnB1dC5uYW1lID0gJ25ldy10YXNrJztcclxuICBuZXdJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gIG5ld0lucHV0LnBsYWNlaG9sZGVyID0gJ9Cn0YLQviDQvdGD0LbQvdC+INGB0LTQtdC70LDRgtGMID8nO1xyXG4gIG5ld0xpLmFwcGVuZENoaWxkKG5ld0Rpdik7XHJcbiAgbmV3TGkuYXBwZW5kQ2hpbGQobmV3SW5wdXQpO1xyXG5cclxuICByZXR1cm4gbmV3TGk7XHJcblxyXG59O1xyXG5cclxuLy8gXHJcbi8vIFxyXG5cclxudmFyIHJlbW92ZUlucHV0ID0gZnVuY3Rpb24gKGUpIHtcclxuICBpZiAoIWUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBlLnRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpbnB1dE5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stMScpO1xyXG52YXIgaXRlbVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrX19pdGVtIGlucHV0Jyk7XHJcbnZhciBjdXJyZW50SXRlbSA9IDE7XHJcblxyXG52YXIgYXBwZW5kSW5wdXQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgIWUudGFyZ2V0LnZhbHVlID09IDAgKSB7XHJcbiAgICAgIHZhciBuZXdUYXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFza19fbGlzdCcpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN1cnJlbnRJdGVtID0gKytjdXJyZW50SXRlbTtcclxuICAgICAgdmFyIG5ld0l0ZW1UZW1wbGF0ZSA9IGNyZWF0ZVRhc2soY3VycmVudEl0ZW0pO1xyXG4gICAgICBcclxuICAgICAgbmV3SXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7XHJcbiAgICAgIG5ld1Rhc2tMaXN0LmFwcGVuZENoaWxkKG5ld0l0ZW1UZW1wbGF0ZSk7XHJcbiAgICAgIHZhciB0YWJJdGVtbSA9IG5ld1Rhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzay0nICsgY3VycmVudEl0ZW0pO1xyXG4gICAgICB0YWJJdGVtbS5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYXBwZW5kSW5wdXQpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAwICYmIGUua2V5Q29kZSA9PT0gOCkge1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcubGFzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xyXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuaXRlbVRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhcHBlbmRJbnB1dCk7Il19
