import { addProjectToMasterlist, createProject } from "./projects-logic";
import { addTodoToProject, masterlist } from "./todos-logic";

const masterlistDropdown = document.querySelector("#masterlist-dropdown");
const header = document.querySelector("header");
const todos = document.querySelector("#todos");
//create new todos
const newTodoBtn = document.querySelector("#new-todo-btn");
const newTodoDialog = document.querySelector("#new-todo-dialog");
const createTodoBtn = document.querySelector("#create-todo-btn");
const todoProject = document.querySelector("#todo-project");
const dialogProjectsOptgroup = document.querySelector(
  "#dialog-projects-optgroup",
);
const todoTitleInput = document.querySelector("#todo-title-input");
const todoDescInput = document.querySelector("#todo-desc-input");
const todoDuedateInput = document.querySelector("#todo-duedate-input");
const todoPriorityInput = document.querySelector("#todo-priority-input");

//create new projects
const createProjectBtn = document.querySelector("#create-project-btn");
const projectTitleInput = document.querySelector("#project-title-input");
const newProjectDialog = document.querySelector("#new-project-dialog");
const projectDialogCloseBtn = document.querySelector(
  "#project-dialog-close-btn",
);
const projectsOptgroup = document.querySelector("#projects-optgroup");

import { createTodo } from "./todos-logic";

export function newProjectFromDialog() {
  masterlistDropdown.addEventListener("click", () => {
    if (masterlistDropdown.value === "create-new") {
      newProjectDialog.showModal();
    } else {
      const index =
        masterlistDropdown.options[masterlistDropdown.selectedIndex].dataset
          .index;
      const length = masterlist[index].projectTodos.length;
      if (length > 0) {
        console.log("There are todos here!");
        renderTodos(index);
      } else {
        todos.innerHTML = "";
      }
      header.textContent = `${masterlist[index].projectTitle}`;
    }
  });
  createProjectBtn.addEventListener("click", () => {
    let newProject = createProject(projectTitleInput.value);
    addProjectToMasterlist(newProject);
    let index = masterlist.indexOf(newProject);
    console.log(index);
    createMasterlistDropdown();
    masterlistDropdown.selectedIndex = index + 2;
  });
  projectDialogCloseBtn.addEventListener("click", () => {
    newProjectDialog.close();
  });
}

export function renderTodos(projectIndex) {
  todos.innerHTML = "";
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

    todoTitleDiv.textContent = todoTitle;
    todoDescDiv.textContent = todoDesc;
    todoDueDateDiv.setAttribute("type", "date");
    todoDueDateDiv.value = todoDueDate;
    priorities.forEach((item) => {
      let priority = document.createElement("option");
      priority.textContent = item;
      priority.value = item;
      todoPriorityDiv.appendChild(priority);
    });
    todoPriorityDiv.value = todoPriority;

    todoCardInner.appendChild(todoTitleDiv);
    todoCardInner.appendChild(todoDescDiv);
    todoCardInner.appendChild(todoDueDateDiv);
    todoCardInner.appendChild(todoPriorityDiv);
  });
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
  createProjectsDropdown();
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
  renderTodos(projectIndex);
  masterlistDropdown.value = option.value;
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
