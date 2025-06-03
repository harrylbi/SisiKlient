// INDEX (index.js) - Entry point of the React application

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css"; // Import Tailwind CSS

import { MahasiswaProvider } from "./context/MahasiswaContext";
import { DosenProvider } from "./context/DosenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MahasiswaProvider>
      <DosenProvider>
        <Router>
          <App />
        </Router>
      </DosenProvider>
    </MahasiswaProvider>
  </React.StrictMode>
);
