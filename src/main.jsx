import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "../styles/GlobalStyle.jsx";
import "../styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);
