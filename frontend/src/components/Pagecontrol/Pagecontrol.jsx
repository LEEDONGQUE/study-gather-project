import { useEffect, useState } from "react";
import axios from "axios";
import "./Pagecontrol.css";
import "../../types/study";
import StatusBadge from "../StatusBadge";
// ✅ 기존: import { Link } from "react-router-dom";
// 🔹 수정: Link 대신 useNavigate 사용
import { useNavigate } from "react-router-dom"; // ✅ 추가

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const endpoint = "/study_list";

export default function Pagecontrol() {
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate(); // ✅ 추가: 페이지 이동용 훅

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await axios(`${BASE_URL}${endpoint}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const payload = response?.data;
        const next = payload?.data?.studies ?? [];

        setStudies(next);
        console.log("받은 데이터:", next);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchStudy();
  }, []);

  return (
    <div className="table-wrap">
      <table className="all">
        <thead className="head">
          <tr>
            <th>주제</th>
            <th>모임 이름</th>
            <th>인원</th>
            <th>모집 기간</th>
            <th>상태</th>
          </tr>
        </thead>

        <tbody className="body">
          {!Array.isArray(studies) || studies.length === 0 ? (
            <tr>
              <td colSpan={5}>스터디가 없습니다.</td>
            </tr>
          ) : (
            studies.map((page, i) => (
              <tr
                key={page?.study_id ?? page?.id ?? i}
                className="study-row"
                onClick={() => navigate(`/studies/${page?.study_id}`)} // ✅ 추가: 행 클릭 시 상세 페이지 이동
              >
                <td>
                  <span className="topic-badge">{page?.study_topic ?? ""}</span>
                </td>
                <td>
                  <span>{page?.study_title ?? ""}</span>
                </td>
                <td>
                  <span>
                    {page?.current_participants ?? 0}/
                    {page?.max_participants ?? 0} 명
                  </span>
                </td>
                <td>
                  <span className="date">
                    {page?.start_date ?? ""} ~ {page?.end_date ?? ""}
                  </span>
                </td>
                <td>
                  {/*<button
                    className={`status-btn ${
                      page?.status === "모집중" ? "open" : "closed"
                    }`}
                  >
                    {page?.status ?? ""}
                  </button>*/}
                  <StatusBadge status={page?.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
