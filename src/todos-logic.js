export const masterlist = getMasterlist();

export function getMasterlist() {
	if (localStorage.getItem("masterlist")) {
		return JSON.parse(localStorage.getItem("masterlist"));
	}
	return [{ projectTitle: "Default project", projectTodos: [] }];
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

export function createProject(projectTitle) {
	if (masterlist.some((project) => project.projectTitle === projectTitle)) {
		alert("Please pick a different title");
		return false;
	}
	const projectTodos = [];
	return { projectTitle, projectTodos };
}

export function addProjectToMasterlist(project) {
	if (project !== false) {
		masterlist.push(project);
		populateStorage();
	}
}
