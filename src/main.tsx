/* -----------------------------------------------------------------------------
 * File: main.tsx
 * Purpose: Application entry — mounts the React app to the DOM (#root).
 * If you need to change global CSS or add providers, update App.tsx instead.
 * ---------------------------------------------------------------------------- */


  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  