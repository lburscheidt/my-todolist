import "./style.css";
console.log("hello");
if (process.env.NODE_ENV !== "production") {
  console.log("We're in development mode.");
}

import { masterlist } from "./todo-logic";

console.log(masterlist);
