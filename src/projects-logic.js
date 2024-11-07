import { masterlist, populateStorage } from "./todos-logic";

export function createProject(projectTitle) {
  if (masterlist.some((project) => project.projectTitle == projectTitle)) {
    alert("Please pick a different title");
    return false;
  }
  let projectTodos = [];
  return { projectTitle, projectTodos };
}

export function addProjectToMasterlist(project) {
  if (project != false) {
    masterlist.push(project);
    populateStorage();
  }
}
