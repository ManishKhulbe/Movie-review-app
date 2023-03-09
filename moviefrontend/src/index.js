import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { ContextProviders } from "./components/context";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <ContextProviders>
    <App />
  </ContextProviders>
);
