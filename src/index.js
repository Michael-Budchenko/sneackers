import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "macro-css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
