import React, { useState } from "react";
import styled from "styled-components";

export default function Createpage() {
  const [form, setForm] = useState({
    title: "",
    host: "",
    topic: "",
    member: "",
    place: "",
    startDate: "",
    endDate: "",
    studyIntro: "",
    openChat: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newId = Date.now();

    // 모집 상태 자동 계산
    const now = new Date();
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    let status = "모집중";

    if (now > end) status = "모집마감";
    else if (now >= start) status = "진행중";

    const current_participants = 1;
    if (current_participants >= Number(form.member)) {
      status = "모집마감";
    }

    try {
      await Promise.all([
        // study_list 등록
        fetch("http://localhost:3001/study_list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            study_id: newId,
            study_title: form.title,
            study_topic: form.topic,
            current_participants,
            max_participants: form.member,
            start_date: form.startDate,
            end_date: form.endDate,
            status,
          }),
        }),

        // study_details 등록
        fetch("http://localhost:3001/study_details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: newId,
            code: "OK",
            message: "스터디 상세 등록 성공",
            data: {
              study_id: newId,
              study_title: form.title,
              study_topic: form.topic,
              current_participants,
              max_participants: form.member,
              start_date: form.startDate,
              end_date: form.endDate,
              status,
              description: form.studyIntro,
              open_chat_link: form.openChat,
            },
          }),
        }),
      ]);

      alert("스터디가 등록되었습니다 ✅");
      setForm({
        title: "",
        host: "",
        topic: "",
        member: "",
        place: "",
        startDate: "",
        endDate: "",
        studyIntro: "",
        openChat: "",
      });
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류 발생 ❌");
    }
  };

  return (
    <PageWrapper>
      <PageTitle>모임 생성하기</PageTitle>
      <PageSubtitle>✨ 새로운 스터디 모임을 만들어보세요!</PageSubtitle>

      <Container>
        <HeaderBox>
          <HeaderTextWrapper>
            <HeaderTitle>스터디 모임 정보</HeaderTitle>
            <HeaderSub>정확한 정보를 입력해주세요!</HeaderSub>
          </HeaderTextWrapper>
        </HeaderBox>

        <StyledForm onSubmit={handleSubmit}>
          {/* 제목 */}
          <FieldRow>
            <Field fullWidth>
              <Label>제목</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="스터디 모임 제목을 입력해주세요"
              />
            </Field>
          </FieldRow>

          {/* 주최자 + 주제 */}
          <FieldRow>
            <Field>
              <Label>주최자</Label>
              <Input
                name="host"
                value={form.host}
                onChange={handleChange}
                placeholder="주최자 이름을 입력해주세요"
              />
            </Field>

            <Field>
              <Label>주제</Label>
              <Select name="topic" value={form.topic} onChange={handleChange}>
                <option value="">스터디 주제를 선택해주세요</option>
                <option value="major">전공</option>
                <option value="task">과제</option>
                <option value="interview">면접</option>
              </Select>
            </Field>
          </FieldRow>

          {/* 인원 + 장소 */}
          <FieldRow>
            <Field>
              <Label>모집 인원</Label>
              <Input
                type="number"
                name="member"
                value={form.member}
                onChange={handleChange}
                placeholder="인원"
              />
            </Field>

            <Field>
              <Label>장소</Label>
              <Input
                name="place"
                value={form.place}
                onChange={handleChange}
                placeholder="모임 장소를 입력해주세요"
              />
            </Field>
          </FieldRow>

          {/* 날짜 */}
          <FieldRow>
            <Field>
              <Label>시작 날짜</Label>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>종료 날짜</Label>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </Field>
          </FieldRow>

          {/* 소개 */}
          <FieldRow>
            <Field fullWidth>
              <Label>스터디 소개</Label>
              <TextArea
                name="studyIntro"
                value={form.studyIntro}
                onChange={handleChange}
                placeholder="스터디 모임에 대한 소개를 입력해주세요 (예: 목표, 진행방식, 커리큘럼 등)"
              />
            </Field>
          </FieldRow>

          {/* 오픈채팅 */}
          <FieldRow>
            <Field fullWidth>
              <Label>오픈채팅방 링크</Label>
              <Input
                type="url"
                name="openChat"
                value={form.openChat}
                onChange={handleChange}
                placeholder="카카오톡 오픈채팅방 링크를 입력해주세요"
              />
            </Field>
          </FieldRow>

          <ButtonRow>
            <SubmitButton type="submit">등록</SubmitButton>
            <CancelButton type="button">취소</CancelButton>
          </ButtonRow>
        </StyledForm>
      </Container>
    </PageWrapper>
  );
}

/* ---------------------- Styled Components ---------------------- */

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const PageTitle = styled.h1`
  color: #174579;
  font-family: "Noto Sans KR";
  font-size: 35px;
  font-weight: 800;
  height: 48px;
`;

const PageSubtitle = styled.div`
  display: inline-flex;
  height: 35px;
  padding: 7px 40px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #f5f5f5;
  font-size: 18px;
  color: #333;
  margin-top: -15px;
`;

const Container = styled.main`
  width: 1100px;
  height: 1100px;
  border-radius: 30px;
  border: 1px solid #bec5cd;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 35px;
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 130px;
  border-radius: 30px 30px 0 0;
  background: #eef3fa;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #333;
`;

const HeaderSub = styled.div`
  font-size: 13px;
  color: #174579;
`;

const StyledForm = styled.form`
  flex: 1;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: ${(props) =>
    props.fullWidth ? "1 1 100%" : props.small ? "0 0 120px" : "1"};
`;

const Label = styled.label`
  margin-left: 15px;
  font-size: 15px;
  font-weight: 600;
  color: #174579;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #174579;
    background: #fff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #174579;
    background: #fff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  font-size: 16px;
  color: #333;
  resize: none;

  &:focus {
    outline: none;
    border-color: #174579;
    background: #fff;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  width: 120px;
  height: 44px;
  border-radius: 999px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const SubmitButton = styled(BaseButton)`
  background: #dde3ea;
  color: #174579;
  border: 1px solid #174579;
`;

const CancelButton = styled(BaseButton)`
  background: #fff;
  color: #174579;
  border: 1px solid #174579;

  &:hover {
    background: #dde3ea;
  }
`;
