import { addProjectToMasterlist, createProject } from "./projects-logic";
import { addTodoToProject, masterlist, populateStorage } from "./todos-logic";

export const masterlistDropdown = document.querySelector(
  "#masterlist-dropdown",
);
const header = document.querySelector("header");
const body = document.querySelector("body");
const todos = document.querySelector("#todos");
//create new todos
const newTodoBtn = document.querySelector("#new-todo-btn");
const newTodoDialog = document.querySelector("#new-todo-dialog");
const createTodoBtn = document.querySelector("#create-todo-btn");
const todoDialogCloseBtn = document.querySelector("#todo-dialog-close-btn");
const todoProject = document.querySelector("#todo-project");
const dialogProjectsOptgroup = document.querySelector(
  "#dialog-projects-optgroup",
);
const todoTitleInput = document.querySelector("#todo-title-input");
const todoDescInput = document.querySelector("#todo-desc-input");
const todoDuedateInput = document.querySelector("#todo-duedate-input");
const todoPriorityInput = document.querySelector("#todo-priority-input");

//create new projects
export const createProjectBtn = document.querySelector("#create-project-btn");
export const projectTitleInput = document.querySelector("#project-title-input");
export const newProjectDialog = document.querySelector("#new-project-dialog");
export const projectDialogCloseBtn = document.querySelector(
  "#project-dialog-close-btn",
);
const projectsOptgroup = document.querySelector("#projects-optgroup");

import { createTodo } from "./todos-logic";

export function renderTodos(projectIndex) {
  todos.innerHTML = "";
  if (masterlist[projectIndex].projectTodos.length > 0) {
    console.log(masterlist[projectIndex].projectTodos);
    masterlist[projectIndex].projectTodos.forEach((todo) => {
      const todoCard = document.createElement("div");
      const todoColor = document.createElement("div");
      const todoCardInner = document.createElement("div");
      todoColor.classList.add("todo-color");
      todoCard.appendChild(todoColor);
      todoCard.appendChild(todoCardInner);
      todos.appendChild(todoCard);
      todoCard.classList.add("todo-card");
      const todoIndex = masterlist[projectIndex].projectTodos.indexOf(todo);
      todoCard.dataset.todoIndex = todoIndex;
      todoCardInner.classList.add("todo-card-inner");
      const { todoTitle, todoDesc, todoDueDate, todoPriority } = todo;
      if (todoPriority == "high") {
        todoColor.style.backgroundColor = "firebrick";
      } else if (todoPriority == "normal") {
        todoColor.style.backgroundColor = "gold";
      } else if (todoPriority == "low") {
        todoColor.style.backgroundColor = "forestgreen";
      }
      const todoTitleDiv = document.createElement("div");
      const todoDescDiv = document.createElement("div");
      const todoDueDateDiv = document.createElement("input");
      const todoPriorityDiv = document.createElement("select");
      const todoDoneBtn = document.createElement("button");
      todoTitleDiv.textContent = todoTitle;
      todoDescDiv.textContent = todoDesc;
      todoDueDateDiv.setAttribute("type", "date");
      todoDueDateDiv.value = todoDueDate;
      todoDueDateDiv.addEventListener("change", () => {
        todo.todoDueDate = todoDueDateDiv.value;
        populateStorage();
      });
      priorities.forEach((item) => {
        let priority = document.createElement("option");
        priority.textContent = item;
        priority.value = item;
        todoPriorityDiv.appendChild(priority);
      });
      todoPriorityDiv.value = todoPriority;
      todoPriorityDiv.addEventListener("click", () => {
        todo.todoPriority = todoPriorityDiv.value;
        if (todo.todoPriority == "high") {
          todoColor.style.backgroundColor = "firebrick";
        } else if (todo.todoPriority == "normal") {
          todoColor.style.backgroundColor = "gold";
        } else if (todo.todoPriority == "low") {
          todoColor.style.backgroundColor = "forestgreen";
        }
        populateStorage();
      });
      todoDoneBtn.value = "Done";
      todoDoneBtn.textContent = "Done";
      todoDoneBtn.addEventListener("click", () => {
        let index = masterlist[projectIndex].projectTodos.indexOf(todo);
        masterlist[projectIndex].projectTodos.splice(index, 1);
        populateStorage();
        console.log(masterlist.indexOf(masterlist[projectIndex]));
        renderTodos(masterlist.indexOf(masterlist[projectIndex]));
      });
      todoCardInner.appendChild(todoTitleDiv);
      todoCardInner.appendChild(todoDescDiv);
      todoCardInner.appendChild(todoDueDateDiv);
      todoCardInner.appendChild(todoPriorityDiv);
      todoCardInner.appendChild(todoDoneBtn);
    });
  } else {
    void 0;
  }
}

