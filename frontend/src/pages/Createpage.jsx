import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Createpage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    host: "", // 화면 표시용 (실제 전송 X)
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

  // ✅ [수정된 부분] 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. 토큰 확인 (로그인 필수)
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("로그인 후 이용 가능합니다.");
        return;
    }

    // 2. 필수 입력값 검사
    if(!form.title || !form.topic || !form.member || !form.startDate || !form.endDate) {
        alert("필수 정보를 모두 입력해주세요.");
        return;
    }

    try {
      // 3. 데이터 전송 준비 (형변환 중요!)
      // 백엔드 DTO: maxParticipants는 Integer 타입이어야 함
      const requestBody = {
            studyTitle: form.title,
            studyTopic: form.topic,
            maxParticipants: parseInt(form.member, 10), // ★ 문자열 -> 숫자 변환 필수
            place: form.place,
            startDate: form.startDate,
            endDate: form.endDate,
            description: form.studyIntro,
            chatLink: form.openChat
      };

      console.log("전송 데이터:", requestBody); // 디버깅용 로그

      // 4. 백엔드 API 호출
      await axios.post("http://localhost:8080/studies/create", requestBody, {
          headers: { Authorization: token } // 인증 헤더 포함
      });

      alert("스터디가 성공적으로 등록되었습니다! ✅");
      navigate("/"); // 메인 페이지로 이동
      
    } catch (err) {
      console.error("등록 실패:", err);
      // 에러 메시지가 있다면 띄워줌
      if (err.response && err.response.data) {
          alert(`등록 실패: ${err.response.data.message || "오류가 발생했습니다."}`);
      } else {
          alert("스터디 등록 중 알 수 없는 오류가 발생했습니다 ❌");
      }
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
              {/* 주최자는 토큰으로 자동 처리되므로 입력 비활성화 */}
              <Input
                name="host"
                value={form.host}
                onChange={handleChange}
                placeholder="자동 입력됨 (입력 불필요)"
                disabled
              />
            </Field>

            <Field>
              <Label>주제</Label>
              <Select name="topic" value={form.topic} onChange={handleChange}>
                <option value="">스터디 주제를 선택해주세요</option>
                <option value="전공">전공</option>
                <option value="과제">과제</option>
                <option value="면접">면접</option>
                <option value="논문">논문</option>
                <option value="자격증">자격증</option>
                <option value="공모전">공모전</option>
                <option value="창업">창업</option>
                <option value="외국어">외국어</option>
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
                placeholder="인원 (숫자만 입력)"
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
            <CancelButton type="button" onClick={() => navigate(-1)}>취소</CancelButton>
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
