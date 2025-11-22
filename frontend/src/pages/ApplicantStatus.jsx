// ApplicantStatus.jsx(모달안에 내용에 관한 페이지)
import { useEffect, useState } from "react";

export default function ApplicantStatus({ studyId }) { //study detail에서  <ApplicantStatus studyId={id} />로 넘겨줌

  const [applicants, setApplicants] = useState([]); //초기값은 아무신청자 없음 :[](빈배열)

  useEffect(() => {
    // studyId에 맞는 신청자 리스트 불러오기 (예시)
    const fetchApplicants = async () => {
      const res = await fetch(
        `http://localhost:8000/studies/${studyId}/applicants`
      );
      const data = await res.json(); //서버에서 받은 데이터를 실제 js객체로 변환하는 작업
      setApplicants(data);
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
            <li key={item.user_id}>{item.user_name}</li>
          ))}
        </ul> //applicants배열을 map으로 반복 각신청자를 li로 렌더링
      )}
    </div>
  );
}
