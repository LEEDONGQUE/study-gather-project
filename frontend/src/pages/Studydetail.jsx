import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaHashtag, FaCalendarAlt, FaUsers } from "react-icons/fa";
import StatusBadge from "../components/StatusBadge.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaUserCheck, FaCheckCircle } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import ApplicantModal from "./ApplicantModal.jsx";
import ApplicantStatus from "./ApplicantStatus.jsx";

export default function Studydetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/study_details?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStudy(Array.isArray(data) ? data[0]?.data ?? data[0] : null);
      })
      .catch((err) => setError(err.message || "불러오기 실패"));
  }, [id]);

  if (!study) {
    return (
      <Container>
        <Title>모임상세보기</Title>
        <Board>
          {error ? `오류: ${error}` : "해당 스터디를 찾을 수 없습니다."}
        </Board>
      </Container>
    );
  }

  const {
    study_title,
    study_topic,
    description,
    current_participants,
    max_participants,
    start_date,
    end_date,
    status,
    organizer,
    chat_link,
  } = study;

  async function deleteClick() {
    if (window.confirm("모임을삭제 하시겠습니까?")) {
      await fetch(`http://localhost:3001/study_details/${id}`, {
        method: "DELETE",
      });
      await fetch(`http://localhost:3002/study_list/${id}`, {
        method: "DELETE",
      });
      navigate("/status", { replace: true });
    }
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`, {
      state: {
        mode: "edit", // 어떤 모드인가
        studyId: id,
      },
    });
  };
  // navigate() 할 때 state라는 옵션을 쓰면, URL에는 안 보이지만 다음 페이지에 몰래 전달되는 데이터를 넣을 수 있어.

  return (
    <Container>
      <Title>모임상세보기</Title>

      <Board>
        <BoardHeader>
          <BoardTitleText>{study_title}</BoardTitleText>
        </BoardHeader>

        <InfoRow>
          <FaUser className="icon" />
          <StudyInfoSection>주최자</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{organizer?.organizer_name ?? "홍길동"}</span>
        </InfoRow>

        <InfoRow>
          <FaHashtag className="icon" />
          <StudyInfoSection>주제</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{study_topic}</span>
        </InfoRow>

        <InfoRow>
          <FaCalendarAlt className="icon" />
          <StudyInfoSection>모집기간</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>
            {start_date} ~ {end_date}
          </span>
        </InfoRow>

        <InfoRow>
          <FaUsers className="icon" />
          <StudyInfoSection>모집인원</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>
            {current_participants}/{max_participants}
          </span>
          <StatusBadge status={status} />
        </InfoRow>

        <WrapperContent>
          <Content>{description}</Content>
        </WrapperContent>
        <ChatRow>
          <OpenChat style={{ marginBottom: "10px" }}>
            <FiMessageCircle
              style={{
                fontSize: "20px",
                marginRight: "6px",
                color: "#5978acff",
              }}
            />
            {chat_link || "미등록"}
          </OpenChat>
        </ChatRow>
      </Board>

      <ButtonSection>
        <EditButton onClick={handleEdit}>
          <FaEdit style={{ marginRight: "6px" }} />
          수정
        </EditButton>

        <DeleteButton onClick={deleteClick}>
          <FaTrash style={{ marginRight: "6px" }} />
          삭제
        </DeleteButton>

        {/* 2) 신청자 현황 보기 버튼 */}
        <ApplicantButton onClick={() => setIsModalOpen(true)}>
          신청자 현황 보기
        </ApplicantButton>

        {/* 3) 모달 조건부 렌더링 */}
        {isModalOpen && (
          <ApplicantModal onClose={() => setIsModalOpen(false)}>
            <ApplicantStatus studyId={id} />
          </ApplicantModal>
        )}

        <CloseRecruitButton>
          <FaCheckCircle style={{ marginRight: "6px" }} />
          모집 완료하기
        </CloseRecruitButton>
      </ButtonSection>
    </Container>
  );
}

/* ---------------- styled-components ---------------- */

const Container = styled.div`
  * {
    box-sizing: border-box;
    font-family: "Noto Sans", sans-serif;
    font-weight: 400;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #174579;
  font-size: 40px;
  margin: 20px;
`;

const Board = styled.div`
  border: 1px solid #bec5cd;
  border-radius: 12px;
  margin: 0 50px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
`;

const BoardHeader = styled.div`
  background-color: #eef3fa;
  border-bottom: 1px solid #bec5cd;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;

const BoardTitleText = styled.span`
  display: inline-block;
  margin: 30px 20px;
  font-size: 30px;
`;

const InfoRow = styled.div`
  margin: 10px 0 10px 40px;
  color: #174579;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 10px;
    color: #174579;
  }
`;

const StudyInfoSection = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const DistributeBar = styled.span`
  color: #bec5cd;
  margin: 0 10px;
`;

const WrapperContent = styled.div`
  border-top: 1px solid #bec5cd;
`;

const Content = styled.p`
  width: 100%;
  white-space: normal;
  word-break: break-word;
  line-height: 1.6;
  text-align: left;
  padding: 15px;
  min-height: 200px;
`;

const ChatRow = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-top: 10px;

  .icon_chat {
    color: #793d17ff;
    margin-right: 10px;
  }
`;

const OpenChat = styled.div`
  background-color: #eef3fa;
  width: 25%;
  border: 1px solid #bec5cd;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 */
  grid-template-rows: 1fr 1fr; /* 2행 */
  gap: 12px; /* 버튼 간 간격 */
  margin-top: 24px;
  width: 50%;
  margin: 24px auto 0; /* ⬅ 가운데 정렬 핵심 */
`;
const EditButton = styled.button`
  justify-content: center;

  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 80px;
  background-color: #ffffff;
  color: #444;
  border: 1px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const DeleteButton = styled.button`
  justify-content: center;

  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 80px;
  background-color: #ffffff;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #fff5f5;
  }
`;

/* 2행: 신청자 현황 / 모집 완료 */

const ApplicantButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 8px 80px;
  background-color: #ffffff;

  color: #3c8f3c; /* 진한 초록 글자 */
  border: 1px solid #a3d7a2; /* 연초록 테두리 */
  border-radius: 8px;

  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5fff5; /* 아주 연한 초록 배경 */
  }
`;

const CloseRecruitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  padding: 8px 80px;
  background-color: #ffffff;

  color: #5a8ee1; /* 파스텔 블루 텍스트 */
  border: 1px solid #cfe2ff; /* 파스텔 하늘색 테두리 */
  border-radius: 8px;

  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f3f8ff; /* 부드러운 파스텔 블루 배경 */
  }
`;
