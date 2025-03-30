import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// window.addEventListener('beforeunload', function (e) {
//   var mesg = 'Are you sure you want to Reload?';
//   e.returnValue = mesg;
// });
