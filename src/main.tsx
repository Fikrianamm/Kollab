import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Toaster } from "./components/ui/toaster";
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
  </StrictMode>
);
