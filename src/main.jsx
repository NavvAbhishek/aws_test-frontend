import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/users" element={<Users />}></Route>
    </Routes>
  </BrowserRouter>
);