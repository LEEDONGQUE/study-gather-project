import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login-page/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import Studydetail from "./pages/Studydetail";

//  모달 컨텍스트 흡수 (경로는 팀원 코드 기준)
import { useModal } from "./pages/login-page/useModal";
import ModalProvider from "./pages/login-page/ModalProvider";

//추가
import styled from "styled-components";

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
    <ModalProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/studies/:id" element={<Studydetail />} />
          {/* <Route path="login" element={<LoginRouteSync />} /> */}
          <Route path="login" element={<LoginPage />} />

          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ModalProvider>
  );
}

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;
