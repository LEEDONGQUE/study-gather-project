import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaHashtag, FaCalendarAlt, FaUsers, FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import StatusBadge from "../components/StatusBadge.jsx";
import { FiMessageCircle } from "react-icons/fi";
import ApplicantModal from "./ApplicantModal.jsx";
import ApplicantStatus from "./ApplicantStatus.jsx";
import axios from "axios";

export default function Studydetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/studies/${id}`);
        setStudy(response.data.data);
      } catch (err) {
        setError("불러오기 실패");
        console.error(err);
      }
    };
    fetchDetail();
  }, [id]);

  if (error) {
    return (
      <Container>
        <Title>모임상세보기</Title>
        <Board>오류: {error}</Board>
      </Container>
    );
  }

  if (!study) {
    return (
      <Container>
        <Title>모임상세보기</Title>
        <Board>로딩 중...</Board>
      </Container>
    );
  }

  const {
    studyTitle,
    studyTopic,
    description,
    currentParticipants,
    maxParticipants,
    startDate,
    endDate,
    status,
    organizerName,
    chatLink,
  } = study;

  async function deleteClick() {
    if (window.confirm("모임을 삭제 하시겠습니까?")) {
      alert("백엔드 삭제 API가 아직 구현되지 않았습니다.");
    }
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`, {
      state: { mode: "edit", studyId: id },
    });
  };

  return (
    <Container>
      <Title>모임상세보기</Title>

      <Board>
        <BoardHeader>
          <BoardTitleText>{studyTitle}</BoardTitleText>
        </BoardHeader>

        <InfoRow>
          <FaUser className="icon" />
          <StudyInfoSection>주최자</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{organizerName || "알 수 없음"}</span>
        </InfoRow>

        <InfoRow>
          <FaHashtag className="icon" />
          <StudyInfoSection>주제</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{studyTopic}</span>
        </InfoRow>

        <InfoRow>
          <FaCalendarAlt className="icon" />
          <StudyInfoSection>모집기간</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{startDate} ~ {endDate}</span>
        </InfoRow>

        <InfoRow>
          <FaUsers className="icon" />
          <StudyInfoSection>모집인원</StudyInfoSection>
          <DistributeBar>|</DistributeBar>
          <span>{currentParticipants}/{maxParticipants}</span>
          <StatusBadge status={status} />
        </InfoRow>

        <WrapperContent>
          <Content>{description}</Content>
        </WrapperContent>
        <ChatRow>
          <OpenChat style={{ marginBottom: "10px" }}>
            <FiMessageCircle style={{ fontSize: "20px", marginRight: "6px", color: "#5978acff" }} />
            {chatLink ? (
                <a href={chatLink} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {chatLink}
                </a>
            ) : "미등록"}
          </OpenChat>
        </ChatRow>
      </Board>

      <ButtonSection>
        <EditButton onClick={handleEdit}>
          <FaEdit style={{ marginRight: "6px" }} />수정
        </EditButton>

        <DeleteButton onClick={deleteClick}>
          <FaTrash style={{ marginRight: "6px" }} />삭제
        </DeleteButton>

        <ApplicantButton onClick={() => setIsModalOpen(true)}>
          신청자 현황 보기
        </ApplicantButton>

        {isModalOpen && (
          <ApplicantModal onClose={() => setIsModalOpen(false)}>
            <ApplicantStatus studyId={id} />
          </ApplicantModal>
        )}

        <CloseRecruitButton>
          <FaCheckCircle style={{ marginRight: "6px" }} />모집 완료하기
        </CloseRecruitButton>
      </ButtonSection>
    </Container>
  );
}

const Container = styled.div` * { box-sizing: border-box; font-family: "Noto Sans", sans-serif; font-weight: 400; } `;
const Title = styled.h1` display: flex; justify-content: center; align-items: center; color: #174579; font-size: 40px; margin: 20px; `;
const Board = styled.div` border: 1px solid #bec5cd; border-radius: 12px; margin: 0 50px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25); `;
const BoardHeader = styled.div` background-color: #eef3fa; border-bottom: 1px solid #bec5cd; border-top-left-radius: 12px; border-top-right-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); `;
const BoardTitleText = styled.span` display: inline-block; margin: 30px 20px; font-size: 30px; `;
const InfoRow = styled.div` margin: 10px 0 10px 40px; color: #174579; display: flex; align-items: center; .icon { margin-right: 10px; color: #174579; } `;
const StudyInfoSection = styled.span` display: inline-block; margin-right: 10px; `;
const DistributeBar = styled.span` color: #bec5cd; margin: 0 10px; `;
const WrapperContent = styled.div` border-top: 1px solid #bec5cd; `;
const Content = styled.p` width: 100%; white-space: normal; word-break: break-word; line-height: 1.6; text-align: left; padding: 15px; min-height: 200px; `;
const ChatRow = styled.div` display: flex; align-items: center; margin-left: 40px; margin-top: 10px; .icon_chat { color: #793d17ff; margin-right: 10px; } `;
const OpenChat = styled.div` background-color: #eef3fa; width: 25%; border: 1px solid #bec5cd; border-radius: 12px; padding: 10px; display: flex; align-items: center; `;
const ButtonSection = styled.div` display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 12px; margin-top: 24px; width: 50%; margin: 24px auto 0; `;
const EditButton = styled.button` justify-content: center; display: flex; align-items: center; gap: 6px; padding: 8px 80px; background-color: #ffffff; color: #444; border: 1px solid #cccccc; border-radius: 8px; cursor: pointer; font-size: 14px; &:hover { background-color: #f4f4f4; } `;
const DeleteButton = styled.button` justify-content: center; display: flex; align-items: center; gap: 6px; padding: 8px 80px; background-color: #ffffff; color: #e74c3c; border: 1px solid #e74c3c; border-radius: 8px; cursor: pointer; font-size: 14px; &:hover { background-color: #fff5f5; } `;
const ApplicantButton = styled.button` display: flex; justify-content: center; align-items: center; gap: 6px; padding: 8px 80px; background-color: #ffffff; color: #3c8f3c; border: 1px solid #a3d7a2; border-radius: 8px; cursor: pointer; font-size: 14px; &:hover { background-color: #f5fff5; } `;
const CloseRecruitButton = styled.button` display: flex; justify-content: center; align-items: center; gap: 6px; padding: 8px 80px; background-color: #ffffff; color: #5a8ee1; border: 1px solid #cfe2ff; border-radius: 8px; cursor: pointer; font-size: 14px; &:hover { background-color: #f3f8ff; } `;
