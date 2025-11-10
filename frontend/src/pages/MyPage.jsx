import { useState } from "react";
import styled from "styled-components";
import profileIcon from "../assets/profile.svg";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("applied"); // 'applied' | 'created'

  return (
    <Wrap>
      <Content>
        <Sidebar>
          <ProfileCard>
            <Avatar>
              <ProfileImg src={profileIcon} alt="프로필 아이콘" />
            </Avatar>
            <ProfileInfo>
              <StudentId>로그인 필요</StudentId>
              <MemberTag>StudyHub member</MemberTag>
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
              onClick={() => setActiveTab("applied")}
            >
              내가 신청한 모임 보기
            </SegmentButton>

            <SegmentButton
              $active={activeTab === "created"}
              onClick={() => setActiveTab("created")}
            >
              내가 생성한 모임 보기
            </SegmentButton>
          </Segmented>

          <Divider />

          <TableHead>
            <Col>주제</Col>
            <Col $grow>모임 이름</Col>
            <Col>신청 날짜</Col>
            <Col>승인여부</Col>
          </TableHead>

          <ListBox aria-label="list-area" />
        </Main>
      </Content>
    </Wrap>
  );
}

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
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 24px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #174579;
  background: #EEF3FA;
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #EEF3FA;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  aspect-ratio: 1 / 1;
  object-fit: contain;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StudentId = styled.div`
  color: #333;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MemberTag = styled.div`
  color: #BEC5CD;
  font-family: "Noto Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SectionTitle = styled.h3`
  margin-top: 30px;
  margin-bottom: 0px;
  font-size: 16px;
  color: #333333;
`;

const Field = styled.div`
  width: 100%;
`;

const DividerLine = styled.div`
  width: 300px;
  height: 1px;
  background: #BEC5CD;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 0.5px solid #BEC5CD;
  background: #f5f5f5;
  color: #BEC5CD;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
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
  background: #EEF3FA;
  color: #333333;
  font-weight: 600;
  cursor: not-allowed;
  margin-top:20px;
`;

const Hint = styled.span`
  margin-top: 20px;
  font-size: 12px;
  color: #BEC5CD;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Segmented = styled.div`
  position: relative;
  display: flex;
  width: 855px;      /* 전체 길이 */
  height: 60px;      /* 전체 높이 */
  padding: 5px 6px;  /* 안쪽 여백 (위아래 5px, 좌우 6px 정도) */

  border-radius: 30px;
  border: 1px solid #BEC5CD;
  background: #F5F5F5;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;  /* 안쪽 요소 둥글게 잘리게 */
`;

// 선택된 쪽 하늘색 박스 (전체의 정확히 절반)
const Thumb = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ $pos }) => ($pos === "applied" ? "4px" : "calc(50% + 2px)")};
  width: calc(50% - 8px);      /* 전체의 1/2 - 양쪽 여백 */
  height: calc(100% - 8px);    /* 위/아래 여백 만큼 줄임 */

  border-radius: 30px;
  background: #EEF3FA;
  border: 1px solid #BEC5CD;
  transition: left 0.2s ease;
  z-index: 0;
`;

const SegmentButton = styled.button`
  position: relative;
  z-index: 1;             
  flex: 1;               
  border: none;
  background: transparent; 
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.2px;
  color: #333333;
  cursor: pointer;
`;

const Divider = styled.div`height: 10px;`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr 160px 110px;
  align-items: center;
  align-self: stretch;
  padding: 0px 16px;
  border-radius: 10px;
  background: #E0E0E0;
  color: #333333;
  font-size: 13px;
  height: 40px;
`;

const Col = styled.div`${({ $grow }) => $grow && "flex:1"};`;

const ListBox = styled.div`
  margin-top: 8px;
  min-height: 300px;
  border-radius: 10px;
  background: #f7f8fa;
  border: 1px solid #eef1f4;
`;

const EmptyState = styled.div`
  padding: 24px;
  color: #98a2b3;
  font-size: 14px;
`;
