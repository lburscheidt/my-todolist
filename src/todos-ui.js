import { addProjectToMasterlist, createProject } from "./projects-logic";
import { masterlist } from "./todos-logic";

const masterlistDropdown = document.querySelector("#masterlist-dropdown");
const header = document.querySelector("header");
const todos = document.querySelector("#todos");
//create new todos
const newTodoBtn = document.querySelector("#new-todo-btn");

//create new projects
const createProjectBtn = document.querySelector("#create-project-btn");
const projectTitleInput = document.querySelector("#project-title-input");
const newProjectDialog = document.querySelector("#new-project-dialog");
const projectDialogCloseBtn = document.querySelector(
  "#project-dialog-close-btn",
);
const projectsOptgroup = document.querySelector("#projects-optgroup");

export function newProjectFromDialog() {
  masterlistDropdown.addEventListener("click", () => {
    if (masterlistDropdown.value === "create-new") {
      newProjectDialog.showModal();
    } else {
      let index = masterlistDropdown.selectedIndex - 2;
      console.log(masterlistDropdown.selectedIndex - 2);
      console.log(
        masterlistDropdown.options[masterlistDropdown.selectedIndex].text,
      );
      console.log(masterlist[index].projectTitle);
      console.log(masterlist[index].projectTodos);
      if (masterlist[index].projectTodos.length > 0) {
        let projectTodos = masterlist[index].projectTodos;
        projectTodos.forEach((todo) => {
          console.log("There are todos here!");
          const todoCard = document.createElement("div");
          const todoCardInner = document.createElement("div");
          todoCard.appendChild(todoCardInner);
          todos.appendChild(todoCard);
          todoCard.classList.add("todo-card");
          const todoIndex = masterlist[projectIndex].projectTodos.indexOf(todo);
          todoCard.dataset.todoIndex = todoIndex;
          todoCardInner.classList.add("todo-card-inner");
          const { todoTitle, todoDescription, todoDueDate, todoPriority } =
            todo;
          const todoTitleDiv = document.createElement("div");
          const todoDescDiv = document.createElement("div");
          todoTitleDiv.textContent = todoTitle;
          todoDescDiv.textContent = todoDescription;
          todoCardInner.appendChild(todoTitleDiv);
          todoCardInner.appendChild(todoDescDiv);
          const todoDueDateDiv = document.createElement("input");
          todoDueDateDiv.setAttribute("type", "date");
          todoCardInner.appendChild(todoDueDateDiv);
          const todoPriorityDiv = document.createElement("select");
          let todoPriorityList = priorities.forEach((item) => {
            let priority = document.createElement("option");
            priority.textContent = item;
            todoPriorityDiv.appendChild(priority);
          });
          todoCardInner.appendChild(todoPriorityDiv);
        });
      } else {
        todos.innerHTML = "";
        header.textContent = `${masterlist[index].projectTitle}`;
        masterlistDropdown.selectedIndex = index + 2;
      }
      //console.log(masterlist[index].projectTodos);
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

export function createMasterlistDropdown() {
  projectsOptgroup.innerHTML = "";
  masterlist.forEach((project) => {
    let projectOption = document.createElement("option");
    projectOption.dataset.index = masterlist.indexOf(project);
    let value = project.projectTitle.toLowerCase().replace(" ", "-");
    projectOption.value = value;
    projectOption.textContent = project.projectTitle;
    projectsOptgroup.appendChild(projectOption);
    //console.log(project.projectTitle);
    //console.log();
  });
}

newTodoBtn.addEventListener("click", () => {});

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
