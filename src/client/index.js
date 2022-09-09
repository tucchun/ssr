import React from "react";
import ReactDom from "react-dom";
import Hello from "../shared/App";

const container = document.getElementById("root");
// const root = ReactDom.createRoot(container);
ReactDom.hydrate(<Hello />, container);