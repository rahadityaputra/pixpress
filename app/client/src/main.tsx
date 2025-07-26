import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App";
import { Theme } from "@radix-ui/themes";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Theme>
        <App />
      </Theme>
    </StrictMode>,
  );
} else {
  console.error("Elemen dengan ID 'root' tidak ditemukan di dokumen HTML.");
}
