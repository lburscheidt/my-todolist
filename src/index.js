import "./style.css";
console.log("hello");
if (process.env.NODE_ENV !== "production") {
	console.log("We're in development mode.");
}

import { getMasterlist, populateStorage } from "./todos-logic";
import { createMasterlistDropdown } from "./todos-ui";

getMasterlist();
populateStorage();
createMasterlistDropdown();
