import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import loginPageImg from "../../assets/login_logo.png";
import { useModal } from "../login-page/useModal";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignupPage() {
    const overlayRef = useRef(null);
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        closeModal();
        if (location.pathname === "/signup") {
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && handleClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // TODO: 회원가입 처리 로직
        handleClose();
    };

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

                <Logo src={loginPageImg} alt="STUDYHUB 로고" />

                <Form onSubmit={submit}>
                    <Input type="text" placeholder="이름을 입력해주세요" />
                    <Input type="text" placeholder="학번을 입력해주세요" />
                    <Input type="email" placeholder="이메일을 입력해주세요" />
                    <Input type="password" placeholder="비밀번호를 입력해주세요" />
                    <Input type="password" placeholder="비밀번호를 확인해주세요" />

                    <AgreeRow>
                        <input id="agree" type="checkbox" required />
                        <AgreeLabel htmlFor="agree">
                            이용 약관 보기 및 개인정보 처리방침에 동의합니다.
                        </AgreeLabel>
                    </AgreeRow>

                    <PrimaryButton type="submit">회원가입</PrimaryButton>
                </Form>

            </ModalBox>
        </Overlay>,
        document.body
    );
}

/* === styles === */

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
  min-height: 500px;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 4px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 32px 40px 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
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

  &:hover { transform: scale(1.05); }
`;

const Logo = styled.img`
  height: 120px;
  margin-top: 8px;
  margin-bottom: 8px;
  object-fit: contain;
`;

const Form = styled.form`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  display: flex;
  height: 40px;
  padding: 20px 25px;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  border: 0.3px solid #BEC5CD;
  background: #F5F5F5;

  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder { color: #BEC5CD; }
  &:focus { border-color: #174579; }
`;

const AgreeRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 6px;

  input {
    width: 16px;
    height: 16px;
    accent-color: #174579;
    cursor: pointer;
  }
`;

const AgreeLabel = styled.span`
  font-size: 12.5px;
  color: #333;
`;

const PrimaryButton = styled.button`
  margin-top: 10px;
  display: flex;
  height: 50px;
  width: 220px;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  border: 1px solid #174579;
  background: #fff;
  color: #174579;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover { background: #f5f9ff; }
`;

const SwitchRow = styled.div`
  margin-top: 8px;
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
  color: #174579;

  &:hover { text-decoration: underline; }
`;