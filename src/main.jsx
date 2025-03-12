import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Pagination from "./Pagination";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Pagination />
  </BrowserRouter>
);