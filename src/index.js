// Modules
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

// Components
import Content from "./modules/components/content";

// Render
ReactDOM.render(
  <BrowserRouter>
    <Content />
  </BrowserRouter>,
  document.getElementById("app")
);
