import ictIcon from "../assets/ICT.png";
import "./HomePage.css";
import Pagecontrol from "../components/Pagecontrol/Pagecontrol";
import { IoShareOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const location = useLocation();
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/studies?page=1&size=10");
        
        if (response.data.data && response.data.data.content) {
           setStudies(response.data.data.content);
        }
      } catch (err) {
        console.error("스터디 목록 로드 실패:", err);
      }
    };
    fetchStudies();
  }, [location]);

  return (
    <main>
      <div className="banner">
        <img src={ictIcon} alt="ICT이미지" className="image" />
        <div className="text-all">
          <div className="bar"></div>
          <div className="text-line1">
            <span className="common-text major">정보통신공학과</span>{" "}
            <span className="common-text study">스터디 모임</span>{" "}
          </div>
          <span className="common-text eng">
            Information & Communication Engineering Study Group
          </span>
          <div className="text-line2">
            <span className="common-text kor-univ">한국외국어대학교</span>{" "}
            <span className="dot">&middot;</span>
            <span className="common-text eng-univ">
              Hankuk University Of Foreign Studies
            </span>
          </div>
        </div>
        <button
          className="overlay-btn"
          onClick={() =>
            (window.location.href = "https://ice.hufs.ac.kr/ice/index.do")
          }
        >
          <IoShareOutline
            size={18}
            style={{ marginRight: "6px", color: "white" }}
          />
          <span className="btn-text">학과 홈페이지</span>
        </button>
      </div>

      <section className="categories"></section>

      <section className="study-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
        {studies.length === 0 ? (
            <p style={{ color: '#666', marginTop: '20px' }}>등록된 스터디가 없습니다.</p>
        ) : (
            studies.map((study) => (
                <Link to={`/studies/${study.studyId}`} key={study.studyId} style={{ textDecoration: 'none', color: 'inherit', width: '60%', border: '1px solid #ddd', padding: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#174579' }}>{study.studyTitle}</h3>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#555' }}>
                        <span style={{ fontWeight: 'bold' }}>#{study.studyTopic}</span>
                        <span>📅 {study.startDate} ~ {study.endDate}</span>
                        <span>👥 {study.currentParticipants}/{study.maxParticipants}명</span>
                        <span>{study.status === "RECRUITING" ? "🔵 모집중" : "🔴 마감"}</span>
                    </div>
                </Link>
            ))
        )}
      </section>

      <section className="page-controls">
        <Pagecontrol />
      </section>
    </main>
  );
}
