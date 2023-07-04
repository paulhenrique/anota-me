import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import registerServiceWorker from "./registerServiceWorkers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerServiceWorker();
