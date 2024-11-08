export let masterlist = getMasterlist();

export function getMasterlist() {
  if (localStorage.getItem("masterlist")) {
    return JSON.parse(localStorage.getItem("masterlist"));
  } else {
    return [{ projectTitle: "Default project", projectTodos: [] }];
  }
  
}

export function createTodo(todoTitle, todoDesc, todoDueDate, todoPriority) {
  return { todoTitle, todoDesc, todoDueDate, todoPriority };
}

export function addTodoToProject(todo, projectNumber) {
  masterlist[projectNumber].projectTodos.push(todo);
  populateStorage();
}

export function populateStorage() {
  localStorage.setItem("masterlist", JSON.stringify(masterlist));
}