export function createMasterlistDropdown() {
  projectsOptgroup.innerHTML = "";
  masterlist.forEach((project) => {
    let projectOption = document.createElement("option");
    projectOption.dataset.index = masterlist.indexOf(project);
    let value = project.projectTitle.toLowerCase().replace(" ", "-");
    projectOption.value = value;
    projectOption.textContent = project.projectTitle;
    projectsOptgroup.appendChild(projectOption);
  });
}

newTodoBtn.addEventListener("click", () => {
  newTodoDialog.showModal();
  body.classList.add("modal-open");
  createProjectsDropdown();
  if (masterlistDropdown.value === "select-project") {
    todoProject.value = "default-project";
  } else {
    todoProject.value = masterlistDropdown.value;
  }
});

createTodoBtn.addEventListener("click", () => {
  let option = todoProject.options[todoProject.selectedIndex];

  let projectIndex = option.dataset.index;
  let newTodo = createTodo(
    todoTitleInput.value,
    todoDescInput.value,
    todoDuedateInput.value,
    todoPriorityInput.options[todoPriorityInput.selectedIndex].value,
  );
  addTodoToProject(newTodo, projectIndex);
  newTodoDialog.close();
  body.classList.remove("modal-open");
  renderTodos(projectIndex);
  masterlistDropdown.value = option.value;
});

todoDialogCloseBtn.addEventListener("click", () => {
  newTodoDialog.close();
  body.classList.remove("modal-open");
});

projectDialogCloseBtn.addEventListener("click", () => {
  body.classList.remove("modal-open");
  newProjectDialog.close();
});

function createProjectsDropdown() {
  dialogProjectsOptgroup.innerHTML = "";
  masterlist.forEach((project) => {
    let projectOption = document.createElement("option");
    projectOption.dataset.index = masterlist.indexOf(project);
    let value = project.projectTitle.toLowerCase().replace(" ", "-");
    projectOption.value = value;
    projectOption.textContent = project.projectTitle;
    dialogProjectsOptgroup.appendChild(projectOption);
  });
}

//   masterlist.forEach((entry) => {
//     let entryOption = document.createElement("option");
//     entryOption.text = entry.projectTitle;
//     entryOption.value = entry.projectTitle.toLowerCase().replace(" ", "-");
//     dialogProjectsOptgroup.appendChild(entryOption);
//   });
// }

// export function renderProject(project) {
//   if (project.projectTodos != []) {
//     const projectIndex =
//       masterlistDropdown.options[masterlistDropdown.selectedIndex].dataset
//         .masterlistIndex;
//     masterlist[projectIndex].projectTodos.forEach((todo) => {
//       const todoCard = document.createElement("div");
//       const todoCardInner = document.createElement("div");
//       todoCard.appendChild(todoCardInner);
//       todos.appendChild(todoCard);
//       todoCard.classList.add("todo-card");
//       const todoIndex = masterlist[projectIndex].projectTodos.indexOf(todo);
//       todoCard.dataset.todoIndex = todoIndex;
//       todoCardInner.classList.add("todo-card-inner");
//       const { todoTitle, todoDescription, todoDueDate, todoPriority } = todo;
//       const todoTitleDiv = document.createElement("div");
//       const todoDescDiv = document.createElement("div");
//       todoTitleDiv.textContent = todoTitle;
//       todoDescDiv.textContent = todoDescription;
//       todoCardInner.appendChild(todoTitleDiv);
//       todoCardInner.appendChild(todoDescDiv);
//       const todoDueDateDiv = document.createElement("input");
//       todoDueDateDiv.setAttribute("type", "date");
//       todoCardInner.appendChild(todoDueDateDiv);
//       const todoPriorityDiv = document.createElement("select");
//       let todoPriorityList = priorities.forEach((item) => {
//         let priority = document.createElement("option");
//         priority.textContent = item;
//         todoPriorityDiv.appendChild(priority);
//       });
//       todoCardInner.appendChild(todoPriorityDiv);
//     });
//   } else {
//     todos.innerHTML = "";
//   }
// }
//
const priorities = ["high", "normal", "low"];
