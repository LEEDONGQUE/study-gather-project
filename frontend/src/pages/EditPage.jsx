import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

export default function Editpage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/study_details?id=${id}`);
      const json = await res.json();

      if (json.length === 0) {
        alert("존재하지 않는 스터디입니다.");
        return;
      }

      const data = json[0].data;

      setForm({
        title: data.study_title,
        host: data.organizer.organizer_name,
        topic: data.study_topic,
        member: data.max_participants,
        place: data.place,
        startDate: data.start_date,
        endDate: data.end_date,
        studyIntro: data.description,
        openChat: data.chat_link,
      });
    };

    fetchData();
  }, [id]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러 (수정)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3001/study_details/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          code: "OK",
          message: "스터디 수정 성공",
          data: {
            study_id: id,
            study_title: form.title,
            study_topic: form.topic,
            current_participants: 1,
            max_participants: form.member,
            start_date: form.startDate,
            end_date: form.endDate,
            status: "모집중",
            description: form.studyIntro,
            open_chat_link: form.openChat,
          },
        }),
      });

      alert("수정 완료되었습니다! ✨");
      navigate(`/studies/${id}`);
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <PageTitle>모임 정보 수정하기</PageTitle>
      <PageSubtitle>✨ 기존 정보를 변경해보세요!</PageSubtitle>

      <Container>
        <HeaderBox>
          <HeaderTextWrapper>
            <HeaderTitle>스터디 모임 정보 수정</HeaderTitle>
            <HeaderSub>수정할 내용을 입력해주세요</HeaderSub>
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
                placeholder="스터디 제목"
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
                placeholder="주최자 이름"
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
                placeholder="인원"
              />
            </Field>

            <Field>
              <Label>장소</Label>
              <Input
                name="place"
                value={form.place}
                onChange={handleChange}
                placeholder="모임 장소"
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
              />
            </Field>
          </FieldRow>

          {/* 오픈채팅 */}
          <FieldRow>
            <Field fullWidth>
              <Label>오픈채팅방 링크</Label>
              <Input
                name="openChat"
                value={form.openChat}
                onChange={handleChange}
              />
            </Field>
          </FieldRow>

          {/* 버튼 */}
          <ButtonRow>
            <SubmitButton type="submit">수정하기</SubmitButton>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              취소
            </CancelButton>
          </ButtonRow>
        </StyledForm>
      </Container>
    </PageWrapper>
  );
}

/* ---- Styled Components (Createpage에서 그대로 복붙) ---- */

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
`;
const HeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 40px;
  padding-top: 40px;
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
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  font-size: 16px;
  resize: none;
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
`;
