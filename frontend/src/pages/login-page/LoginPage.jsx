import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import loginPageImg from "../../assets/login_logo.png";
import { useModal } from "./useModal";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const overlayRef = useRef(null);
  const { closeModal, openSignup } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    closeModal();
    if (location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

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

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          <Input
            type="text"
            placeholder="학번"
            inputMode="numeric" pattern="[0-9]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
          <Input type="password" placeholder="비밀번호" />
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

/* .modal-overlay */
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

/* .modal-box */
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

/* .modal-close */
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

/* form */
const Form = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;

/* .modal-input */
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

/* .modal-login-btn */
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