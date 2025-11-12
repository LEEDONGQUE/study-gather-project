import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StatusBadge from "../StatusBadge";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const endpoint = "/study_list";

export default function Pagecontrol() {
  const [studies, setStudies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 5; // 한 페이지당 표시 개수
  const groupSize = 4; // ✅ 한 번에 표시할 페이지 번호 수 (1~4)

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await axios(`${BASE_URL}${endpoint}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const payload = res?.data;
        const next = payload?.data?.studies ?? [];
        setStudies(next);
      } catch (e) {
        console.error("데이터 불러오기 실패:", e);
      }
    };
    fetchStudy();
  }, []);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(studies.length / itemsPerPage);

  // 현재 페이지 데이터
  const currentStudies = studies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ✅ 현재 그룹 계산 (예: 1~4, 5~8, 9~12 ...)
  const currentGroup = Math.ceil(page / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize , totalPages);

  // 이동 함수
  const goToPage = (num) => setPage(num);
  const goToNextGroup = () => {
    if (endPage < totalPages) setPage(endPage + 1);
  };
  const goToPrevGroup = () => {
    if (startPage > 1) setPage(startPage - groupSize);
  };

  return (
    <>
      <TableWrap>
        <Table>
          <TableHead>
            <tr>
              <th>주제</th>
              <th>모임 이름</th>
              <th>인원</th>
              <th>모집 기간</th>
              <th>상태</th>
            </tr>
          </TableHead>

          <TableBody>
            {currentStudies.length === 0 ? (
              <tr>
                <td colSpan={5}>스터디가 없습니다.</td>
              </tr>
            ) : (
              currentStudies.map((item, i) => (
                <tr
                  key={item?.study_id ?? item?.id ?? i}
                  onClick={() => navigate(`/studies/${item?.study_id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <TopicBadge>{item?.study_topic ?? ""}</TopicBadge>
                  </td>
                  <td>{item?.study_title ?? ""}</td>
                  <td>
                    {item?.current_participants ?? 0}/
                    {item?.max_participants ?? 0} 명
                  </td>
                  <td>
                    {item?.start_date ?? ""} ~ {item?.end_date ?? ""}
                  </td>
                  <td>
                    <StatusBadge status={item?.status} />
                  </td>
                </tr>
              ))
            )}
          </TableBody>
        </Table>
      </TableWrap>

      {/* ✅ 페이지네이션 */}
      <PaginationWrapper>
        <NavButton disabled={page === 1} onClick={goToPrevGroup}>
          {"<"}
        </NavButton>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNum = startPage + i;
          return (
            <PageButton
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              $active={pageNum === page}
            >
              {pageNum}
            </PageButton>
          );
        })}

        <NavButton
          disabled={endPage >= totalPages}
          onClick={goToNextGroup}
        >
          {">"}
        </NavButton>
      </PaginationWrapper>
    </>
  );
}

/* ---------------- styled-components ---------------- */

const TableWrap = styled.div`
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 20px;
`;

const TableHead = styled.thead`
  background-color: #eef3fa;

  th {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
    font-weight: 500;
  }
`;

const TableBody = styled.tbody`
  td {
    padding: 12px;
    text-align: center;
    border-bottom: 2px solid #f5f5f5;
  }

  tr:hover {
    background-color: #f8faff;
  }
`;

const TopicBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: #174579;
  color: #fff;
  font-size: 14px;
`;

/* ✅ 페이지네이션 스타일 */
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  gap: 8px;
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:disabled {
    background-color: #d1d1d1;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const NavButton = styled(BaseButton)`
  background-color: #dda5e3;
  color: white;

  &:hover:not(:disabled) {
    background-color: #b2dab1;
  }
`;

const PageButton = styled(BaseButton)`
  background-color: ${({ $active }) => ($active ? "#dda5e3" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#dda5e3")};
  border: 1px solid #dda5e3;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) => ($active ? "#dda5e3" : "#f3e4f7")};
  }
`;
