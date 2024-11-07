export let masterlist = getMasterlist();

export function getMasterlist() {
  if (localStorage.getItem("masterlist")) {
    return JSON.parse(localStorage.getItem("masterlist"));
  } else {
    return [];
  }
}


export function createTodo(todoTitle, todoDesc, todoDueDate, todoPriority) {
  return { todoTitle, todoDesc, todoDueDate, todoPriority };
}

export function createProject(projectTitle) {
  if (masterlist.projectTitle) {
    alert("Please pick a different title");
  }
  let projectTodos = [];
  return { projectTitle, projectTodos };
}

export function addTodoToProject(todo, project) {
  project.projectTodos.push(todo);
  populateStorage();
}

export function addProjectToMasterlist(project) {
  masterlist.push(project);
  populateStorage();
}

function populateStorage() {
  localStorage.setItem("masterlist", JSON.stringify(masterlist));
}

// unction getMasterlist() {
// et storedList = localStorage.getItem("masterlist");
//  masterlist = JSON.parse(storedList);
//
