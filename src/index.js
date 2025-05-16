import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import "./reset.css";
import App from "./App";
import Demo from "./pages/Demo";
import LessDom from "./pages/LessDom";
import Transition from "./pages/Transition";
import Effect from "./pages/Effect";
import Performance from "./pages/performance";
// import Performance from "./pages/performance-xiugai";
// import Performance from "./pages/performance1-xiugai";
import reportWebVitals from "./reportWebVitals";

console.log(`React.version: v${React.version}`);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Transition />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
