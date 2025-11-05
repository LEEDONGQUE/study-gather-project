import React, { useState } from "react"; // CHANGED: 상태 관리용 import

export default function Createpage() {
  // CHANGED: 폼 상태 추가
  const [form, setForm] = useState({
    title: "",
    host: "",
    topic: "",
    member: "",
    place: "",
    startDate: "",
  });

  // CHANGED: 공통 onChange 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // CHANGED: 폼 onSubmit 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 fetch/axios로 백엔드에 form 전송하면 됨
    console.log("제출 데이터:", form);
    alert("제출됨!");
  };

  return (
    <>
      <head>
        <title>모임 생성하기</title>
      </head>
      <main>
        <h1>모임 생성하기</h1>
        <p>✨ 새로운 스터디 모임을 만들어보세요!</p>

        <div className="large-container">
          <div className="middle-container-top">
            <h1>스터디 모임정보</h1>
            <p>정확한 정보를 입력해주세요!</p>
          </div>

          {/* CHANGED: 폼 전체에 onSubmit 연결 */}
          <form className="middle-container-bottom" onSubmit={handleSubmit}>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              name="title" // CHANGED
              type="text"
              value={form.title} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="스터디 모임 제목을 입력하세요"
            />
            {/* CHANGED: id/for 중복 수정 (host로 분리) */}
            <label htmlFor="host">주최자</label>
            <input
              id="host" // CHANGED
              name="host" // CHANGED
              type="text"
              value={form.host} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="주최자 이름을 입력하세요"
            />
            <label htmlFor="topic">주제</label>
            <select
              id="topic"
              name="topic" // CHANGED
              value={form.topic} // CHANGED
              onChange={handleChange} // CHANGED
              defaultValue=""
            >
              <option value="" disabled>
                스터디 주제를 선택하세요
              </option>
              <option value="major">전공</option>
              <option value="task">과제</option>
              <option value="paper">논문</option>
              <option value="interview">면접</option>
              <option value="certification">자격증</option>
              <option value="competition">공모전</option>
              <option value="business">창업</option>
              <option value="foreign">외국어</option>
            </select>
            <label htmlFor="member">모집 인원</label>
            <input
              id="member"
              name="member" // CHANGED
              type="number"
              min="1"
              max="10"
              value={form.member} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="모집 인원 수"
            />
            <label htmlFor="place">장소</label>
            <input
              id="place"
              name="place" // CHANGED
              type="text"
              value={form.place} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="모임장소를 입력하세요"
            />
            <label htmlFor="startDate">시작 날짜</label>
            <input
              id="startDate" // CHANGED (오탈자 수정)
              name="startDate" // CHANGED
              type="date" // CHANGED (date로 변경)
              value={form.startDate} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="시작 날짜를 선택하세요"
            />
               <label htmlFor="startDate">종료 날짜</label>
            <input
              id="endDate" // CHANGED (오탈자 수정)
              name="endDate" // CHANGED
              type="date" // CHANGED (date로 변경)
              value={form.endDate} // CHANGED
              onChange={handleChange} // CHANGED
              placeholder="종료 날짜를 선택하세요"
            />
            {/* CHANGED: 제출 버튼 추가 (onSubmit 트리거용) */}
            <button type="submit">등록</button>
            <button type="submit">취소</button>
          </form>
        </div>
      </main>
    </>
  );
}
