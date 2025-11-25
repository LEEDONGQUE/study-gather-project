import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

      // 🔥 변경점1: status 기본값 추가
      const withStatus = result.data.map((item) => ({
        ...item,
        status: item.status || null, // 🔥 처음엔 status 없음 → null
      }));

      setApplicants(withStatus); // ⭐ 기존: setApplicants(result.data)
    };

    fetchApplicants();
  }, [studyId]);

  // 🔥 변경점2: 수락 처리 함수
  const handleAccept = async (userId) => {
    await fetch(`/studies/${studyId}/applicants/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        status: "Y",
      }),
    });

    // 🔥 변경점3: 프론트에서 해당 user_id의 status를 Y로 바꾸기
    setApplicants((prev) =>
      prev.map((item) =>
        item.user_id === userId ? { ...item, status: "Y" } : item
      )
    );
  };

  const startIndex = currentPage * itemsPerPage;
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
          <BigWrapper>
            {currentItems.map((item) => (
              <Card key={item.user_id}>
                <In_card_Left>
                  <FaUserCircle size={40} color="#C8C8C8" />
                </In_card_Left>

                <In_Card_Right>
                  <p>{item.student_number}</p>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                </In_Card_Right>

                {/* 🔥 변경점4: status에 따라 버튼/수락됨 분기 */}
                <Buttons>
                  {item.status === "Y" ? (
                    <AcceptedTag>수락됨</AcceptedTag>
                  ) : (
                    <>
                      <AcceptBtn onClick={() => handleAccept(item.user_id)}>
                        수락
                      </AcceptBtn>
                      <RejectBtn>거절</RejectBtn>
                    </>
                  )}
                </Buttons>
              </Card>
            ))}
          </BigWrapper>

          {/*  페이지네이션 */}
          <div className="pagination">
            <ButtonsWrapper>
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <FiChevronLeft size={20} />
              </button>

              <button
                disabled={startIndex + itemsPerPage >= applicants.length}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <FiChevronRight size={20} />
              </button>
            </ButtonsWrapper>
          </div>
        </>
      )}
    </div>
  );
}

export const AcceptedTag = styled.span`
  background: #d8f7e7;
  padding: 6px 12px;
  border-radius: 8px;
  color: #1a7f4b;
  font-weight: 600;
  white-space: nowrap;
`;

/* ================================
   기존 스타일 그대로
================================ */
export const BigWrapper = styled.div`
  border: 3px solid #e0e0e0ff;
  border-radius: 12px;
  padding: 10px 0;
`;

export const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 2px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

export const In_card_Left = styled.div`
  flex-shrink: 0;
`;

export const In_Card_Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
`;

export const AcceptBtn = styled.button`
  background: #d8f7e7;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #c2f1d8;
  }
`;

export const RejectBtn = styled.button`
  background: #ffe0e0;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #ffcdcd;
  }
`;

// 문제상황(새로고침시 저장안됨)
// ① 백엔드가 API명새서가 분리된 구조라서 → 신청자 조회 + 상태 조회 두 개를 합쳐야 함
// ② 수락 POST 후 → 프론트 상태 업데이트는 잘 되지만, 새로고침하면 Reset됨 → 상태 API에서 다시 불러와야 함

// fetchApplicants()만 있음 → ❌

// fetchStatus()도 해야 함 → ✔

// 둘을 merge 해서 setApplicants 해야 함 → ✔
