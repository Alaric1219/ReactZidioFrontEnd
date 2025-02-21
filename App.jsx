import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";  // ✅ Correct Path
import LoginPage from "./components/LoginPage.jsx";  // ✅ Correct Path
import Dashboard from "./components/DashBoard.jsx";  // ✅ Correct Path
import "./index.css";  // Ensure CSS is loaded

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default App;