import "./style.css";
console.log("hello");
if (process.env.NODE_ENV !== "production") {
  console.log("We're in development mode.");
}
import { masterlist } from "./todos-logic";
import { newProjectFromDialog, createMasterlistDropdown } from "./todos-ui";
import {} from "./todos-logic";

document.addEventListener("DOMContentLoaded", () => {
  createMasterlistDropdown();
  newProjectFromDialog();
});
