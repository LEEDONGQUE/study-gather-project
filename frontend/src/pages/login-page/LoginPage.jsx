import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import loginPageImg from "../../assets/login_logo.png";
import { useModal } from "./useModal"; // 경로는 프로젝트 구조에 맞게 확인 필요
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const overlayRef = useRef(null);
  const { closeModal, openSignup } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 상태 관리: 백엔드 DTO(LoginRequestDto)에 맞춰 key를 'email'로 변경
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = useCallback(() => {
    closeModal();
    if (location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [closeModal, location, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 유효성 검사
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 2. 백엔드 API 호출 (실제 주소 사용)
      const response = await axios.post("http://localhost:8080/users/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      // 3. 토큰 처리 (백엔드 응답 헤더 또는 바디 확인)
      // 보통 JWT는 헤더의 'Authorization' 혹은 바디의 'accessToken'에 담겨 옵니다.
      // 여기서는 헤더를 우선적으로 확인하고, 없으면 바디를 확인하도록 작성했습니다.
      const token =
        response.headers["authorization"] || response.data.accessToken;

      if (token) {
        // Bearer 접두사가 없으면 붙여서 저장 (편의상)
        const finalToken = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("accessToken", finalToken);

        // 이후 요청을 위해 axios 기본 헤더 설정 (선택 사항)
        axios.defaults.headers.common["Authorization"] = finalToken;

        alert("로그인에 성공했습니다!");
        handleClose(); // 모달 닫기
        navigate("/"); // 메인으로 이동
      } else {
        // 성공은 했으나 토큰이 없는 경우
        console.error("토큰이 응답에 없습니다.", response);
        setErrorMessage("로그인 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      if (error.response) {
        const status = error.response.status;
        switch (status) {
          case 401: // Unauthorized
            setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
            break;
          case 404: // Not Found
            setErrorMessage("존재하지 않는 사용자입니다.");
            break;
          case 400: // Bad Request
          case 422:
            setErrorMessage("입력 값이 올바르지 않습니다.");
            break;
          case 500:
            setErrorMessage(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            break;
          default:
            setErrorMessage(
              error.response.data.message || "로그인에 실패했습니다."
            );
        }
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
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <path
              fill="#174579"
              d="M6.4 5l12.6 12.6-1.4 1.4L5 6.4 6.4 5zM5 17.6 17.6 5l1.4 1.4L6.4 19 5 17.6z"
            />
          </svg>
        </CloseButton>

        <Logo src={loginPageImg} alt="로그인페이지 로고" />
        <ErrorMessage>{errorMessage}</ErrorMessage>

        <Form onSubmit={handleLoginSubmit}>
          <Input
            type="email" // 이메일 형식으로 변경
            placeholder="이메일" // 학번 -> 이메일로 변경
            name="email" // state 키와 일치 ('student_number' -> 'email')
            value={loginInfo.email}
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
          <SwitchLink type="button" onClick={openSignup}>
            회원가입
          </SwitchLink>
        </SwitchRow>
      </ModalBox>
    </Overlay>,
    document.body
  );
}

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
  border: 0.3px solid #bec5cd;
  background: #f5f5f5;
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
  cursor: pointer; /* 마우스 오버 시 손가락 모양 추가 */

  &:hover {
    background: #f0f0f0; /* 호버 효과 추가 */
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
  color: #555;
`;

const ErrorMessage = styled.p`
  color: #e01e5a;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  height: 20px;
  text-align: center;
`;
