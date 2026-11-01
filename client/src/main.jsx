import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import {Toaster} from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster toastOptions={{ style: { background: "var(--surface)", color: "var(--primary)", border: "1px solid var(--divider)" } }}/>
    </Provider>
  </StrictMode>
);