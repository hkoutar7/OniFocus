let addTask = document.getElementById("add_task");
let button = document.getElementById("add_btn");
let task_holder = document.getElementsByClassName("task-holder")[0];
let arrayTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

// Load All The tasks :
window.addEventListener("load", (e) => {
  if (arrayTasks !== null) {
    arrayTasks.forEach((task) => {
      // create the task
      let taskDiv = document.createElement("div");
      taskDiv.setAttribute("class", "task");
      let div = document.createElement("div");
      let taskpara = document.createElement("p");
      let circleIcon = document.createElement("i");
      if (task.done)
        circleIcon.setAttribute("class", "fa-regular fa-circle-check select");
      else circleIcon.setAttribute("class", "fa-regular fa-circle select");
      let crossIcon = document.createElement("i");
      crossIcon.setAttribute("class", "fa-solid fa-xmark close");
      let content = document.createTextNode(task.title);

      // add the task to the page
      div.appendChild(circleIcon);
      taskpara.appendChild(content);
      div.appendChild(taskpara);
      taskDiv.appendChild(div);
      taskDiv.appendChild(crossIcon);

      taskDiv.setAttribute("data-id", task.id);
      if (task.done)
        taskpara.style.cssText = `text-decoration: line-through; color: #9e9e9eb3`;
      else taskpara.style.cssText = `text-decoration: none; color: black`;

      task_holder.append(taskDiv);
    });
  }
});

// Add a New Task
button.addEventListener("click", (e) => {
  if (addTask.value !== '') {
    // create the task
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    let div = document.createElement("div");
    let taskpara = document.createElement("p");
    let circleIcon = document.createElement("i");
    circleIcon.setAttribute("class", "fa-regular fa-circle select");
    let crossIcon = document.createElement("i");
    crossIcon.setAttribute("class", "fa-solid fa-xmark close");
    let content = document.createTextNode(addTask.value);

    // add the task to the page
    div.appendChild(circleIcon);
    taskpara.appendChild(content);
    div.appendChild(taskpara);
    taskDiv.appendChild(div);
    taskDiv.appendChild(crossIcon);

    task_holder.append(taskDiv);

    // set the task to the local storage
    let mytask = {
      id: getTheCurrentDate(),
      title: String(addTask.value),
      done: false,
    };

    taskDiv.setAttribute("data-id", mytask.id);
    arrayTasks.push(mytask);

    window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
  }

  addTask.value = "";
});

// set a task to done

let selectCircles = document.getElementsByClassName("select");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("select")) {
    let idSelected =
      e.target.parentElement.parentElement.getAttribute("data-id");

    if (e.target.classList.contains("fa-circle")) {
      for (let i = 0; i < arrayTasks.length; i++) {
        if (arrayTasks[i].id == idSelected) arrayTasks[i].done = true;
      }

      e.target.classList.remove("fa-circle");
      e.target.classList.add("fa-circle-check");
      e.target.nextSibling.style.cssText = `text-decoration: line-through; color: #9e9e9eb3`;
    } else {
      for (let i = 0; i < arrayTasks.length; i++) {
        if (arrayTasks[i].id == idSelected) arrayTasks[i].done = false;
      }

      e.target.classList.remove("fa-circle-check");
      e.target.classList.add("fa-circle");
      e.target.nextSibling.style.cssText = `text-decoration: none; color: black`;
    }
  }

  window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
});

// generate a unique id for a given task
function getTheCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const hour = String(currentDate.getHours());
  const minute = String(currentDate.getMinutes());
  const second = String(currentDate.getSeconds());

  return `${day}-${month}-${year} ${hour}:${minute}:${second} `;
}
