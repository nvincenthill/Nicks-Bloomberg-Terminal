import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./css/main.css";
import "./css/main-tablet.css";
import "./css/main-desktop.css";
import "./css/animate.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
