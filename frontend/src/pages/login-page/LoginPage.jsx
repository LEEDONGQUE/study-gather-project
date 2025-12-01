import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import loginPageImg from "../../assets/login_logo.png";
import { useModal } from "./useModal"; 
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const overlayRef = useRef(null);
  const { closeModal, openSignup } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 상태 관리 (UI 입력값)
  const [loginInfo, setLoginInfo] = useState({
    student_number: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 학번 숫자만 입력받기 처리
    if (name === "student_number") {
      const numericValue = value.replace(/[^0-9]/g, '');
      setLoginInfo(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setLoginInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleClose = useCallback(() => {
    closeModal();
    // 로그인 페이지에서 직접 접속했을 경우 메인으로 이동
    if (location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [closeModal, location, navigate]);

  // 2. 로그인 요청 함수
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 유효성 검사
    if (!loginInfo.student_number || !loginInfo.password) {
      setErrorMessage("학번과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 3. 백엔드 API 호출
      // 중요: 백엔드 LoginRequestDto의 필드명(studentNumber)에 맞춰서 데이터 전송
      const response = await axios.post('http://localhost:8080/users/login', {
        studentNumber: loginInfo.student_number, // ★ 변수명 매핑 주의
        password: loginInfo.password
      });

      // 4. 응답 처리 (ApiResponseDto 구조: { status, message, data: "토큰문자열" })
      // 백엔드 Service 코드를 보면 data 필드에 토큰 문자열을 바로 담아서 줍니다.
      const token = response.data.data;

      if (token) {
        // 토큰 저장 (Bearer 접두사 확인 후 저장)
        const finalToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        localStorage.setItem('accessToken', finalToken);
        
        // axios 기본 헤더 설정 (선택 사항: 이후 요청 편의성 위해)
        axios.defaults.headers.common['Authorization'] = finalToken;

        alert("로그인에 성공했습니다!");
        handleClose(); // 모달 닫기
        navigate("/"); // 메인 페이지 이동 (새로고침 효과)
        window.location.reload(); // 상태 업데이트를 위해 새로고침 (선택)
      } else {
        setErrorMessage("토큰을 받아오지 못했습니다.");
      }

    } catch (error) {
      console.error("로그인 에러:", error);
      if (error.response) {
        // 백엔드에서 보낸 에러 메시지가 있다면 표시
        const msg = error.response.data.message || "로그인에 실패했습니다.";
        setErrorMessage(msg);
      } else {
        setErrorMessage("서버와 연결할 수 없습니다. 네트워크를 확인해주세요.");
      }
    }
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return createPortal(
    <Overlay
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      aria-modal="true"
      role="dialog"
    >
      <ModalBox>
        <CloseButton onClick={handleClose} aria-label="닫기">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block" }}>
            <path fill="#174579" d="M6.4 5l12.6 12.6-1.4 1.4L5 6.4 6.4 5zM5 17.6 17.6 5l1.4 1.4L6.4 19 5 17.6z" />
          </svg>
        </CloseButton>

        <Logo src={loginPageImg} alt="로그인페이지 로고" />
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <Form onSubmit={handleLoginSubmit}>
          <Input
            type="text"
            placeholder="학번"
            inputMode="numeric"
            name="student_number"
            value={loginInfo.student_number}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <LoginButton type="submit">로그인</LoginButton>
        </Form>
        <SwitchRow>
          <SwitchLink type="button" onClick={openSignup}>회원가입</SwitchLink>
        </SwitchRow>
      </ModalBox>
    </Overlay>,
    document.body
  );
}

// --- 스타일 컴포넌트 (기존 스타일 유지) ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 400px;
  height: 450px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 4px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 32px 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
`;

const Logo = styled.img`
  height: 160px;
  flex-shrink: 0;
  aspect-ratio: 97/90;
  margin-top: -20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;

const Input = styled.input`
  display: flex;
  width: 280px;
  padding: 20px 25px;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 0.3px solid #BEC5CD;
  background: #F5F5F5;
  outline: none;

  &:focus {
    border-color: #174579;
  }
`;

const LoginButton = styled.button`
  display: flex;
  height: 45px;
  width: 200px;
  padding: 14px 0 15.085px 0;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #174579;
  background: #fff;
  color: #174579;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SwitchRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const SwitchLink = styled.button`
  background: none;
  border: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;

const ErrorMessage = styled.p`
  color: #e01e5a;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  height: 20px;
  text-align: center;
`;
 

        
 
      
       
