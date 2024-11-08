import {
	addTodoToProject,
	masterlist,
	populateStorage,
	addProjectToMasterlist,
	createProject,
} from "./todos-logic";
const priorities = ["high", "normal", "low"];

const header = document.querySelector("header");
const body = document.querySelector("body");
const todos = document.querySelector("#todos");
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
export const masterlistDropdown = document.querySelector(
	"#masterlist-dropdown",
);
export const createProjectBtn = document.querySelector("#create-project-btn");
export const projectTitleInput = document.querySelector("#project-title-input");
export const newProjectDialog = document.querySelector("#new-project-dialog");
export const projectDialogCloseBtn = document.querySelector(
	"#project-dialog-close-btn",
);
const projectsOptgroup = document.querySelector("#projects-optgroup");

import { createTodo } from "./todos-logic";

export function renderTodos(projectIndex) {
	header.textContent = `${masterlist[projectIndex].projectTitle}`;
	todos.innerHTML = "";
	if (masterlist[projectIndex].projectTodos.length > 0) {
		console.log(masterlist[projectIndex].projectTodos);
		for (const todo of masterlist[projectIndex].projectTodos) {
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
			if (todoPriority === "high") {
				todoColor.style.backgroundColor = "firebrick";
			} else if (todoPriority === "normal") {
				todoColor.style.backgroundColor = "gold";
			} else if (todoPriority === "low") {
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
			for (const item of priorities) {
				const priority = document.createElement("option");
				priority.textContent = item;
				priority.value = item;
				todoPriorityDiv.appendChild(priority);
			}
			todoPriorityDiv.value = todoPriority;
			todoPriorityDiv.addEventListener("click", () => {
				todo.todoPriority = todoPriorityDiv.value;
				if (todo.todoPriority === "high") {
					todoColor.style.backgroundColor = "firebrick";
				} else if (todo.todoPriority === "normal") {
					todoColor.style.backgroundColor = "gold";
				} else if (todo.todoPriority === "low") {
					todoColor.style.backgroundColor = "forestgreen";
				}
				populateStorage();
			});
			todoDoneBtn.value = "Done";
			todoDoneBtn.textContent = "Done";
			todoDoneBtn.addEventListener("click", () => {
				const index = masterlist[projectIndex].projectTodos.indexOf(todo);
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
		}
	} else {
		void 0;
	}
}

export function createMasterlistDropdown() {
	projectsOptgroup.innerHTML = "";
	for (const project of masterlist) {
		const projectOption = document.createElement("option");
		projectOption.dataset.index = masterlist.indexOf(project);
		const value = project.projectTitle.toLowerCase().replace(" ", "-");
		projectOption.value = value;
		projectOption.textContent = project.projectTitle;
		projectsOptgroup.appendChild(projectOption);
	}
}

function createProjectsDropdown() {
	dialogProjectsOptgroup.innerHTML = "";
	for (const project of masterlist) {
		const projectOption = document.createElement("option");
		projectOption.dataset.index = masterlist.indexOf(project);
		const value = project.projectTitle.toLowerCase().replace(" ", "-");
		projectOption.value = value;
		projectOption.textContent = project.projectTitle;
		dialogProjectsOptgroup.appendChild(projectOption);
	}
}

masterlistDropdown.addEventListener("click", () => {
	if (masterlistDropdown.value === "create-new") {
		newProjectDialog.showModal();
		body.classList.add("modal-open");
	} else if (masterlistDropdown.value === "select-project") {
		void 0;
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
	const newProject = createProject(projectTitleInput.value);
	addProjectToMasterlist(newProject);
	console.log(masterlist);
	const index = masterlist.indexOf(newProject);
	console.log(index);
	renderTodos(index);
	createMasterlistDropdown();
	masterlistDropdown.selectedIndex = index + 2;
	createProjectsDropdown();
	todoProject.selectedIndex = index + 2;
	newProjectDialog.close();
	body.classList.remove("modal-open");
});

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
	const option = todoProject.options[todoProject.selectedIndex];

	const projectIndex = option.dataset.index;
	const newTodo = createTodo(
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

todoProject.addEventListener("click", () => {
	if (todoProject.value === "create-new") {
		newProjectDialog.showModal();
		body.classList.add("modal-open");
	} else {
		void 0;
	}
	//} else if (masterlistDropdown.value === "select-project") {
	//	void 0;
	//} else {
	//	const index =
	//		todoProject.options[todoProject.selectedIndex].dataset
	//			.index;
	//	const length = masterlist[index].projectTodos.length;
	//	if (length > 0) {
	//		console.log("There are todos here!");
	//		renderTodos(index);
	//	} else {
	//		todos.innerHTML = "";
	//	}
	//	header.textContent = `${masterlist[index].projectTitle}`;
	//}
});

todoDialogCloseBtn.addEventListener("click", () => {
	newTodoDialog.close();
	body.classList.remove("modal-open");
});

projectDialogCloseBtn.addEventListener("click", () => {
	body.classList.remove("modal-open");
	newProjectDialog.close();
});
