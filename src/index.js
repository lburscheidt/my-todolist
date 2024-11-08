import "./style.css";
console.log("hello");
if (process.env.NODE_ENV !== "production") {
  console.log("We're in development mode.");
}
const header = document.querySelector("header");
import { masterlist, getMasterlist, populateStorage } from "./todos-logic";
import { createProject, addProjectToMasterlist } from "./projects-logic";
import {
  masterlistDropdown,
  createProjectBtn,
  createMasterlistDropdown,
  renderTodos,
  newProjectDialog,
  projectTitleInput,
  //projectDialogCloseBtn,
} from "./todos-ui";

getMasterlist();
populateStorage();
console.log(masterlist);
console.log(masterlistDropdown.value);
createMasterlistDropdown();

masterlistDropdown.addEventListener("click", () => {
  if (masterlistDropdown.value === "create-new") {
    newProjectDialog.showModal();
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
  let newProject = createProject(projectTitleInput.value);
  addProjectToMasterlist(newProject);
  console.log(masterlist);
  const index = masterlist.indexOf(newProject);
  console.log(index);
  renderTodos(index);
  createMasterlistDropdown();
  masterlistDropdown.selectedIndex = index + 2;
  //    createMasterlistDropdown();
  //    masterlistDropdown.selectedIndex = index + 2;
  //  });
  //
  //  renderTodos(index);
  //  projectDialogCloseBtn.addEventListener("click", () => {
  //    newProjectDialog.close();
});
