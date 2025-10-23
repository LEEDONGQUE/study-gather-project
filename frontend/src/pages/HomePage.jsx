//페이지네이션 있는 파트
//17분
// import { useEffect } from "react";
// import axios from "axios";
import ictIcon from "../assets/ICT.png";
import "./HomePage.css";
import Pagecontrol from "../components/Pagecontrol/Pagecontrol";
import { IoShareOutline } from "react-icons/io5";
export default function HomePage() {
  // useEffect(() => {
  //   const fetchStudys = async () => {
  //     const response = await axios("url", {
  //       headers: {
  //         Authorization: `Bearer ${import.meta.env.VITE_STUDYPAGE_KEY}`,
  //       },
  //     });
  //     console.log(response); // ✅ 콘솔 확인용
  //   };

  //   fetchStudys();
  // }, []);

  return (
    <main>
      {/* 배너 영역 */}
      <div className="banner">
        <img src={ictIcon} alt="ICT이미지" className="image" /> {/* 수정 */}
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

      {/* 카테고리 버튼 영역  여기 컴포넌트로 연결해주기*/}
      <section className="categories"></section>

      {/* 페이지네이션 영역 여기 컴포넌트로 연결해주기 */}
      <section className="page-controls">
        <Pagecontrol />
      </section>
    </main>
  );
}
