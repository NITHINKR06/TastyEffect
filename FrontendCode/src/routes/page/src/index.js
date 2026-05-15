import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ThemeProvider from "./context/ThemeContext/ThemeProvider";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
);
