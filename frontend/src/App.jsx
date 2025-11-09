import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login-page/LoginPage";
import SignupPage from "./pages/signup-page/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import Studydetail from "./pages/Studydetail";
import { ModalContext } from "./pages/login-page/useModal";
import ModalProvider from "./pages/login-page/ModalProvider";
import ModalRoot from "./pages/signup-page/ModalRoot";
import { useModal } from "./pages/login-page/useModal";
import styled from "styled-components";
import Createpage from "./pages/Createpage";

// 현재 모달 키에 따라 실제 모달 내용을 렌더링
function ModalHost() {
  const { modal } = useModal();
  if (modal === "login") return <LoginPage />;
  if (modal === "signup") return <SignupPage />;
  return null;
}

// /login 진입 시 모달 열기
function LoginRouteSync() {
  const { openLogin } = useModal();
  useEffect(() => {
    openLogin();
  }, [openLogin]);
  return null; // 모달은 ModalHost에서 렌더됨
}

function Layout() {
  return (
    <AppContainer>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
      <ModalHost />
    </AppContainer>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/studies/:id" element={<Studydetail />} />
          <Route path="login" element={<LoginRouteSync />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="status" element={<HomePage />} />
          <Route path="create" element={<Createpage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ModalRoot />
    </ModalProvider>
  );
}

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;
