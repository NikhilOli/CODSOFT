import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FilterContextProvider } from "./components/FilterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </StrictMode>
);
