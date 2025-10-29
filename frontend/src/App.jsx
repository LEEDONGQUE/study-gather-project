import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginpage/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

function Layout() {
  return (
    <AppContainer>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </AppContainer>
  );
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;