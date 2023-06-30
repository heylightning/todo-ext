document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
  
    chrome.storage.local.get("tasks", function (result) {
      if (result.tasks) {
        result.tasks.forEach(function (task) {
          addTask(task.text, task.completed);
        });
      }
    });
  
    todoList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const taskElement = event.target;
        taskElement.classList.toggle("completed");
        const taskText = taskElement.textContent;
        const completed = taskElement.classList.contains("completed");
        updateTask(taskText, completed);
      }
    });
  
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const task = input.value.trim();
      if (task !== "") {
        addTask(task, false);
        input.value = "";
        saveTasks();
      }
    });
  
    function addTask(task, completed) {
      const li = document.createElement("li");
      li.textContent = task;
      if (completed) {
        li.classList.add("completed");
      }
      todoList.appendChild(li);
    }
  
    function updateTask(taskText, completed) {
      const taskElements = todoList.getElementsByTagName("li");
      for (let i = 0; i < taskElements.length; i++) {
        const taskElement = taskElements[i];
        if (taskElement.textContent === taskText) {
          if (completed) {
            taskElement.classList.add("completed");
          } else {
            taskElement.classList.remove("completed");
          }
          break;
        }
      }
      saveTasks();
    }
  
    function saveTasks() {
      const taskElements = todoList.getElementsByTagName("li");
      const tasks = [];
      for (let i = 0; i < taskElements.length; i++) {
        const taskElement = taskElements[i];
        const task = {
          text: taskElement.textContent,
          completed: taskElement.classList.contains("completed"),
        };
        tasks.push(task);
      }
      chrome.storage.local.set({ tasks });
    }
  });
  