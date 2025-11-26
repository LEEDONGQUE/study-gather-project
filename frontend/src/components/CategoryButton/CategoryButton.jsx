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
// ✅ 공통 스타일 (이게 예전의 className="category-btn" 역할)
const CategoryBtnBase = styled.div`
  display: inline-flex; /* 배지 크기가 부모에 의해 늘어나지 않음 */
  align-items: center;
  gap: 6px;

  padding: 4px 10px; /* 작고 깔끔한 배지 크기 */
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  color: #333;
  font-size: 13px;

  width: fit-content; /* 내용만큼만 크기 유지 */
  white-space: nowrap; /* 줄바꿈 금지 */
  user-select: none;

  .btn-icon {
    font-size: 16px;
  }
`