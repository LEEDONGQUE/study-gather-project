import styled from "styled-components";

export default function ApplicantModal({ onClose, children }) {
  return (
    <Backdrop onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
      </Content>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Content = styled.div`
  background: white;
  width: 420px;
  padding: 24px;
  border-radius: 12px;
`;

const CloseBtn = styled.button`
  margin-top: 20px;
  width: 100%;
`;
