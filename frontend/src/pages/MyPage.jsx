import { useState, useEffect } from "react";
import styled from "styled-components";
import profileIcon from "../assets/profile.svg";
import { AiFillDelete } from "react-icons/ai";

import {
  MajorButton,
  AssignmentButton,
  ThesisButton,
  InterviewButton,
  CertificateButton,
  ContestButton,
  StartupButton,
  LanguageButton,
} from "../components/CategoryButton/CategoryButton.jsx";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("applied");

  const [userInfo, setUserInfo] = useState(null);
  const [createdStudies, setCreatedStudies] = useState([]);
  const [appliedStudies, setAppliedStudies] = useState([]);

  const topicComponents = {
    "코딩 테스트": <MajorButton />,
    자격증: <CertificateButton />,
    전공: <MajorButton />,
    과제: <AssignmentButton />,
    논문: <ThesisButton />,
    면접: <InterviewButton />,
    공모전: <ContestButton />,
    창업: <StartupButton />,
    외국어: <LanguageButton />,
  };

  // ⭐ 페이지네이션
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const currentList = activeTab === "applied" ? appliedStudies : createdStudies;
  const totalPages = Math.ceil(currentList.length / itemsPerPage);

  const slicedList = currentList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    const fetchMyPage = async () => {
      const res = await fetch("http://localhost:5000/mypage");
      const result = await res.json();
      const data = result.data;

      setUserInfo(data.user_info);
      setCreatedStudies(data.created_studies);
      setAppliedStudies(data.applied_studies);
    };
    fetchMyPage();
  }, []);

  const handleDelete = async (studyId, type) => {
    try {
      const res = await fetch({
        method: "DELETE",
      });

      if (!res.ok) throw new Error("삭제 실패");

      if (type === "created") {
        setCreatedStudies((prev) =>
          prev.filter((item) => item.study_id !== studyId)
        );
      } else {
        setAppliedStudies((prev) =>
          prev.filter((item) => item.study_id !== studyId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrap>
      <Content>
        {/* ---------------------- Sidebar ----------------------- */}
        <Sidebar>
          <ProfileCard>
            <Avatar>
              <ProfileImg src={profileIcon} alt="프로필 아이콘" />
            </Avatar>

            <ProfileInfo>
              <StudentId>
                {userInfo ? userInfo.student_number : "로그인 필요"}
              </StudentId>
              <MemberTag>
                {userInfo ? userInfo.user_name : "StudyHub member"}
              </MemberTag>
            </ProfileInfo>
          </ProfileCard>

          <SectionTitle>비밀번호 변경</SectionTitle>
          <DividerLine />

          <Field>
            <Input placeholder="현재 비밀번호" disabled />
          </Field>
          <Field>
            <Input placeholder="새 비밀번호" disabled />
          </Field>
          <Field>
            <Input placeholder="비밀번호 확인" disabled />
          </Field>

          <ActionRow>
            <PrimaryButton disabled>변경하기</PrimaryButton>
            <Hint>로그인 후 이용할 수 있습니다.</Hint>
          </ActionRow>
        </Sidebar>

        {/* ------------------------- Main ------------------------- */}
        <Main>
          <Segmented>
            <Thumb $pos={activeTab} />

            <SegmentButton
              $active={activeTab === "applied"}
              onClick={() => {
                setActiveTab("applied");
                setPage(1);
              }}
            >
              내가 신청한 모임 보기
            </SegmentButton>

            <SegmentButton
              $active={activeTab === "created"}
              onClick={() => {
                setActiveTab("created");
                setPage(1);
              }}
            >
              내가 생성한 모임 보기
            </SegmentButton>
          </Segmented>

          <Divider />

          {/* ⭐⭐⭐ 화살표 페이지네이션 추가 */}
          <PaginationWrapper>
            <ArrowButton onClick={() => setPage((p) => Math.max(1, p - 1))}>
              ←
            </ArrowButton>

            <PageInfo>
              {page} / {totalPages}
            </PageInfo>

            <ArrowButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              →
            </ArrowButton>
          </PaginationWrapper>

          <TableHead>
            <Col>주제</Col>
            <Col $grow>모임 이름</Col>
            <Col>신청 날짜</Col>
          </TableHead>

          <ListBox>
            {slicedList.map((item) => (
              <StudyItem key={item.study_id}>
                <Col>{topicComponents[item.study_topic] ?? <DefaultTag />}</Col>
                <Col $grow>{item.study_title}</Col>
                <Col>{item.start_date}</Col>

                <DeleteBtn
                  onClick={() =>
                    handleDelete(
                      item.study_id,
                      activeTab === "applied" ? "applied" : "created"
                    )
                  }
                >
                  <DeleteIcon />
                </DeleteBtn>
              </StudyItem>
            ))}
          </ListBox>
        </Main>
      </Content>
    </Wrap>
  );
}

/* ------------------------- styled-components ------------------------- */

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  padding: 24px 16px 80px;
  margin-top: 30px;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ProfileCard = styled.div`
  width: 300px;
  height: 130px;
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 24px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #174579;
  background: #eef3fa;
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #eef3fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StudentId = styled.div`
  color: #333;
  font-size: 20px;
`;

const MemberTag = styled.div`
  color: #bec5cd;
  font-size: 15px;
`;

const SectionTitle = styled.h3`
  margin-top: 30px;
  font-size: 16px;
`;

const Field = styled.div`
  width: 100%;
`;

const DividerLine = styled.div`
  width: 300px;
  height: 1px;
  background: #bec5cd;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 0.5px solid #bec5cd;
  background: #f5f5f5;
  color: #bec5cd;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid #174579;
  background: #eef3fa;
  cursor: not-allowed;
`;

const Hint = styled.span`
  font-size: 12px;
  color: #bec5cd;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Segmented = styled.div`
  position: relative;
  display: flex;
  width: 855px;
  height: 60px;
  padding: 5px;
  border-radius: 30px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  overflow: hidden;
`;

const Thumb = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ $pos }) => ($pos === "applied" ? "4px" : "calc(50% + 2px)")};
  width: calc(50% - 8px);
  height: calc(100% - 8px);
  border-radius: 30px;
  background: #eef3fa;
  border: 1px solid #bec5cd;
  transition: left 0.2s ease;
  z-index: 0;
`;

const SegmentButton = styled.button`
  position: relative;
  z-index: 1;
  flex: 1;
  border: none;
  background: transparent;
  font-weight: 700;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 10px;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
`;

const ArrowButton = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #555;
`;

const TableHead = styled.div`
  display: flex;
  padding: 10px 20px;
  background: #e0e0e0;
  border-radius: 10px;
`;

const Col = styled.div`
  flex: ${({ $grow }) => ($grow ? 2 : 1)};
`;

const ListBox = styled.div`
  margin-top: 8px;
  min-height: 300px;
  border-radius: 10px;
  background: #f7f8fa;
  border: 1px solid #eef1f4;
`;

const StudyItem = styled.div`
  display: flex;
  padding: 12px 20px;
  height: 50px;
  border-bottom: 1px solid #ececec;
  align-items: center;
`;

const DeleteBtn = styled.button`
  background-color: #fff7f7;
  border: 1px solid #ffd4d4;
  border-radius: 50%;
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const DeleteIcon = styled(AiFillDelete)`
  color: #ff5b5b;
  font-size: 18px;
`;
