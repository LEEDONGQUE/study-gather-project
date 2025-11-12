import React, { useState } from "react";

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

  // ✅ 입력값 변경 핸들러 (추가)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newId = Date.now();

    // ✅ 모집 상태(status) 자동 계산 추가됨
    const now = new Date();
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    let status = "모집중"; // 기본값

    if (now > end) {
      status = "모집마감";
    } else if (now >= start) {
      status = "진행중";
    }

    // 인원 다 찼으면 강제로 마감
    // current_participants는 기본적으로 1명(주최자)이라 가정
    const current_participants = 1;
    if (current_participants >= Number(form.member)) {
      status = "모집마감";
    }
    // ✅ 여기까지 추가됨

    try {
      await Promise.all([
        // 1️⃣ study_list에 등록
        fetch("http://localhost:3001/study_list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            study_id: newId,
            study_title: form.title,
            study_topic: form.topic,
            current_participants, // ✅ 변경됨 (하드코딩 제거)
            max_participants: form.member,
            start_date: form.startDate,
            end_date: form.endDate,
            status, // ✅ 변경됨 (자동 계산된 값)
          }),
        }),

        // 2️⃣ study_details에 등록
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
              current_participants, // ✅ 변경됨
              max_participants: form.member,
              start_date: form.startDate,
              end_date: form.endDate,
              status, // ✅ 변경됨
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
    <main>
      <h1>모임 생성하기</h1>

      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="스터디 제목"
        />

        <label>주최자</label>
        <input
          name="host"
          value={form.host}
          onChange={handleChange}
          placeholder="주최자 이름"
        />

        <label>주제</label>
        <select name="topic" value={form.topic} onChange={handleChange}>
          <option value="">선택하세요</option>
          <option value="major">전공</option>
          <option value="task">과제</option>
          <option value="interview">면접</option>
        </select>

        <label>모집 인원</label>
        <input
          type="number"
          name="member"
          value={form.member}
          onChange={handleChange}
        />

        <label>장소</label>
        <input
          name="place"
          value={form.place}
          onChange={handleChange}
          placeholder="모임 장소"
        />

        <label>시작일</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <label>종료일</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <label>스터디 소개</label>
        <textarea
          name="studyIntro"
          value={form.studyIntro}
          onChange={handleChange}
          placeholder="소개 입력"
        />

        <label>오픈채팅방 링크</label>
        <input
          type="url"
          name="openChat"
          value={form.openChat}
          onChange={handleChange}
          placeholder="https://"
        />

        <button type="submit">등록</button>
      </form>
    </main>
  );
}
