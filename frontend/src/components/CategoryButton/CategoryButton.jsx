import styled from "styled-components";
import { FaComputer } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";

export function MajorButton() {
  return (
    <CategoryBtnBase>
      <FaComputer className="btn-icon" style={{ color: "#3faeea" }} />
      <span>전공</span>
    </CategoryBtnBase>
  );
}

export function AssignmentButton() {
  return (
    <CategoryBtnBase>
      <FaRegFileAlt className="btn-icon" style={{ color: "#000" }} />
      <span>과제</span>
    </CategoryBtnBase>
  );
}

export function ThesisButton() {
  return (
    <CategoryBtnBase>
      <FaBook className="btn-icon" style={{ color: "#000" }} />
      <span>논문</span>
    </CategoryBtnBase>
  );
}

export function InterviewButton() {
  return (
    <CategoryBtnBase>
      <IoMdPeople className="btn-icon" style={{ color: "#1ec373" }} />
      <span>면접</span>
    </CategoryBtnBase>
  );
}

export function CertificateButton() {
  return (
    <CategoryBtnBase>
      <AiTwotoneSafetyCertificate
        className="btn-icon"
        style={{ color: "#e13ca7" }}
      />
      <span>자격증</span>
    </CategoryBtnBase>
  );
}

export function ContestButton() {
  return (
    <CategoryBtnBase>
      <FaAward className="btn-icon" style={{ color: "#f6c50d" }} />
      <span>공모전</span>
    </CategoryBtnBase>
  );
}

export function StartupButton() {
  return (
    <CategoryBtnBase>
      <FaMoneyBillWave className="btn-icon" style={{ color: "#e4b200" }} />
      <span>창업</span>
    </CategoryBtnBase>
  );
}

export function LanguageButton() {
  return (
    <CategoryBtnBase>
      <FaLanguage className="btn-icon" style={{ color: "#b45d13" }} />
      <span>외국어</span>
    </CategoryBtnBase>
  );
}

//  DefaultTag 컴포넌트 (흰색 화면 오류 원인 해결)
export function DefaultTag() {
  return (
    <CategoryBtnBase>
      <span style={{ padding: "0 4px", color: "#888" }}>기타</span>
    </CategoryBtnBase>
  );
}


const CategoryBtnBase = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  font-size: 13px;

  width: fit-content;
  white-space: nowrap;
  user-select: none;

  .btn-icon {
    font-size: 16px;
  }
`;
