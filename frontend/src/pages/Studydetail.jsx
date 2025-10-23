// src/pages/Studydetail.jsx
import { useParams } from "react-router-dom";
import "./Studydetail.css";
import { useEffect, useState } from "react"; // ✅ (추가) useState
import { FaUser, FaHashtag, FaCalendarAlt, FaUsers,MdOutlineChatBubble} from "react-icons/fa";
import StatusBadge from "../components/StatusBadge.jsx";

export default function Studydetail() {
  const { id } = useParams(); // /studies/:id 에서 id 가져오기

  const [study, setStudy] = useState(null); // ✅ (추가) 상세 데이터 상태
  const [error, setError] = useState(""); // ✅ (추가) 에러 메시지 상태(선택)

  useEffect(() => {
    fetch(`http://localhost:3001/study_details?id=${id}`)
      .then((res) => {
        // ✅ (추가) HTTP 오류 처리
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // ✅ (개선) { data: {...} }와 그냥 {...} 모두 대응
        if (data?.code === "ISE") {
          // 서버가 에러 바디를 반환하는 경우
          throw new Error(data?.message || "Internal server error.");
        }
        setStudy(Array.isArray(data) ? data[0]?.data ?? data[0] : null);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
        setError(err.message || "불러오기 실패");
      });
  }, [id]); // ✅ (수정) id 변할 때 재호출

  // 없는 경우/에러 처리
  if (!study) {
    return (
      <div className="container">
        <div className="title">모임상세보기</div>
        <div className="board">
          {error ? `오류: ${error}` : "해당 스터디를 찾을 수 없습니다."}
        </div>
      </div>
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

  return (
    <div className="container">
      <div className="title">모임상세보기</div>

      <div className="board">
        <div className="board_header">
          <span className="board_title_text">{study_title}</span>
        </div>

        <div className=" organizer">
          <FaUser className="icon icon_user" />
          <span className="study_info_section">주최자</span>
          <span className="distribute_bar">|</span>
          <span>{organizer?.organizer_name ?? "홍길동"}</span>
        </div>

        <div className=" study_topic">
          <FaHashtag className="icon hashtag_icon" />
          <span className="study_info_section">주제</span>
          <span className="distribute_bar">|</span>
          <span>{study_topic}</span>
        </div>

        <div className=" date">
          <FaCalendarAlt className="icon icon_calendar" />
          <span className="study_info_section">
            모집기간 <span className="distribute_bar">|</span>
          </span>
          <span>
            {start_date} ~ {end_date}
          </span>
        </div>

        <div className=" participants">
          <FaUsers className="icon icon_users" />
          <span className="study_info_section">모집인원</span>
          <span className="distribute_bar">|</span>
          <span>
            {current_participants}/{max_participants}
          </span>
          <StatusBadge status={status} />
        </div>
        <div className="wrapper_content">
          <p className="content">{description}</p>
        </div>
         <MdOutlineChatBubble></MdOutlineChatBubble>
        <div className="openchat">오픈채팅방 링크{chat_link}</div>
      </div>
    </div>
  );
}
