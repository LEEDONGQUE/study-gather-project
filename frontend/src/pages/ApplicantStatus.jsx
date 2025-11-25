import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function ApplicantStatus({ studyId }) {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3; // ⭐ 한 페이지에 세 명

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await fetch(
        `http://localhost:3002/applicant_modal?id=${studyId}`
      );

      const result = await res.json();
      setApplicants(result.data);
    };

    fetchApplicants();
  }, [studyId]);

  // ⭐ 페이지에서 보여줄 3명의 index 계산
  const startIndex = currentPage * itemsPerPage;

  // ⭐ 현재 페이지에 해당하는 사람 3명만 slice
  const currentItems = applicants.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaUser />
        <h2>신청자 현황</h2>
      </div>

      {currentItems.length === 0 ? (
        <p>신청자가 없습니다.</p>
      ) : (
        <>
          <div>
            {currentItems.map((item) => (
              <div className="applicant-card">
                <div className="left">
                  <FaUserCircle size={40} color="#C8C8C8" />
                </div>

                <div className="right">
                  <p>{item.student_number}</p>
                  <p>{item.name}</p>
                  <p>{item.email}</p>

                  <div className="buttons">
                    <button className="accept">수락</button>
                    <button className="reject">거절</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ⭐ 페이지네이션 */}
          <div className="pagination">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              이전
            </button>

            <button
              disabled={startIndex + itemsPerPage >= applicants.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #eaeaea;
`;

const ProfileIcon = styled.div`
  flex-shrink: 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .student {
    font-weight: 600;
  }

  .name {
    font-size: 15px;
  }

  .email {
    font-size: 13px;
    color: #666;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const AcceptBtn = styled.button`
  background: #d8f7e7;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;

const RejectBtn = styled.button`
  background: #ffe0e0;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`;
