// ApplicantStatus.jsx(모달안에 내용에 관한 페이지)
import { useEffect, useState } from "react";

export default function ApplicantStatus({ studyId }) {
  //study detail에서  <ApplicantStatus studyId={id} />로 넘겨줌

  const [applicants, setApplicants] = useState([]); //초기값은 아무신청자 없음 :[](빈배열)

  useEffect(() => {
    // studyId에 맞는 신청자 리스트 불러오기 (예시)
    const fetchApplicants = async () => {
      const res = await fetch(
        `http://localhost:3002/applicant_modal?id=${studyId}`
      );
      const result = await res.json();
      // console.log("서버 응답:", result); // ✔ 이제 사용 가능
      console.log("data만:", result.data);
      setApplicants(result.data);
    };

    fetchApplicants();
  }, [studyId]); //studyid 가 바뀔때마다 다시 실행

  return (
    <div>
      <h2>신청자 현황</h2>

      {applicants.length === 0 ? (
        <p>신청자가 없습니다.</p>
      ) : (
        <ul>
          {applicants.map((item) => (
            <li key={item.user_id} className="applicant-card">
              <p>{item.student_number}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>신청일: {item.appliedDate}</p>

              <div className="buttons">
                <button className="accept">수락</button>
                <button className="reject">거절</button>
              </div>
            </li>
          ))}
        </ul>

        //applicants배열을 map으로 반복 각신청자를 li로 렌더링
      )}
    </div>
  );
}
// useEffect(() => {
//     const fetchApplicants = async () => {
//       const res = await fetch(
//         `${import.meta.env.VITE_SERVER_API_URL}/studies/${studyId}/applicants`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       const result = await res.json();
//       setApplicants(result.data); // ✔ 여기서 data만 뽑기
//     };

//     fetchApplicants();
//   }, [studyId]);
