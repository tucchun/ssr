import React from "react";
import ReactDom from "react-dom";
import Hello from "./App";

const container = document.getElementById("root");
// const root = ReactDom.createRoot(container);
ReactDom.hydrate(<Hello />, container);