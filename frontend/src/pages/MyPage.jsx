import { useState, useEffect } from "react";
import styled from "styled-components";
import profileIcon from "../assets/profile.svg";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MajorButton,
  AssignmentButton,
  ThesisButton,
  InterviewButton,
  CertificateButton,
  ContestButton,
  StartupButton,
  LanguageButton,
  DefaultTag, 
} from "../components/CategoryButton/CategoryButton.jsx";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("applied");
  const [userInfo, setUserInfo] = useState(null);
  const [createdStudies, setCreatedStudies] = useState([]);
  const [appliedStudies, setAppliedStudies] = useState([]);
  const navigate = useNavigate();

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

  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const currentList = activeTab === "applied" ? appliedStudies : createdStudies;
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;

  const slicedList = currentList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    const fetchMyPage = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/users/mypage", {
          headers: { Authorization: token },
        });

        const data = res.data.data;

        setUserInfo(data.userInfo);
        setCreatedStudies(data.createdStudies);
        setAppliedStudies(data.appliedStudies);
      } catch (err) {
        console.error("마이페이지 로드 실패:", err);
        if (err.response && err.response.status === 403) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      }
    };
    fetchMyPage();
  }, [navigate]);

  const handleDelete = async (studyId, type) => {
    if (!window.confirm("정말 삭제하시겠습니까? (기능 준비중)")) return;
    // 추후 삭제 API 연동 필요
  };

  return (
    <Wrap>
      <Content>
        <Sidebar>
          <ProfileCard>
            <Avatar>
              <ProfileImg src={profileIcon} alt="프로필 아이콘" />
            </Avatar>

            <ProfileInfo>
              <StudentId>
                {userInfo ? userInfo.studentNumber : "로그인 필요"}
              </StudentId>
              <MemberTag>
                {userInfo ? userInfo.name : "StudyHub member"}
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

        <Main>
          <Segmented>
            <Thumb $pos={activeTab} />
            <SegmentButton
              $active={activeTab === "applied"}
              onClick={() => { setActiveTab("applied"); setPage(1); }}
            >
              내가 신청한 모임 보기
            </SegmentButton>
            <SegmentButton
              $active={activeTab === "created"}
              onClick={() => { setActiveTab("created"); setPage(1); }}
            >
              내가 생성한 모임 보기
            </SegmentButton>
          </Segmented>

          <Divider />

          <PaginationWrapper>
            <ArrowButton onClick={() => setPage((p) => Math.max(1, p - 1))}>←</ArrowButton>
            <PageInfo>{page} / {totalPages}</PageInfo>
            <ArrowButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>→</ArrowButton>
          </PaginationWrapper>

          <TableHead>
            <Col>주제</Col>
            <Col $grow>모임 이름</Col>
            <Col>신청 날짜</Col>
          </TableHead>

          <ListBox>
            {slicedList.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>내역이 없습니다.</div>
            ) : (
              slicedList.map((item) => (
                <StudyItem key={item.studyId}>
                  <Col>{topicComponents[item.topic] ?? <DefaultTag />}</Col>
                  <Col $grow>{item.title}</Col>
                  <Col>{item.startDate || item.applicationDate}</Col>
                  <DeleteBtn onClick={() => handleDelete(item.studyId)}>
                    <DeleteIcon />
                  </DeleteBtn>
                </StudyItem>
              ))
            )}
          </ListBox>
        </Main>
      </Content>
    </Wrap>
  );
}


const Wrap = styled.div` width: 100%; display: flex; justify-content: center; `;
const Content = styled.div` width: 100%; max-width: 1200px; display: grid; grid-template-columns: 320px 1fr; gap: 28px; padding: 24px 16px 80px; margin-top: 30px; `;
const Sidebar = styled.aside` display: flex; flex-direction: column; gap: 14px; `;
const ProfileCard = styled.div` width: 300px; height: 130px; display: grid; grid-template-columns: 72px 1fr; align-items: center; gap: 24px; padding: 24px; border-radius: 20px; border: 1px solid #174579; background: #eef3fa; `;
const Avatar = styled.div` width: 70px; height: 70px; border-radius: 50%; background: #eef3fa; display: flex; justify-content: center; align-items: center; `;
const ProfileImg = styled.img` width: 70px; height: 70px; `;
const ProfileInfo = styled.div` display: flex; flex-direction: column; gap: 6px; `;
const StudentId = styled.div` color: #333; font-size: 20px; `;
const MemberTag = styled.div` color: #bec5cd; font-size: 15px; `;
const SectionTitle = styled.h3` margin-top: 30px; font-size: 16px; `;
const Field = styled.div` width: 100%; `;
const DividerLine = styled.div` width: 300px; height: 1px; background: #bec5cd; margin-bottom: 20px; `;
const Input = styled.input` width: 100%; height: 42px; padding: 0 14px; border-radius: 10px; border: 0.5px solid #bec5cd; background: #f5f5f5; color: #bec5cd; `;
const ActionRow = styled.div` display: flex; align-items: center; gap: 10px; `;
const PrimaryButton = styled.button` height: 36px; padding: 0 16px; border-radius: 10px; border: 1px solid #174579; background: #eef3fa; cursor: not-allowed; `;
const Hint = styled.span` font-size: 12px; color: #bec5cd; `;
const Main = styled.main` display: flex; flex-direction: column; `;
const Segmented = styled.div` position: relative; display: flex; width: 855px; height: 60px; padding: 5px; border-radius: 30px; border: 1px solid #bec5cd; background: #f5f5f5; overflow: hidden; `;
const Thumb = styled.div` position: absolute; top: 4px; left: ${({ $pos }) => ($pos === "applied" ? "4px" : "calc(50% + 2px)")}; width: calc(50% - 8px); height: calc(100% - 8px); border-radius: 30px; background: #eef3fa; border: 1px solid #bec5cd; transition: left 0.2s ease; z-index: 0; `;
const SegmentButton = styled.button` position: relative; z-index: 1; flex: 1; border: none; background: transparent; font-weight: 700; cursor: pointer; `;
const Divider = styled.div` height: 10px; `;
const PaginationWrapper = styled.div` width: 100%; display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 10px; `;
const ArrowButton = styled.button` padding: 6px 14px; border-radius: 6px; border: 1px solid #ccc; background: #fff; font-size: 18px; cursor: pointer; &:hover { background: #f0f0f0; } `;
const PageInfo = styled.span` font-size: 14px; color: #555; `;
const TableHead = styled.div` display: flex; padding: 10px 20px; background: #e0e0e0; border-radius: 10px; border: 1px solid #174579; color: #fff; background-color: #174579; `;
const Col = styled.div` flex: ${({ $grow }) => ($grow ? 2 : 1)}; `;
const ListBox = styled.div` margin-top: 8px; min-height: 300px; border-radius: 10px; background: #f7f8fa; border: 1px solid #eef1f4; `;
const StudyItem = styled.div` display: flex; padding: 12px 20px; height: 50px; border-bottom: 1px solid #ececec; align-items: center; `;
const DeleteBtn = styled.button` background-color: #fff7f7; border: 1px solid #ffd4d4; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; `;
const DeleteIcon = styled(AiFillDelete)` color: #ff5b5b; font-size: 18px; `;
