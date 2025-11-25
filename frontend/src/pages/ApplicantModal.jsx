import styled from "styled-components";
import { BigWrapper } from "./ApplicantStatus";
import { AiOutlineClose } from "react-icons/ai";

export default function ApplicantModal({ onClose, children }) {
  return (
    <Backdrop onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <AiOutlineClose size={20} />
        </CloseBtn>

        {children}
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

export const Content = styled.div`
  position: relative; /* 🔥 꼭 있어야 함 */
  background: #fff;
  padding: 20px;
  border-radius: 12px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border-radius: 50%;

  &:hover {
    background: #eee;
  }
`;
