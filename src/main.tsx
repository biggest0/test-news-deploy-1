import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import HomeNotice from "./HomeNotice.tsx";
import NavBar from "./NavBar";
import Footer from "./Footer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavBar />
    <HomeNotice />
    <App />
    <Footer />
  </StrictMode>
);
