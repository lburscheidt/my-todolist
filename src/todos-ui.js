import { addProjectToMasterlist, createProject } from "./projects-logic";
import { masterlist } from "./todos-logic";

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
  createProjectBtn.addEventListener("click", () => {
    let newProject = createProject(projectTitleInput.value);
    addProjectToMasterlist(newProject);
    createMasterlistDropdown();
  });
  projectDialogCloseBtn.addEventListener("click", () => {
    newProjectDialog.close();
  });
}

export function createMasterlistDropdown() {
  projectsOptgroup.innerHTML = "";
  masterlist.forEach((project) => {
    let projectOption = document.createElement("option");
    projectOption.dataset.masterlistIndex = masterlist.indexOf(project);
    let value = project.projectTitle.toLowerCase().replace(" ", "-");
    projectOption.value = value;
    projectOption.textContent = project.projectTitle;
    projectsOptgroup.appendChild(projectOption);
    //console.log(project.projectTitle);
    //console.log();
  });
}
