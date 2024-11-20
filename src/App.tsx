import { StrictMode } from "react";
import MoodChart from "./components/MoodChart/MoodChart.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";
import PWABadge from "./pwa/PWABadge.tsx";
import EncryptionDemo from "./components/EncryptionDemo.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
