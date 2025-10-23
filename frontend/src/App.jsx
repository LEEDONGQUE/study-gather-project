import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import Studydetail from "./pages/Studydetail";
function Layout() {
  return (
    <div>
      <div className="app-container">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/studies/:id" element={<Studydetail />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
