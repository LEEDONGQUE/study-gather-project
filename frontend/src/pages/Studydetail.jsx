import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaHashtag, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Studydetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        <Board>{error ? `오류: ${error}` : "해당 스터디를 찾을 수 없습니다."}</Board>
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
    if (window.confirm("삭제 하시겠습니까?")) {
      await fetch(`http://localhost:3001/study_details/${id}`, { method: "DELETE" });
      await fetch(`http://localhost:3002/study_list/${id}`, { method: "DELETE" });
      navigate("/status", { replace: true });
    }
  }

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
          <MdOutlineChatBubble className="icon_chat" />
          <OpenChat>오픈채팅방 링크 {chat_link || "미등록"}</OpenChat>
        </ChatRow>

        <DeleteButton onClick={deleteClick}>삭제</DeleteButton>
      </Board>
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
    color: #174579;
    margin-right: 10px;
  }
`;

const OpenChat = styled.div`
  background-color: #eef3fa;
  width: 25%;
  border: 1px solid #bec5cd;
  border-radius: 12px;
  padding: 10px;
`;

const DeleteButton = styled.button`
  background-color: #174579;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin: 20px 40px;
  cursor: pointer;
  &:hover {
    background-color: #12365c;
  }
`;
